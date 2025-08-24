import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setShowModal(false);
    setLoading(true);

    const loginData = {
      email: e.target.email.value.trim(),
      password: e.target.password.value,
    };

    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (res.ok) {
        const data = await res.json();
        setMsg("✅ Logged in successfully!");
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", data.name);
        navigate("/");
      } else {
        setMsg("❌ Invalid credentials");
      }
    } catch (err) {
      setMsg("⚠️ Server not reachable");
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Sign In</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>{msg}</p>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
