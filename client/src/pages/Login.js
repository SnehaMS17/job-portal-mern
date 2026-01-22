import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location = "/internships";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-card">
        <h2>Sign In</h2>
        <p>Sign in to your account</p>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
               onChange={e => setPassword(e.target.value)} />

        <button className="primary-btn" onClick={login}>Sign In</button>
      </div>
    </>
  );
}
