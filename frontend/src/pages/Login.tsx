import { useState } from "react";
import API from "../services/api";
import axios from "axios";
import "./auth.css";

type LoginProps = {
  onLoginSuccess: () => void;
  goToRegister: () => void;
};

function Login({ onLoginSuccess, goToRegister }: LoginProps) {
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

      onLoginSuccess();

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
      <div className="login-left">
        <h1>Secure Task Manager</h1>
        <p>Organize your work. Stay productive. Stay secure.</p>
      </div>

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

            <p style={{ marginTop: "15px" }}>
              Don't have an account?{" "}
              <span
                style={{ color: "#6c63ff", cursor: "pointer", fontWeight: "bold" }}
                onClick={goToRegister}
              >
                Register
              </span>
            </p>

            {message && <p className="login-error">{message}</p>}

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;