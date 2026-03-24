import { doc, runTransaction, Timestamp } from "firebase/firestore";

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

export async function applyRazorpayPaymentApproval(
  db,
  { paymentId, paidAmount, student, razorpayResponse = {} },
) {
  const studentRef = doc(db, "students", student.email);
  const paymentRef = doc(db, "payments", paymentId);
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
        return { alreadyProcessed: true };
      }
    }

    const studentSnap = await transaction.get(studentRef);
    if (!studentSnap.exists()) {
      throw new Error("Student record not found");
    }

    const s = studentSnap.data();
    const { newPaid, newPending, feeStatus } = computeFeeBalances(
      s.totalFees,
      s.paidFees,
      paidAmount,
    );

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
      },
      { merge: false },
    );

    transaction.update(studentRef, {
      paidFees: newPaid,
      pendingFees: newPending,
      feeStatus,
      updatedAt: now,
    });

    return { alreadyProcessed: false };
  });
}
