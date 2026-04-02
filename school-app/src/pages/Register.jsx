// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [role, setRole] = useState("user");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const [msgType, setMsgType] = useState("");
//   const [loading, setLoading] = useState(false);

//   const getErrorMessage = (error) => {
//     if (error.code === "auth/email-already-in-use")
//       return "❌ Email already registered";
//     if (error.code === "auth/weak-password")
//       return "❌ Password should be at least 6 characters";
//     if (error.code === "auth/invalid-email") return "❌ Invalid email format";
//     return "❌ Something went wrong";
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (!name || !email || !password) {
//       setMsgType("error");
//       setMsg("❌ All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       setMsg("");

//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );

//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         name,
//         email,
//         role,
//         createdAt: new Date(),
//       });

//       setMsgType("success");
//       setMsg("✅ Registration successful! Redirecting...");

//       await auth.signOut();

//       setTimeout(() => navigate("/login"), 1800);
//     } catch (error) {
//       setMsgType("error");
//       setMsg(getErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-wrapper">
//       <div className="register-box">
//         {/* LEFT SIDE */}
//         <div className="register-left">
//           <h2>Create Account 🚀</h2>
//           <p>
//             Join Modern New Delhi Public High School portal and start managing
//             your academic journey today.
//           </p>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="register-right">
//           <div className="card shadow register-card p-4">
//             <h3 className="text-center mb-3">School Registration</h3>

//             {msg && (
//               <div
//                 className={`alert ${
//                   msgType === "success" ? "alert-success" : "alert-danger"
//                 } text-center`}
//               >
//                 {msg}
//               </div>
//             )}

//             <form onSubmit={handleRegister}>
//               <input
//                 type="text"
//                 className="form-control mb-3"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />

//               <select
//                 className="form-control mb-3"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="parent">Parent</option>
//                 <option value="user">User</option>
//               </select>

//               <input
//                 type="email"
//                 className="form-control mb-3"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <input
//                 type="password"
//                 className="form-control mb-3"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               <button className="btn btn-success w-100" disabled={loading}>
//                 {loading ? "Creating..." : "Sign Up"}
//               </button>
//             </form>

//             <p className="text-center mt-3 mb-0">
//               Already have an account? <Link to="/login">Login</Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .register-wrapper {
//   min-height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(135deg, #f5f3ff, #ede9fe);
// }

// .register-box {
//   display: flex;
//   max-width: 1000px;
//   width: 100%;
//   border-radius: 20px;
//   overflow: hidden;
//   box-shadow: 0 25px 60px rgba(76,29,149,0.25);
//   background: white;
// }

// /* LEFT SIDE PURPLE THEME */
// .register-left {
//   flex: 1;
//   background: linear-gradient(135deg, #4c1d95, #7c3aed);
//   color: white;
//   padding: 60px 40px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   transition: 0.4s ease;
// }

// .register-left:hover {
//   transform: scale(1.03);
//   box-shadow: inset 0 0 50px rgba(0,0,0,0.15);
// }

// .register-right {
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 50px;
// }

// .register-card {
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

// /* SIGNUP BUTTON */
// .btn-success {
//   background: linear-gradient(135deg, #4c1d95, #7c3aed);
//   border: none;
// }

// .btn-success:hover {
//   background: linear-gradient(135deg, #5b21b6, #9333ea);
//   transform: translateY(-2px);
//   box-shadow: 0 10px 20px rgba(124,58,237,0.4);
// }

// /* LOGIN LINK */
// .register-card a {
//   color: #7c3aed;
//   font-weight: 600;
//   transition: 0.3s ease;
// }

// .register-card a:hover {
//   color: #4c1d95;
//   text-decoration: underline;
// }

// /* RESPONSIVE */
// @media (max-width: 900px) {
//   .register-box {
//     flex-direction: column;
//   }
// }

// /* DARK MODE */
// body.dark-mode .register-wrapper {
//   background: #121212 !important;
// }

// body.dark-mode .register-box {
//   background: #1e1e1e !important;
// }

// body.dark-mode .register-card {
//   background: #1e1e1e !important;
//   color: white !important;
// }
//       `}</style>
//     </div>
//   );
// }

// export default Register;
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error) => {
    if (error.code === "auth/email-already-in-use")
      return "This email is already registered.";
    if (error.code === "auth/weak-password")
      return "Password must be at least 6 characters.";
    if (error.code === "auth/invalid-email")
      return "Please enter a valid email address.";
    return "Registration could not be completed. Please try again.";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMsgType("error");
      setMsg("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setMsg("");

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      setMsgType("success");
      setMsg("Registration successful. Redirecting to sign in…");

      await auth.signOut();
      setTimeout(() => navigate("/login"), 1800);
    } catch (error) {
      setMsgType("error");
      setMsg(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        {/* LEFT SIDE */}
        <div className="register-left">
          <h2>Create an account</h2>
          <p>
            Join Modern New Delhi Public High School portal and start managing
            your academic journey today.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">
          <div className="register-card p-4">
            <h3 className="text-center mb-3">New user registration</h3>

            {msg && <div className={`custom-alert ${msgType}`}>{msg}</div>}

            <form onSubmit={handleRegister}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <select
                className="form-control mb-3"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="parent">Parent</option>
                <option value="user">User</option>
              </select>

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn-primary-custom w-100" disabled={loading}>
                {loading ? "Creating account…" : "Register"}
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`

/* ===== WRAPPER ===== */
.register-wrapper {
  min-height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#F4F6F8;
  transition:0.3s ease;
}

body.dark-mode .register-wrapper {
  background:#0f172a;
}

/* ===== MAIN BOX ===== */
.register-box {
  display:flex;
  max-width:1000px;
  width:100%;
  border-radius:20px;
  overflow:hidden;
  box-shadow:0 25px 60px rgba(0,0,0,0.15);
  background:white;
  transition:0.3s ease;
}

body.dark-mode .register-box {
  background:#1e293b;
  box-shadow:0 25px 60px rgba(0,0,0,0.6);
}

/* ===== LEFT SIDE ===== */
.register-left {
  flex:1;
  background:linear-gradient(135deg,#0F4C6C,#1B5E84);
  color:white;
  padding:60px 40px;
  display:flex;
  flex-direction:column;
  justify-content:center;
}

.register-left p {
  margin-top:15px;
  color:#E5E7EB;
}

/* ===== RIGHT SIDE ===== */
.register-right {
  flex:1;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:50px;
}

/* ===== CARD ===== */
.register-card {
  width:100%;
  max-width:380px;
  border-radius:15px;
  background:white;
  transition:0.3s ease;
}

body.dark-mode .register-card {
  background:#1e293b;
  color:#f1f5f9;
}

/* ===== INPUT ===== */
.form-control {
  border-radius:10px;
}

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

/* ===== BUTTON ===== */
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

/* ===== LINK ===== */
.login-link {
  color:#0F4C6C;
  font-weight:600;
}

body.dark-mode .login-link {
  color:#93c5fd;
}

.login-link:hover {
  color:#D4A24C;
  text-decoration:underline;
}

/* ===== RESPONSIVE ===== */
@media (max-width:900px){
  .register-box{
    flex-direction:column;
  }
}

`}</style>
    </div>
  );
}

export default Register;
