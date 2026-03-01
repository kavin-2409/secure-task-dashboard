import { useState } from "react";
import API from "../services/api";
import "./auth.css";

type RegisterProps = {
  goToLogin: () => void;
};

function Register({ goToLogin }: RegisterProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        email,
        password,
      });

      setMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        goToLogin();
      }, 1500);
    } catch (error) {
      // Safely tell TypeScript what shape we expect the error to have
      const err = error as { response?: { data?: { message?: string } } };
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Secure Task Manager</h1>
        <p>Create your account to start managing tasks securely.</p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Create Account</h2>
          <p className="login-subtitle">Register to continue</p>

          <form className="login-form" onSubmit={handleRegister}>
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
              Register
            </button>

            <p style={{ marginTop: "15px" }}>
              Already have an account?{" "}
              <span
                style={{ color: "#6c63ff", cursor: "pointer", fontWeight: "bold" }}
                onClick={goToLogin}
              >
                Login
              </span>
            </p>

            {message && <p className="login-error">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;