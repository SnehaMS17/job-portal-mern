import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

export default function Register() {
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const register = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      window.location = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-card">
        <h2>Sign Up</h2>
        <p>Create your account</p>

        <input placeholder="Name" onChange={e => setForm({...form, name:e.target.value})}/>
        <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password"
               onChange={e => setForm({...form, password:e.target.value})}/>

        <button className="primary-btn" onClick={register}>Sign Up</button>
      </div>
    </>
  );
}
