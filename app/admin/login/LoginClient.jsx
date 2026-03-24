"use client";

import { useState, useEffect } from "react";

export default function LoginClient() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      window.location.href = "/admin/products";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <style jsx>{`
        .login-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background-color: #0d0d0f;
        }

        .login-card {
          width: 400px;
          padding: 40px;
          background-color: rgba(20, 20, 22, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        }

        .login-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          text-align: center;
          color: #ffffff;
          letter-spacing: 0.5px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #8c8c9a;
          font-size: 0.85rem;
          font-weight: 500;
        }

        .form-control {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: white;
          padding: 12px 16px;
          border-radius: 10px;
          width: 100%;
          transition: all 0.2s ease;
        }

        .form-control:focus {
          border-color: #ff3366;
          background: rgba(255, 255, 255, 0.06);
          outline: none;
          box-shadow: 0 0 0 4px rgba(255, 51, 102, 0.1);
        }

        .login-btn {
          background: #ff3366;
          color: white;
          border: none;
          padding: 14px;
          border-radius: 10px;
          width: 100%;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.2s ease;
          letter-spacing: 0.5px;
        }

        .login-btn:hover {
          background: #e62254;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 51, 102, 0.25);
        }

        .login-btn:active {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .error-msg {
          background: rgba(255, 77, 77, 0.1);
          border: 1px solid rgba(255, 77, 77, 0.2);
          color: #ff4d4d;
          font-size: 0.85rem;
          padding: 10px 12px;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
        }
      `}</style>

      <div className="login-card">
        <h2>Admin Login</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
