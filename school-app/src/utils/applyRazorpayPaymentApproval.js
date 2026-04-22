import { doc, runTransaction, Timestamp } from "firebase/firestore";
import { autoRollAfterFullPayment } from "./feeBilling";

export function computeFeeBalances(total, oldPaid, paidNow) {
  const t = Number(total) || 0;
  const oldP = Number(oldPaid) || 0;
  const now = Number(paidNow) || 0;
  const newPaid = Math.min(oldP + now, t);
  const newPending = Math.max(t - newPaid, 0);
  const feeStatus =
    newPending === 0 ? "Completed" : newPaid > 0 ? "Partial" : "Pending";
  return { newPaid, newPending, feeStatus };
}

function pad6(n) {
  const x = Math.max(0, Number(n) || 0);
  return String(Math.floor(x)).padStart(6, "0");
}

function buildReceiptNo(seq, at = new Date()) {
  const year = at.getFullYear();
  return `RCPT-${year}-${pad6(seq)}`;
}

export async function applyRazorpayPaymentApproval(
  db,
  { paymentId, paidAmount, student, razorpayResponse = {} },
) {
  const studentRef = doc(db, "students", student.email);
  const paymentRef = doc(db, "payments", paymentId);
  const receiptCounterRef = doc(db, "counters", "receipts");
  const now = Timestamp.now();
  const monthLabel = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return runTransaction(db, async (transaction) => {
    const paymentSnap = await transaction.get(paymentRef);
    if (paymentSnap.exists()) {
      const existing = paymentSnap.data();
      if (existing.status === "approved") {
        return {
          alreadyProcessed: true,
          receiptNo: existing.receiptNo || "",
          feeMonth: existing.feeMonth || "",
        };
      }
    }

    const studentSnap = await transaction.get(studentRef);
    if (!studentSnap.exists()) {
      throw new Error("Student record not found");
    }

    const s = studentSnap.data();
    const feeMonth = s.feeMonth || student.feeMonth || "";
    const feeRef = feeMonth ? doc(db, "students", student.email, "fees", feeMonth) : null;

    // Receipt number allocation (transaction-safe counter)
    const counterSnap = await transaction.get(receiptCounterRef);
    const currentSeq = counterSnap.exists()
      ? Number(counterSnap.data()?.next || counterSnap.data()?.value || 1)
      : 1;
    const receiptSeq = Number.isFinite(currentSeq) && currentSeq > 0 ? currentSeq : 1;
    const receiptNo = buildReceiptNo(receiptSeq, new Date());
    transaction.set(
      receiptCounterRef,
      { next: receiptSeq + 1, updatedAt: now },
      { merge: true },
    );

    const { newPaid, newPending, feeStatus } = computeFeeBalances(
      s.totalFees,
      s.paidFees,
      paidAmount,
    );

    // Keep per-month fee doc in sync so Admin Fees History remains correct
    if (feeRef) {
      const feeSnap = await transaction.get(feeRef);
      const feeData = feeSnap.exists() ? feeSnap.data() : {};
      const feeTotal = Number(feeData.amount ?? s.totalFees ?? 0) || 0;
      const feeOldPaid = Number(feeData.paid ?? s.paidFees ?? 0) || 0;
      const { newPaid: monthPaid, feeStatus: monthStatus } = computeFeeBalances(
        feeTotal,
        feeOldPaid,
        paidAmount,
      );

      transaction.set(
        feeRef,
        {
          feeMonth,
          month: feeData.month || monthLabel,
          amount: feeTotal,
          paid: monthPaid,
          status: monthStatus,
          mode: "Online (Razorpay)",
          receivedBy: "System",
          lastPaymentId: paymentId,
          lastReceiptNo: receiptNo,
          receiptNos: Array.isArray(feeData.receiptNos)
            ? Array.from(new Set([...feeData.receiptNos, receiptNo]))
            : [receiptNo],
          paymentIds: Array.isArray(feeData.paymentIds)
            ? Array.from(new Set([...feeData.paymentIds, paymentId]))
            : [paymentId],
          updatedAt: now,
          date: now,
        },
        { merge: true },
      );
    }

    transaction.set(
      paymentRef,
      {
        studentEmail: student.email,
        studentName: student.name || "",
        fatherName: student.fatherName || "",
        rollNo: student.rollNo ?? "",
        class: student.class || "",
        paidAmount: Number(paidAmount) || 0,
        slipUrl: "",
        status: "approved",
        mode: "Online (Razorpay)",
        paymentId,
        razorpayPaymentId: paymentId,
        razorpayOrderId: razorpayResponse.razorpay_order_id || "",
        razorpaySignature: razorpayResponse.razorpay_signature || "",
        createdAt: now,
        updatedAt: now,
        approvedAt: now,
        month: monthLabel,
        feeMonth: feeMonth || "",
        receiptNo,
      },
      { merge: false },
    );

    transaction.update(studentRef, {
      paidFees: newPaid,
      pendingFees: newPending,
      feeStatus,
      updatedAt: now,
    });

    return { alreadyProcessed: false, feeStatus, receiptNo, feeMonth: feeMonth || "" };
  }).then(async (result) => {
    if (result.alreadyProcessed) return result;
    if (result.feeStatus === "Completed") {
      await autoRollAfterFullPayment(db, student.email);
    }
    return result;
  });
}
