function UserProfile() {
  return (
    <div className="card p-3 mt-3">
      <h4>Student Information</h4>

      <p>
        <b>Name:</b> Rahul Kumar
      </p>
      <p>
        <b>Class:</b> 10
      </p>
      <p>
        <b>Roll No:</b> 23
      </p>

      <hr />

      <h5>Fees Status</h5>
      <p>Total Fees: ₹30,000</p>
      <p>Paid: ₹20,000</p>
      <p>
        <b>Pending:</b> ₹10,000
      </p>

      <hr />

      <h5>Attendance</h5>
      <p>Attendance: 92%</p>
    </div>
  );
}

export default UserProfile;
