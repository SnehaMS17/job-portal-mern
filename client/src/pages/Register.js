import { useState } from "react";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const register = async () => {
    await API.post("/auth/register", form);
    alert("Registered successfully");
    window.location = "/";
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={register}>Register</button>
    </div>
  );
}
