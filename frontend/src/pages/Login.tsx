import { useState } from "react";
import API from "../services/api";
import axios from "axios";
import "../App.css";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
  const res = await API.post("/auth/login", {
    email,
    password,
  });

  localStorage.setItem("token", res.data.token);

  window.location.href = "/";   // ← correct
} catch (error) {
  if (axios.isAxiosError(error)) {
    setMessage(error.response?.data?.message || "Login failed");
  } else {
    setMessage("Something went wrong");
  }
}
  };

  return (
  <div className="login-page">

    {/* Left branding section */}
    <div className="login-left">
      <h1>Secure Task Manager</h1>
      <p>Organize your work. Stay productive. Stay secure.</p>
    </div>

    {/* Right login card */}
    <div className="login-right">
      <div className="login-card">

        <h2>Welcome Back</h2>
        <p className="login-subtitle">Please sign in to continue</p>

        <form className="login-form" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Sign In
          </button>

          {message && <p className="login-error">{message}</p>}

        </form>

      </div>
    </div>

  </div>
);
}

export default Login;