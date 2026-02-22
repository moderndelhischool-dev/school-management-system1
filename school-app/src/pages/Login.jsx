// import {
//   signInWithEmailAndPassword,
//   sendPasswordResetEmail,
// } from "firebase/auth";
// import { auth, db } from "../firebase/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [msg, setMsg] = useState("");
//   const [msgType, setMsgType] = useState(""); // success | error
//   const [loading, setLoading] = useState(false);

//   /* ======================
//      ERROR MESSAGE HANDLER
//   ====================== */
//   const getErrorMessage = (error) => {
//     if (error.code === "auth/user-not-found") return "❌ User not found";
//     if (error.code === "auth/wrong-password") return "❌ Wrong password";
//     if (error.code === "auth/invalid-email") return "❌ Invalid email";
//     return "❌ Something went wrong";
//   };

//   /* ======================
//      USER / PARENT LOGIN
//   ====================== */
//   const handleLogin = async () => {
//     if (!email || !password) {
//       setMsgType("error");
//       setMsg("❌ Email aur Password dono bharo");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMsg("");

//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       const uid = userCred.user.uid;

//       const snap = await getDoc(doc(db, "users", uid));

//       if (!snap.exists()) {
//         setMsgType("error");
//         setMsg("❌ User record nahi mila");
//         return;
//       }

//       if (snap.data().role === "admin") {
//         setMsgType("error");
//         setMsg("❌ Admin ke liye Admin Login use karo");
//         return;
//       }

//       setMsgType("success");
//       setMsg("✅ Login successful");

//       setTimeout(() => navigate("/user"), 1200);
//     } catch (error) {
//       setMsgType("error");
//       setMsg(getErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ======================
//      ADMIN LOGIN
//   ====================== */
//   const handleAdminLogin = async () => {
//     if (!email || !password) {
//       setMsgType("error");
//       setMsg("❌ Email aur Password dono bharo");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMsg("");

//       const userCred = await signInWithEmailAndPassword(auth, email, password);
//       const uid = userCred.user.uid;

//       const snap = await getDoc(doc(db, "users", uid));

//       if (!snap.exists() || snap.data().role !== "admin") {
//         setMsgType("error");
//         setMsg("❌ Admin account nahi hai");
//         return;
//       }

//       setMsgType("success");
//       setMsg("👑 Admin login successful");

//       setTimeout(() => navigate("/admin"), 1200);
//     } catch (error) {
//       setMsgType("error");
//       setMsg(getErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ======================
//      FORGOT PASSWORD
//   ====================== */
//   const handleResetPassword = async () => {
//     if (!email) {
//       setMsgType("error");
//       setMsg("❌ Please enter email first");
//       return;
//     }

//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMsgType("success");
//       setMsg("📩 Password reset link sent to your email");
//     } catch (error) {
//       setMsgType("error");
//       setMsg(getErrorMessage(error));
//     }
//   };

//   return (
//     <div className="login-page vh-100 d-flex justify-content-center align-items-center">
//       <div className="card p-4 shadow login-card" style={{ width: "400px" }}>
//         <h3 className="text-center mb-3">School Login</h3>

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
//           type="email"
//           className="form-control mb-3"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="form-control mb-2"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <p className="text-end mb-3 forgot-link" onClick={handleResetPassword}>
//           Forgot password?
//         </p>

//         <button
//           className="btn btn-primary w-100 mb-2"
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <button
//           className="btn btn-dark w-100"
//           onClick={handleAdminLogin}
//           disabled={loading}
//         >
//           {loading ? "Checking admin..." : "Admin Login"}
//         </button>

//         <p className="text-center mt-3 mb-0">
//           New user? <Link to="/register">Signup</Link>
//         </p>
//       </div>

//       {/* ===== DARK MODE STYLE ===== */}
//       <style>{`
//         .login-page {
//           background-color: #f8f9fa;
//           transition: background-color 0.3s ease;
//         }

//         .forgot-link {
//           cursor: pointer;
//           color: #0d6efd;
//           font-size: 14px;
//         }

//         /* DARK MODE */
//         body.dark-mode .login-page {
//           background-color: #121212 !important;
//         }

//         body.dark-mode .login-card {
//           background-color: #1e1e1e !important;
//           color: white !important;
//           border: 1px solid #333;
//         }

//         body.dark-mode .login-card * {
//           color: white !important;
//         }

