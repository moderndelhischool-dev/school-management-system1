import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

function PaymentHistory({ email }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFees, setTotalFees] = useState(0);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const load = async () => {
      // student total fees
      const studentSnap = await getDoc(doc(db, "students", email));
      if (studentSnap.exists()) {
        setTotalFees(Number(studentSnap.data().totalFees || 0));
      }

      // approved payments
      const q = query(
        collection(db, "payments"),
        where("studentEmail", "==", email),
        where("status", "==", "approved"),
      );

      const snap = await getDocs(q);
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // oldest first
      data.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);

      setPayments(data);
      setLoading(false);
    };

    load();
  }, [email]);

  if (loading) return <p>Loading payment history...</p>;
  if (payments.length === 0)
    return <p className="text-muted">No payment history found.</p>;

  let cumulativePaid = 0;

  return (
    <div className="card shadow-sm p-3">
      <h5 className="mb-3">🧾 Payment History</h5>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="table-responsive d-none d-md-block">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Month</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, i) => {
              cumulativePaid += Number(p.paidAmount || 0);
              const remaining = Math.max(totalFees - cumulativePaid, 0);

              return (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td className="text-success fw-semibold">₹ {p.paidAmount}</td>
                  <td
                    className={
                      remaining === 0
                        ? "text-success fw-semibold"
                        : "text-danger fw-semibold"
                    }
                  >
                    ₹ {remaining}
                  </td>
                  <td>{p.month || "—"}</td>
                  <td>
                    <span className="badge bg-success">approved</span>
                  </td>
                  <td>
                    {new Date(p.createdAt.seconds * 1000).toLocaleDateString(
                      "en-IN",
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="d-md-none">
        {payments.map((p, i) => {
          cumulativePaid += Number(p.paidAmount || 0);
          const remaining = Math.max(totalFees - cumulativePaid, 0);

          return (
            <div key={p.id} className="border rounded p-3 mb-2">
              <div className="d-flex justify-content-between mb-1">
                <strong>Payment #{i + 1}</strong>
                <span className="badge bg-success">approved</span>
              </div>

              <div className="small text-muted mb-1">
                {new Date(p.createdAt.seconds * 1000).toLocaleDateString(
                  "en-IN",
                )}
              </div>

              <div>
                <b>Paid:</b>{" "}
                <span className="text-success fw-semibold">
                  ₹ {p.paidAmount}
                </span>
              </div>

              <div>
                <b>Remaining:</b>{" "}
                <span
                  className={
                    remaining === 0
                      ? "text-success fw-semibold"
                      : "text-danger fw-semibold"
                  }
                >
                  ₹ {remaining}
                </span>
              </div>

              <div>
                <b>Month:</b> {p.month || "—"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaymentHistory;
