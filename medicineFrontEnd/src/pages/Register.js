import React, { useState } from "react";
import "./Register.css";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const register = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      password: e.target.password.value.trim(),
    };

    try {
      const res = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      });

      if (res.ok) {
        setMsg("✅ User registered successfully!");
        e.target.reset();
      } else {
        setMsg("❌ Something went wrong. Try again.");
      }
    } catch (err) {
      setMsg("⚠️ Server not reachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create your account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input type="text" name="name" placeholder="Full Name" required />
          <input type="email" name="email" placeholder="Email Address" required />
          <input type="password" name="password" placeholder="Password" required />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {msg && <div className="register-msg">{msg}</div>}
        </form>
      </div>
    </div>
  );
}