//         body.dark-mode .form-control {
//           background-color: #2c2c2c;
//           color: white;
//           border: 1px solid #444;
//         }

//         body.dark-mode .form-control::placeholder {
//           color: #aaa;
//         }

//         body.dark-mode .btn-dark {
//           background-color: #333;
//           border-color: #333;
//         }

//         body.dark-mode .forgot-link {
//           color: #4da3ff !important;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default Login;
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error) => {
    if (error.code === "auth/user-not-found") return "❌ User not found";
    if (error.code === "auth/wrong-password") return "❌ Wrong password";
    if (error.code === "auth/invalid-email") return "❌ Invalid email";
    return "❌ Something went wrong";
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setMsgType("error");
      setMsg("❌ Email aur Password dono bharo");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const snap = await getDoc(doc(db, "users", uid));

      if (!snap.exists()) {
        setMsgType("error");
        setMsg("❌ User record nahi mila");
        return;
      }

      if (snap.data().role === "admin") {
        setMsgType("error");
        setMsg("❌ Admin ke liye Admin Login use karo");
        return;
      }

      setMsgType("success");
      setMsg("✅ Login successful");
      setTimeout(() => navigate("/user"), 1200);
    } catch (error) {
      setMsgType("error");
      setMsg(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    if (!email || !password) {
      setMsgType("error");
      setMsg("❌ Email aur Password dono bharo");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      const snap = await getDoc(doc(db, "users", uid));

      if (!snap.exists() || snap.data().role !== "admin") {
        setMsgType("error");
        setMsg("❌ Admin account nahi hai");
        return;
      }

      setMsgType("success");
      setMsg("👑 Admin login successful");
      setTimeout(() => navigate("/admin"), 1200);
    } catch (error) {
      setMsgType("error");
      setMsg(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setMsgType("error");
      setMsg("❌ Please enter email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMsgType("success");
      setMsg("📩 Password reset link sent");
    } catch (error) {
      setMsgType("error");
      setMsg(getErrorMessage(error));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        {/* LEFT SIDE */}
        <div className="login-left">
          <h2>Welcome Back 👋</h2>
          <p>
            Modern New Delhi Public High School portal. Access your dashboard
            and manage your academic journey.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <div className="card shadow login-card p-4">
            <h3 className="text-center mb-3">School Login</h3>

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
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p
              className="text-end forgot-link mb-3"
              onClick={handleResetPassword}
            >
              Forgot password?
            </p>

            <button
              className="btn btn-success w-100 mb-2"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging..." : "Login"}
            </button>

            <button
              className="btn btn-dark w-100"
              onClick={handleAdminLogin}
              disabled={loading}
            >
              {loading ? "Checking..." : "Admin Login"}
            </button>

            <p className="text-center mt-3 mb-0">
              New user? <Link to="/register">Signup</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f3ff, #ede9fe);
}

.login-box {
  display: flex;
  max-width: 1000px;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(76,29,149,0.25);
  background: white;
}

/* LEFT SIDE PURPLE THEME */
.login-left {
  flex: 1;
  background: linear-gradient(135deg, #4c1d95, #7c3aed);
  color: white;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.4s ease;
}

.login-left:hover {
  transform: scale(1.03);
}

/* RIGHT SIDE */
.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
}

/* CARD */
.login-card {
  width: 100%;
  max-width: 380px;
  border-radius: 15px;
  border: none;
}

/* INPUT FOCUS PURPLE */
.form-control:focus {
  border-color: #7c3aed;
  box-shadow: 0 0 0 0.2rem rgba(124,58,237,0.25);
}

/* FORGOT PASSWORD */
.forgot-link {
  color: #7c3aed;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease;
}

.forgot-link:hover {
  color: #4c1d95;
  text-decoration: underline;
}

/* LOGIN BUTTON */
.btn-success {
  background: linear-gradient(135deg, #4c1d95, #7c3aed);
  border: none;
}

.btn-success:hover {
  background: linear-gradient(135deg, #5b21b6, #9333ea);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(124,58,237,0.4);
}

/* ADMIN BUTTON */
.btn-dark {
  background: #1f2937;
  border: none;
}

.btn-dark:hover {
  background: #111827;
  transform: translateY(-2px);
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .login-box {
    flex-direction: column;
  }
}
      `}</style>
    </div>
  );
}

export default Login;
