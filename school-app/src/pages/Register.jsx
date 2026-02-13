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

//       // 🔥 Save user data in Firestore
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         name,
//         email,
//         role,
//         createdAt: new Date(),
//       });

//       // ✅ SUCCESS
//       setMsgType("success");
//       setMsg("✅ Registration successful! Redirecting to login...");

//       // 🔐 force logout
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
//     <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
//       <div className="card p-4 shadow" style={{ width: "420px" }}>
//         <h3 className="text-center mb-3">School Registration</h3>

//         {/* MESSAGE */}
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
  const [msgType, setMsgType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error) => {
    if (error.code === "auth/email-already-in-use")
      return "❌ Email already registered";
    if (error.code === "auth/weak-password")
      return "❌ Password should be at least 6 characters";
    if (error.code === "auth/invalid-email") return "❌ Invalid email format";
    return "❌ " + error.message;
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
      setMsg("✅ Registration successful! Redirecting to login...");

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
    <div className="register-page vh-100 d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow register-card" style={{ width: "420px" }}>
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>

      {/* ===== DARK MODE STYLE ===== */}
      <style>{`
        .register-page {
          background-color: #f8f9fa;
          transition: background-color 0.3s ease;
        }

        /* DARK MODE */
        body.dark-mode .register-page {
          background-color: #121212 !important;
        }

        body.dark-mode .register-card {
          background-color: #1e1e1e !important;
          color: white !important;
          border: 1px solid #333;
        }

        body.dark-mode .register-card * {
          color: white !important;
        }

        body.dark-mode .form-control {
          background-color: #2c2c2c;
          color: white;
          border: 1px solid #444;
        }

        body.dark-mode .form-control::placeholder {
          color: #aaa;
        }

        body.dark-mode .btn-success {
          background-color: #198754;
          border-color: #198754;
        }
      `}</style>
    </div>
  );
}

export default Register;
