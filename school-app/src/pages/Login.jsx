import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // success / error
  const [loading, setLoading] = useState(false);

  // ======================
  // USER / PARENT LOGIN
  // ======================
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
        setMsg("❌ User record Firestore me nahi mila");
        setLoading(false);
        return;
      }

      const role = snap.data().role;

      if (role === "admin") {
        setMsgType("error");
        setMsg("❌ Admin ke liye Admin Login use karo");
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
      setMsgType("success");
      setMsg("✅ User / Parent Login Successful");

      setTimeout(() => {
        navigate("/user");
      }, 1500);
    } catch (error) {
      setMsgType("error");
      setMsg("❌ " + error.message);
    }

    setLoading(false);
  };

  // ======================
  // ADMIN LOGIN
  // ======================
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

      if (!snap.exists()) {
        setMsgType("error");
        setMsg("❌ Admin record Firestore me nahi mila");
        setLoading(false);
        return;
      }

      if (snap.data().role !== "admin") {
        setMsgType("error");
        setMsg("❌ Ye admin account nahi hai");
        setLoading(false);
        return;
      }

      // ✅ ADMIN SUCCESS
      setMsgType("success");
      setMsg("👑 Admin Login Successful");

      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (error) {
      setMsgType("error");
      setMsg("❌ " + error.message);
    }

    setLoading(false);
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">School Login</h3>

        {/* ✅ MESSAGE (popup nahi, card ke andar) */}
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
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* USER / PARENT LOGIN */}
        <button
          className="btn btn-primary w-100 mb-2"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* ADMIN LOGIN */}
        <button
          className="btn btn-dark w-100"
          onClick={handleAdminLogin}
          disabled={loading}
        >
          {loading ? "Checking admin..." : "Admin Login"}
        </button>

        <p className="text-center mt-3 mb-0">
          New user? <Link to="/register">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
