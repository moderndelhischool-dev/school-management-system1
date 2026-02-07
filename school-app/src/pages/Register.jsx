// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// function Register() {
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("user");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password,
//       );

//       // 🔥 role Firestore me save ho raha hai
//       await setDoc(doc(db, "users", userCredential.user.uid), {
//         name: name,
//         email: email,
//         role: role,
//       });

//       alert("Registration Successful 🎉");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
//       <div className="card p-4 shadow" style={{ width: "420px" }}>
//         <h3 className="text-center mb-3">School Registration</h3>

//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             className="form-control mb-3"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />

//           {/* ROLE OPTION */}
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
//             required
//           />

//           <input
//             type="password"
//             className="form-control mb-3"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <button className="btn btn-success w-100">Sign Up</button>
//         </form>

//         <p className="text-center mt-3 mb-0">
//           Already have an account? <Link to="/">Login</Link>
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

  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // 🔥 role Firestore me save
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: name,
        email: email,
        role: role,
      });

      // ✅ SUCCESS MESSAGE
      setSuccessMsg("✅ Registration successful! Redirecting to login...");

      // 🔐 logout so user must login manually
      await auth.signOut();

      // ⏳ redirect to login page
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "420px" }}>
        <h3 className="text-center mb-3">School Registration</h3>

        {/* ✅ SUCCESS MESSAGE (POSITION SAME) */}
        {successMsg && (
          <div className="alert alert-success text-center">{successMsg}</div>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* ROLE OPTION */}
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
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-success w-100" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
