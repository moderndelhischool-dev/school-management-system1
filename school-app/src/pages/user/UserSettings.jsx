import { useState } from "react";
import ChangePassword from "../../components/ChangePassword";

function UserSettings() {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="card shadow-sm p-4">
        <h5 className="mb-3">⚙️ Settings</h5>

        <button
          className="btn btn-outline-primary"
          onClick={() => setShow(true)}
        >
          Change Password
        </button>
      </div>

      {show && <ChangePassword onClose={() => setShow(false)} />}
    </>
  );
}

export default UserSettings;
