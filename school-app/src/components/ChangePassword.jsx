import { useState } from "react";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

function ChangePassword({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMsgType("error");
      setMsg("❌ All fields are required");
      return;
    }

    if (newPassword.length < 6) {
      setMsgType("error");
      setMsg("❌ Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsgType("error");
      setMsg("❌ New password & confirm password do not match");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const user = auth.currentUser;

      if (!user) {
        setMsgType("error");
        setMsg("❌ User not logged in");
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setMsgType("success");
      setMsg("✅ Password changed successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      let errorMsg = "❌ Something went wrong";

      if (error.code === "auth/wrong-password") {
        errorMsg = "❌ Current password is incorrect";
      }

      setMsgType("error");
      setMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.55)", zIndex: 1050 }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "380px",
          borderRadius: "18px",
        }}
      >
        <h5 className="mb-3 text-center text-purple">🔐 Change Password</h5>

        {msg && (
          <div
            className={`alert ${
              msgType === "success" ? "alert-success" : "alert-danger"
            } text-center`}
          >
            {msg}
          </div>
        )}

        <input
          type="password"
          className="form-control mb-3 custom-input"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3 custom-input"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3 custom-input"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="d-flex justify-content-between">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-purple btn-sm"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* ================= PURPLE STYLES ================= */}

      <style>{`
        .text-purple {
          color: #7c3aed !important;
        }

        .btn-purple {
          background: linear-gradient(135deg,#7c3aed,#4c1d95);
          color: white;
          border: none;
        }

        .btn-purple:hover {
          background: #6d28d9;
          box-shadow: 0 6px 18px rgba(124,58,237,0.4);
        }

        .custom-input:focus {
          border-color: #7c3aed !important;
          box-shadow: 0 0 10px rgba(124,58,237,0.4);
        }
      `}</style>
    </div>
  );
}

export default ChangePassword;
