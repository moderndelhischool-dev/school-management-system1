function UserProfile() {
  return (
    <div className="card profile-card p-4 mt-3 shadow">
      <h4 className="section-title">Student Information</h4>

      <p>
        <b className="label">Name:</b> Rahul Kumar
      </p>
      <p>
        <b className="label">Class:</b> 10
      </p>
      <p>
        <b className="label">Roll No:</b> 23
      </p>

      <hr />

      <h5 className="section-subtitle">Fees Status</h5>
      <p>Total Fees: ₹30,000</p>
      <p className="paid">Paid: ₹20,000</p>
      <p>
        <b className="pending">Pending:</b> ₹10,000
      </p>

      <hr />

      <h5 className="section-subtitle">Attendance</h5>
      <p className="attendance">Attendance: 92%</p>

      {/* ===== PURPLE STYLES ===== */}
      <style>{`
        .profile-card {
          border-radius: 18px;
          background: linear-gradient(135deg,#f5f3ff,#ede9fe);
          border: none;
          transition: 0.3s ease;
        }

        .profile-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(124,58,237,0.25);
        }

        .section-title {
          color: #4c1d95;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .section-subtitle {
          color: #6d28d9;
          font-weight: 600;
          margin-top: 15px;
        }

        .label {
          color: #7c3aed;
        }

        .paid {
          color: #7c3aed;
          font-weight: 600;
        }

        .pending {
          color: #dc2626;
        }

        .attendance {
          color: #4c1d95;
          font-weight: 600;
        }

        hr {
          border-color: #ddd6fe;
        }
      `}</style>
    </div>
  );
}

export default UserProfile;
