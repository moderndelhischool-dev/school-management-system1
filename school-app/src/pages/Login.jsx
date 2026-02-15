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
          background: #f4f6f9;
        }

        .login-box {
          display: flex;
          max-width: 1000px;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.15);
          background: white;
        }

        .login-left {
          flex: 1;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: 0.4s ease;
        }

        .login-left:hover {
          transform: scale(1.05);
        }

        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px;
        }

        .login-card {
          width: 100%;
          max-width: 380px;
          border-radius: 15px;
        }

        .forgot-link {
          color: #22c55e;
          cursor: pointer;
          font-size: 14px;
        }

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
