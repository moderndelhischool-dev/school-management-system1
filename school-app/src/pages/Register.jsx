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
//   const [msgType, setMsgType] = useState(""); // success | error
//   const [loading, setLoading] = useState(false);

//   const getErrorMessage = (error) => {
//     if (error.code === "auth/email-already-in-use")
//       return "❌ Email already registered";
//     if (error.code === "auth/weak-password")
//       return "❌ Password should be at least 6 characters";
//     if (error.code === "auth/invalid-email") return "❌ Invalid email format";
//     return "❌ " + error.message;
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
//       setMsg("✅ Registration successful! Redirecting to login...");

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
//     <div className="register-page vh-100 d-flex justify-content-center align-items-center">
//       <div className="card p-4 shadow register-card" style={{ width: "420px" }}>
//         <h3 className="text-center mb-3">School Registration</h3>

//         {msg && (
//           <div
//             className={`alert ${
//               msgType === "success" ? "alert-success" : "alert-danger"
//             } text-center`}
//           >
//             {msg}
//           </div>
//         )}

//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <select
//             className="form-control mb-3"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="parent">Parent</option>
//             <option value="user">User</option>
//           </select>

//           <input
//             type="email"
//             className="form-control mb-3"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button className="btn btn-success w-100" disabled={loading}>
//             {loading ? "Creating account..." : "Sign Up"}
//           </button>
//         </form>

//         <p className="text-center mt-3 mb-0">
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>

//       {/* ===== DARK MODE STYLE ===== */}
//       <style>{`
//         .register-page {
//           background-color: #f8f9fa;
//           transition: background-color 0.3s ease;
//         }

//         /* DARK MODE */
//         body.dark-mode .register-page {
//           background-color: #121212 !important;
//         }

//         body.dark-mode .register-card {
//           background-color: #1e1e1e !important;
//           color: white !important;
//           border: 1px solid #333;
//         }

//         body.dark-mode .register-card * {
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

//         body.dark-mode .btn-success {
//           background-color: #198754;
//           border-color: #198754;
//         }
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
      return "❌ Email already registered";
    if (error.code === "auth/weak-password")
      return "❌ Password should be at least 6 characters";
    if (error.code === "auth/invalid-email") return "❌ Invalid email format";
    return "❌ Something went wrong";
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMsgType("error");
      setMsg("❌ All fields are required");
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
      setMsg("✅ Registration successful! Redirecting...");

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
          <h2>Create Account 🚀</h2>
          <p>
            Join Modern New Delhi Public High School portal and start managing
            your academic journey today.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">
          <div className="card shadow register-card p-4">
            <h3 className="text-center mb-3">School Registration</h3>

            {msg && (
              <div
                className={`alert ${
                  msgType === "success" ? "alert-success" : "alert-danger"
                } text-center`}
              >
                {msg}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Full Name"
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
                placeholder="Email"
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

              <button className="btn btn-success w-100" disabled={loading}>
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center mt-3 mb-0">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .register-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f6f9;
        }

        .register-box {
          display: flex;
          max-width: 1000px;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0,0,0,0.15);
          background: white;
        }

        .register-left {
          flex: 1;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: 0.4s ease;
        }

        .register-left:hover {
          transform: scale(1.03);
          box-shadow: inset 0 0 50px rgba(0,0,0,0.15);
        }

        .register-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px;
        }

        .register-card {
          width: 100%;
          max-width: 380px;
          border-radius: 15px;
        }

        @media (max-width: 900px) {
          .register-box {
            flex-direction: column;
          }
        }

        body.dark-mode .register-wrapper {
          background: #121212 !important;
        }

        body.dark-mode .register-box {
          background: #1e1e1e !important;
        }

        body.dark-mode .register-card {
          background: #1e1e1e !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default Register;
