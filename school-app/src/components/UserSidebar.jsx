function UserSidebar({ activePage, setActivePage }) {
  const btnClass = (page) =>
    `btn w-100 text-start mb-2 ${
      activePage === page ? "btn-primary text-white" : "btn-light"
    }`;

  return (
    <div className="bg-white h-100 border-end p-3">
      <h5 className="mb-4">👤 Student</h5>

      {/* DASHBOARD */}
      <button
        className={btnClass("home")}
        onClick={() => setActivePage("home")}
      >
        📊 Dashboard
      </button>

      {/* PROFILE */}
      <button
        className={btnClass("profile")}
        onClick={() => setActivePage("profile")}
      >
        🙍 My Profile
      </button>

      {/* FEES */}
      <button
        className={btnClass("fees")}
        onClick={() => setActivePage("fees")}
      >
        💳 Fees & Payment
      </button>
    </div>
  );
}

export default UserSidebar;
