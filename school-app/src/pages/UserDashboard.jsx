import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import UserLayout from "./user/UserLayout";
import UserHome from "./user/UserHome";
import UserProfile from "./user/UserProfile";
import UserFees from "./user/UserFees";
import UserContact from "./user/UserContact";
import UserUniform from "./user/UserUniform";
import UserCertificate from "./user/UserCertificate";
import ChangePassword from "../components/ChangePassword";
import UserCalendar from "./UserCalendar";

/* ================= PAYMENT HISTORY ================= */
function PaymentHistory({ email, darkMode }) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email) return;

    const loadPayments = async () => {
      setLoading(true);

      const q = query(
        collection(db, "payments"),
        where("studentEmail", "==", email),
      );

      const snap = await getDocs(q);

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      data.sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
      );

      setPayments(data);
      setLoading(false);
    };

    loadPayments();
  }, [email]);

  if (loading)
    return (
      <div className="text-center py-4">
        <div className="spinner-border mb-3"></div>
      </div>
    );

  if (payments.length === 0) {
    return (
      <p
        className={
          darkMode ? "text-light text-center" : "text-muted text-center"
        }
      >
        No payment history found.
      </p>
    );
  }

  return (
    <div
      className={`card shadow-sm p-3 payment-card ${
        darkMode ? "bg-dark text-light" : ""
      }`}
      style={{ borderRadius: "16px" }}
    >
      <h5 className="mb-3">🧾 Payment History</h5>

      <div className="table-responsive">
        <table
          className={`table align-middle ${
            darkMode ? "table-dark" : "table-bordered"
          }`}
        >
          <thead>
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
            {payments.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>

                <td className="fw-semibold paid-text">₹ {p.paidAmount || 0}</td>

                <td
                  className={
                    p.remainingFees === 0
                      ? "fw-semibold paid-text"
                      : "text-danger fw-semibold"
                  }
                >
                  ₹ {p.remainingFees ?? "—"}
                </td>

                <td>{p.month || "—"}</td>

                <td>
                  <span
                    className={`badge ${
                      p.status === "approved"
                        ? "badge-approved"
                        : p.status === "rejected"
                          ? "bg-danger"
                          : "badge-pending"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                <td>
                  {p.createdAt
                    ? new Date(p.createdAt.seconds * 1000).toLocaleDateString(
                        "en-IN",
                      )
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ================= USER DASHBOARD ================= */
function UserDashboard() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snap = await getDoc(doc(db, "students", user.email));
        if (snap.exists()) {
          setStudent({ email: user.email, ...snap.data() });
        }
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border mb-3"></div>
          <h6>Loading dashboard...</h6>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="container mt-5 text-center">
        <h5>No student record found</h5>
        <p>Please contact school administration.</p>
      </div>
    );
  }

  return (
    <>
      <UserLayout onChangePassword={() => setShowChangePassword(true)}>
        {(activePage, darkMode) => (
          <>
            {activePage === "home" && (
              <>
                <UserHome student={student} />
                <div className="mt-4">
                  <UserCalendar darkMode={darkMode} />
                </div>
              </>
            )}

            {activePage === "profile" && <UserProfile student={student} />}
            {activePage === "fees" && <UserFees student={student} />}
            {activePage === "history" && (
              <PaymentHistory email={student.email} darkMode={darkMode} />
            )}
            {activePage === "uniform" && <UserUniform student={student} />}
            {activePage === "certificate" && (
              <UserCertificate student={student} />
            )}
            {activePage === "contact" && <UserContact />}
          </>
        )}
      </UserLayout>

      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}

      {/* ===== PURPLE THEME STYLES ===== */}
      <style>{`
        .spinner-border {
          color: #7c3aed !important;
        }

        .payment-card {
          border: none;
          box-shadow: 0 20px 40px rgba(124,58,237,0.15);
        }

        .table thead {
          background: linear-gradient(90deg,#4c1d95,#7c3aed);
          color: white;
        }

        .paid-text {
          color: #7c3aed;
        }

        .badge-approved {
          background: #7c3aed;
        }

        .badge-pending {
          background: #facc15;
          color: black;
        }

        body.dark-mode .payment-card {
          background: #1e1b4b !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        body.dark-mode .table-dark th {
          background: #312e81 !important;
        }
      `}</style>
    </>
  );
}

export default UserDashboard;
