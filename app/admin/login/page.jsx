"use client";
import React, { useState } from "react";
import { withBasePath } from "@/lib/asset";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        window.location.href = "/admin"; // Redirect to admin home dashboard
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#030303",
        backgroundImage: "url('/assets/img/hero/ai/bg-black.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        padding: "20px"
      }}
    >
      {/* Ambient Radial Glowing Light for Sports Grid Feel */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(27,59,138,0.1) 0%, rgba(0,0,0,0) 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      ></div>

      {/* Carbon Grid Subtitle Layer */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, #030303 100%), url('https://www.transparenttextures.com/patterns/carbon-fibre.png')",
          opacity: 0.4,
          zIndex: 1,
          pointerEvents: "none"
        }}
      ></div>

      {/* Container holding Login Widget */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "420px",
          width: "100%",
          background: "rgba(10, 12, 16, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.04)",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: isHovered ? "0 25px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(50, 87, 255, 0.1)" : "0 20px 40px rgba(0, 0, 0, 0.7)",
          transition: "all 0.4s ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "4px",
            background: "#3257ff",
            borderRadius: "0 0 4px 4px",
            boxShadow: "0 0 15px rgba(50, 87, 255, 0.4)"
          }}
        ></div>

        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <img
            src={withBasePath("/assets/img/logo/logo-white-2.png")}
            alt="KNYX Logo"
            style={{ height: "32px", width: "auto", objectFit: "contain", marginBottom: "12px" }}
          />
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600 }}>Administration</p>
        </div>

        {error && (
          <div style={{ padding: "12px", background: "rgba(220, 53, 69, 0.1)", border: "1px solid rgba(220, 53, 69, 0.2)", borderRadius: "10px", color: "#ff6b6b", fontSize: "13px", marginBottom: "20px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

          <div style={{ position: "relative" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 500, marginBottom: "8px" }}>Username</label>
            <input
              type="email"
              placeholder="operator@knyx.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "15px",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => { e.target.style.borderColor = "#3257ff"; e.target.style.background = "rgba(0,0,0,0.3)"; }}
              onBlur={(e) => { e.target.style.borderColor = "rgba(255, 255, 255, 0.08)"; e.target.style.background = "rgba(255, 255, 255, 0.03)"; }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: 500, marginBottom: "8px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "14px 44px 14px 16px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => { e.target.style.borderColor = "#3257ff"; e.target.style.background = "rgba(0,0,0,0.3)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(255, 255, 255, 0.08)"; e.target.style.background = "rgba(255, 255, 255, 0.03)"; }}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "16px",
                  cursor: "pointer",
                  color: "#3257ff",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "rgba(255,255,255,0.4)", fontSize: "12px", cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: "#3257ff" }} /> Remember
            </label>
            <a href="#" style={{ color: "#3257ff", fontSize: "12px", textDecoration: "none", opacity: 0.8 }}>Forgot access?</a>
          </div>

          <button
            type="submit"
            style={{
              padding: "16px",
              background: "linear-gradient(135deg, #3257ff 0%, #001A3D 100%)",
              border: "none",
              borderRadius: "12px",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "10px",
              boxShadow: "0 4px 20px rgba(50, 87, 255, 0.2)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(50, 87, 255, 0.4)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(50, 87, 255, 0.2)"; }}
          >
            Authenticate
            <svg width="18" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z" fill="currentColor" />
            </svg>
          </button>
        </form>
      </div>

      <style jsx>{`
        input::placeholder {
          color: rgba(255,255,255,0.2) !important;
        }
      `}</style>
    </div>
  );
};

export default AdminLoginPage;
