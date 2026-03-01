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

      <style>{`

        .profile-card {
          border-radius: 20px;
          background: linear-gradient(135deg,#ffffff,#F4F6F8);
          border: none;
          transition: 0.3s ease;
          box-shadow: 0 15px 35px rgba(15,76,108,0.15);
        }

        body.dark-mode .profile-card {
          background: linear-gradient(135deg,#1B2A35,#0A2E42);
          color: white;
          box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        }

        .profile-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 45px rgba(15,76,108,0.25);
        }

        .section-title {
          color: #0F4C6C;
          font-weight: 700;
          margin-bottom: 18px;
        }

        body.dark-mode .section-title {
          color: #D4A24C;
        }

        .section-subtitle {
          color: #1B5E84;
          font-weight: 600;
          margin-top: 18px;
        }

        body.dark-mode .section-subtitle {
          color: #D4A24C;
        }

        .label {
          color: #0F4C6C;
        }

        body.dark-mode .label {
          color: #D4A24C;
        }

        .paid {
          color: #0F4C6C;
          font-weight: 600;
        }

        .pending {
          color: #DC2626;
          font-weight: 600;
        }

        .attendance {
          color: #1B5E84;
          font-weight: 600;
        }

        body.dark-mode .attendance {
          color: #D4A24C;
        }

        hr {
          border-color: #E5E7EB;
        }

        body.dark-mode hr {
          border-color: #243644;
        }

      `}</style>
    </div>
  );
}

export default UserProfile;
