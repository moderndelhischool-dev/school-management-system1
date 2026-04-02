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
//   const [msgType, setMsgType] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getErrorMessage = (error) => {
//     if (error.code === "auth/user-not-found") return "❌ User not found";
//     if (error.code === "auth/wrong-password") return "❌ Wrong password";
//     if (error.code === "auth/invalid-email") return "❌ Invalid email";
//     return "❌ Something went wrong";
//   };

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
//       setTimeout(() => navigate("/admin/dashboard"), 1200);
//     } catch (error) {
//       setMsgType("error");
//       setMsg(getErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async () => {
//     if (!email) {
//       setMsgType("error");
//       setMsg("❌ Please enter email first");
//       return;
//     }

//     try {
//       await sendPasswordResetEmail(auth, email);
//       setMsgType("success");
//       setMsg("📩 Password reset link sent");
//     } catch (error) {
//       setMsgType("error");
//       setMsg(getErrorMessage(error));
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-box">
//         {/* LEFT SIDE */}
//         <div className="login-left">
//           <h2>Welcome Back 👋</h2>
//           <p>
//             Modern New Delhi Public High School portal. Access your dashboard
//             and manage your academic journey.
//           </p>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="login-right">
//           <div className="card shadow login-card p-4">
//             <h3 className="text-center mb-3">School Login</h3>

//             {msg && (
//               <div
//                 className={`alert ${
//                   msgType === "success" ? "alert-success" : "alert-danger"
//                 } text-center`}
//               >
//                 {msg}
//               </div>
//             )}

//             <input
//               type="email"
//               className="form-control mb-3"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               className="form-control mb-2"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <p
//               className="text-end forgot-link mb-3"
//               onClick={handleResetPassword}
//             >
//               Forgot password?
//             </p>

//             <button
//               className="btn btn-success w-100 mb-2"
//               onClick={handleLogin}
//               disabled={loading}
//             >
//               {loading ? "Logging..." : "Login"}
//             </button>

//             <button
//               className="btn btn-dark w-100"
//               onClick={handleAdminLogin}
//               disabled={loading}
//             >
//               {loading ? "Checking..." : "Admin Login"}
//             </button>

//             <p className="text-center mt-3 mb-0">
//               New user? <Link to="/register">Signup</Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .login-wrapper {
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #f5f3ff, #ede9fe);
// }

// .login-box {
//   display: flex;
//   max-width: 1000px;
//   width: 100%;
//   border-radius: 20px;
//   overflow: hidden;
//   box-shadow: 0 25px 60px rgba(76,29,149,0.25);
//   background: white;
// }

// /* LEFT SIDE PURPLE THEME */
// .login-left {
//   flex: 1;
//   background: linear-gradient(135deg, #4c1d95, #7c3aed);
//   color: white;
//   padding: 60px 40px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   transition: 0.4s ease;
// }

// .login-left:hover {
//   transform: scale(1.03);
// }

// /* RIGHT SIDE */
// .login-right {
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 50px;
// }

// /* CARD */
// .login-card {
//   width: 100%;
//   max-width: 380px;
//   border-radius: 15px;
//   border: none;
// }

// /* INPUT FOCUS PURPLE */
// .form-control:focus {
//   border-color: #7c3aed;
//   box-shadow: 0 0 0 0.2rem rgba(124,58,237,0.25);
// }

// /* FORGOT PASSWORD */
// .forgot-link {
//   color: #7c3aed;
//   cursor: pointer;
//   font-size: 14px;
//   transition: 0.3s ease;
// }

// .forgot-link:hover {
//   color: #4c1d95;
//   text-decoration: underline;
// }

// /* LOGIN BUTTON */
// .btn-success {
//   background: linear-gradient(135deg, #4c1d95, #7c3aed);
//   border: none;
// }

// .btn-success:hover {
//   background: linear-gradient(135deg, #5b21b6, #9333ea);
//   transform: translateY(-2px);
//   box-shadow: 0 10px 20px rgba(124,58,237,0.4);
// }

// /* ADMIN BUTTON */
// .btn-dark {
//   background: #1f2937;
//   border: none;
// }

// .btn-dark:hover {
//   background: #111827;
//   transform: translateY(-2px);
// }

