// import { useState } from "react";
// import {
//   EmailAuthProvider,
//   reauthenticateWithCredential,
//   updatePassword,
// } from "firebase/auth";
// import { auth } from "../firebase/firebase";

// function ChangePassword({ onClose }) {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const [msg, setMsg] = useState("");
//   const [msgType, setMsgType] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChangePassword = async () => {
//     if (!currentPassword || !newPassword || !confirmPassword) {
//       setMsgType("error");
//       setMsg("❌ All fields are required");
//       return;
//     }

//     if (newPassword.length < 6) {
//       setMsgType("error");
//       setMsg("❌ Password must be at least 6 characters");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setMsgType("error");
//       setMsg("❌ New password & confirm password do not match");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMsg("");

//       const user = auth.currentUser;

//       if (!user) {
//         setMsgType("error");
//         setMsg("❌ User not logged in");
//         return;
//       }

//       const credential = EmailAuthProvider.credential(
//         user.email,
//         currentPassword,
//       );

//       await reauthenticateWithCredential(user, credential);
//       await updatePassword(user, newPassword);

//       setMsgType("success");
//       setMsg("✅ Password changed successfully");

//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmPassword("");

//       setTimeout(() => {
//         onClose();
//       }, 1500);
//     } catch (error) {
//       let errorMsg = "❌ Something went wrong";

//       if (error.code === "auth/wrong-password") {
//         errorMsg = "❌ Current password is incorrect";
//       }

//       setMsgType("error");
//       setMsg(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
//       style={{ background: "rgba(0,0,0,0.55)", zIndex: 1050 }}
//     >
//       <div
//         className="card shadow p-4"
//         style={{
//           width: "380px",
//           borderRadius: "18px",
//         }}
//       >
//         <h5 className="mb-3 text-center text-purple">🔐 Change Password</h5>

//         {msg && (
//           <div
//             className={`alert ${
//               msgType === "success" ? "alert-success" : "alert-danger"
//             } text-center`}
//           >
//             {msg}
//           </div>
//         )}

//         <input
//           type="password"
//           className="form-control mb-3 custom-input"
//           placeholder="Current Password"
//           value={currentPassword}
//           onChange={(e) => setCurrentPassword(e.target.value)}
//         />

//         <input
//           type="password"
//           className="form-control mb-3 custom-input"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />

//         <input
//           type="password"
//           className="form-control mb-3 custom-input"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <div className="d-flex justify-content-between">
//           <button
//             className="btn btn-outline-secondary btn-sm"
//             onClick={onClose}
//           >
//             Cancel
//           </button>

//           <button
//             className="btn btn-purple btn-sm"
//             onClick={handleChangePassword}
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Password"}
//           </button>
//         </div>
//       </div>

//       {/* ================= PURPLE STYLES ================= */}

//       <style>{`
//         .text-purple {
//           color: #7c3aed !important;
//         }

//         .btn-purple {
//           background: linear-gradient(135deg,#7c3aed,#4c1d95);
//           color: white;
//           border: none;
//         }

//         .btn-purple:hover {
//           background: #6d28d9;
//           box-shadow: 0 6px 18px rgba(124,58,237,0.4);
//         }

//         .custom-input:focus {
//           border-color: #7c3aed !important;
//           box-shadow: 0 0 10px rgba(124,58,237,0.4);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default ChangePassword;
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
      setMsg("❌ Passwords do not match");
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
      setMsg("✅ Password updated successfully");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      let errorMsg = "❌ Something went wrong";
      if (error.code === "auth/wrong-password") {
        errorMsg = "❌ Current password incorrect";
      }
      setMsgType("error");
      setMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay">
      <div className="glass-card">
        <h5 className="title">🔐 Change Password</h5>

        {msg && <div className={`alert-box ${msgType}`}>{msg}</div>}

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className="btn-row">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="update-btn"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>

      <style>{`

/* OVERLAY */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

/* GLASS CARD */
.glass-card {
  width: 400px;
  padding: 35px;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 25px 60px rgba(76,29,149,0.4);
  animation: fadeIn 0.4s ease;
  color: white;
}

@keyframes fadeIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

/* ALERT */
.alert-box {
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
}

.alert-box.success {
  background: rgba(16,185,129,0.2);
  color: #10b981;
}

.alert-box.error {
  background: rgba(239,68,68,0.2);
  color: #ef4444;
}

/* INPUT */
.glass-card input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.1);
  color: white;
  transition: 0.3s;
}

.glass-card input::placeholder {
  color: rgba(255,255,255,0.7);
}

.glass-card input:focus {
  border-color: #c084fc;
  box-shadow: 0 0 12px rgba(192,132,252,0.5);
  outline: none;
}

/* BUTTONS */
.btn-row {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.cancel-btn {
  background: rgba(255,255,255,0.15);
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

.cancel-btn:hover {
  background: rgba(255,255,255,0.25);
}

.update-btn {
  background: linear-gradient(135deg,#a855f7,#7c3aed);
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.update-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(168,85,247,0.6);
}

      `}</style>
    </div>
  );
}

export default ChangePassword;
