import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

function PaymentRequests() {
  const [payments, setPayments] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD PAYMENTS ================= */
  const loadPayments = async () => {
    setLoading(true);

    const snap = await getDocs(collection(db, "payments"));
    let data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    /* 🔥 PENDING FIRST, THEN APPROVED, THEN REJECTED */
    const order = { pending: 1, approved: 2, rejected: 3 };
    data.sort((a, b) => order[a.status] - order[b.status]);

    setPayments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  /* ================= CLASS SORT ================= */
  const classOrder = (cls) => {
    if (cls === "+1") return 11;
    if (cls === "+2") return 12;
    return parseInt(cls);
  };

  const classes = [...new Set(payments.map((p) => p.class))].sort(
    (a, b) => classOrder(a) - classOrder(b),
  );

  const filteredPayments = selectedClass
    ? payments.filter((p) => p.class === selectedClass)
    : payments;

  /* ================= APPROVE ================= */
  const approvePayment = async (p) => {
    await updateDoc(doc(db, "payments", p.id), {
      status: "approved",
      approvedAt: Timestamp.now(),
    });

    await updateDoc(doc(db, "students", p.studentEmail), {
      paidFees: p.amount,
      pendingFees: 0,
      feeStatus: "Completed",
      approvedAt: Timestamp.now(),
    });

    alert("✅ Payment approved");
    loadPayments();
  };

  /* ================= REJECT ================= */
  const rejectPayment = async (p) => {
    await updateDoc(doc(db, "payments", p.id), {
      status: "rejected",
      rejectedAt: Timestamp.now(),
    });

    alert("❌ Payment rejected");
    loadPayments();
  };

  if (loading) return <p>Loading payment requests...</p>;

  return (
    <div className="container-fluid p-0">
      <h4 className="mb-3">💰 Payment Requests</h4>

      {/* ================= CLASS BLOCKS ================= */}
      <div className="row mb-4">
        {classes.map((cls) => (
          <div key={cls} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
            <div
              className={`card text-center p-3 shadow-sm ${
                selectedClass === cls ? "border-primary" : ""
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedClass(cls)}
            >
              <h6 className="mb-1">Class {cls}</h6>
              <small className="text-muted">
                {payments.filter((p) => p.class === cls).length} requests
              </small>
            </div>
          </div>
        ))}
      </div>

      {selectedClass && (
        <button
          className="btn btn-secondary btn-sm mb-3"
          onClick={() => setSelectedClass(null)}
        >
          ⬅ Back to all classes
        </button>
      )}

      {/* ================= TABLE ================= */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Month</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.studentName}</td>
                <td>{p.studentEmail}</td>
                <td>{p.class}</td>
                <td>₹ {p.amount}</td>
                <td>{p.month}</td>
                <td>
                  <span
                    className={`badge ${
                      p.status === "approved"
                        ? "bg-success"
                        : p.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>
                  {p.status === "pending" ? (
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => approvePayment(p)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectPayment(p)}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <small className="text-muted">No action</small>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentRequests;