// /* RESPONSIVE */
// @media (max-width: 900px) {
//   .login-box {
//     flex-direction: column;
//   }
// }
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
    if (error.code === "auth/user-not-found") return "No account found for this email.";
    if (error.code === "auth/wrong-password") return "Incorrect password.";
    if (error.code === "auth/invalid-email") return "Please enter a valid email address.";
    return "Sign-in failed. Please try again.";
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setMsgType("error");
      setMsg("Please enter both email and password.");
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
        setMsg("No user profile found. Contact the school office.");
        return;
      }

      if (snap.data().role === "admin") {
        setMsgType("error");
        setMsg("Use “Administrator sign-in” for staff accounts.");
        return;
      }

      setMsgType("success");
      setMsg("Signed in successfully.");
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
      setMsg("Please enter both email and password.");
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
        setMsg("This account is not authorized for administrator access.");
        return;
      }

      setMsgType("success");
      setMsg("Administrator signed in.");
      setTimeout(() => navigate("/admin/dashboard"), 1200);
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
      setMsg("Enter your email address to receive a reset link.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMsgType("success");
      setMsg("If an account exists, a password reset link has been sent.");
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
          <h2>Welcome back</h2>
          <p>
            Modern New Delhi Public High School portal. Access your dashboard
            and manage your academic journey.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <div className="login-card p-4">
            <h3 className="text-center mb-3">Sign in</h3>

            {msg && <div className={`custom-alert ${msgType}`}>{msg}</div>}

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email address"
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
              className="btn-primary-custom w-100 mb-2"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <button
              className="btn-admin-custom w-100"
              onClick={handleAdminLogin}
              disabled={loading}
            >
              {loading ? "Signing in…" : "Administrator sign-in"}
            </button>

            <p className="text-center mt-3 mb-0">
              New user?{" "}
              <Link to="/register" className="signup-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`

/* ===== WRAPPER ===== */
.login-wrapper {
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#F4F6F8;
  transition:0.3s ease;
}

body.dark-mode .login-wrapper {
  background:#0f172a;
}

/* ===== BOX ===== */
.login-box {
  display:flex;
  max-width:1000px;
  width:100%;
  border-radius:20px;
  overflow:hidden;
  background:white;
  box-shadow:0 25px 60px rgba(0,0,0,0.15);
  transition:0.3s ease;
}

body.dark-mode .login-box {
  background:#1e293b;
  box-shadow:0 25px 60px rgba(0,0,0,0.6);
}

/* ===== LEFT ===== */
.login-left {
  flex:1;
  background:linear-gradient(135deg,#0F4C6C,#1B5E84);
  color:white;
  padding:60px 40px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

body.dark-mode .login-left {
  background:linear-gradient(135deg,#0a2e42,#0f172a);
}

/* ===== RIGHT ===== */
.login-right {
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:50px;
}

/* ===== CARD ===== */
.login-card {
  width:100%;
  max-width:380px;
  border-radius:15px;
  background:white;
}

body.dark-mode .login-card {
  background:#1e293b;
  color:#f1f5f9;
}

/* ===== INPUT ===== */
body.dark-mode .form-control {
  background:#334155;
  color:white;
  border:1px solid #475569;
}

.form-control:focus {
  border-color:#D4A24C;
  box-shadow:0 0 0 0.2rem rgba(212,162,76,0.25);
}

/* ===== ALERT ===== */
.custom-alert {
  padding:10px;
  border-radius:8px;
  text-align:center;
  margin-bottom:15px;
  font-size:14px;
}

.custom-alert.success {
  background:#D1FAE5;
  color:#065F46;
}

.custom-alert.error {
  background:#FEE2E2;
  color:#991B1B;
}

body.dark-mode .custom-alert.success {
  background:#064e3b;
  color:#a7f3d0;
}

body.dark-mode .custom-alert.error {
  background:#7f1d1d;
  color:#fecaca;
}

/* ===== LINKS ===== */
.forgot-link {
  color:#0F4C6C;
  cursor:pointer;
  font-size:14px;
}

body.dark-mode .forgot-link {
  color:#93c5fd;
}

.forgot-link:hover {
  color:#D4A24C;
  text-decoration:underline;
}

.signup-link {
  color:#0F4C6C;
  font-weight:600;
}

body.dark-mode .signup-link {
  color:#93c5fd;
}

.signup-link:hover {
  color:#D4A24C;
}

/* ===== BUTTONS ===== */
.btn-primary-custom {
  padding:10px;
  border-radius:50px;
  border:none;
  background:linear-gradient(135deg,#0F4C6C,#1B5E84);
  color:white;
  font-weight:600;
  transition:0.3s ease;
}

.btn-primary-custom:hover {
  background:#D4A24C;
  color:#0F4C6C;
  transform:translateY(-2px);
}

.btn-admin-custom {
  padding:10px;
  border-radius:50px;
  border:none;
  background:#111827;
  color:white;
  font-weight:600;
  transition:0.3s ease;
}

.btn-admin-custom:hover {
  background:#D4A24C;
  color:#0F4C6C;
  transform:translateY(-2px);
}

/* ===== RESPONSIVE ===== */
@media (max-width:900px){
  .login-box{
    flex-direction:column;
  }
}

`}</style>
    </div>
  );
}

export default Login;
