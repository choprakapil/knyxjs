"use client";
import React, { useState } from "react";
import { withBasePath } from "@/lib/asset";

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        window.location.href = "/admin"; 
      } else {
        setError(data.error || "Access Denied. Check credentials.");
      }
    } catch (err) {
      setError("Synchronisation Error. Check network integrity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={rootStyle}>
      {/* 🔮 MESH GRADIENT BACKGROUND */}
      <div style={meshGradientStyle}></div>
      <div style={glowTopStyle}></div>
      <div style={glowBottomStyle}></div>

      {/* 🏛️ LOGIN ARCHITECTURE */}
      <div
        style={{
          ...cardStyle,
          boxShadow: isHovered ? "0 50px 100px rgba(50, 87, 255, 0.12)" : "0 25px 60px rgba(0, 0, 0, 0.04)",
          transform: isHovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <div style={logoContainerStyle}>
            <img
              src={withBasePath("/assets/img/logo/logo-black.png")}
              alt="KNYX Brand"
              style={logoStyle}
            />
          </div>
          <div style={badgeContainerStyle}>
            <div style={badgeDotStyle}></div>
            <span style={badgeTextStyle}>Security Architecture</span>
          </div>
          <h2 style={titleStyle}>Command Center</h2>
          <p style={subtitleStyle}>Professional access for KNYX administrators.</p>
        </div>

        {error && (
          <div style={errorContainerStyle}>
             <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "10px" }}></i>
             {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Identity Token (Email)</label>
            <div style={inputWrapperBase}>
               <i className="fa-solid fa-fingerprint" style={inputIconStyle}></i>
               <input
                 type="email"
                 placeholder="name@knyxsports.com"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                 style={inputFieldStyle}
                 onFocus={(e) => applyFocus(e)}
                 onBlur={(e) => removeFocus(e)}
               />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Cipher Key (Password)</label>
            <div style={inputWrapperBase}>
              <i className="fa-solid fa-key" style={inputIconStyle}></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ ...inputFieldStyle, paddingRight: "55px" }}
                onFocus={(e) => applyFocus(e)}
                onBlur={(e) => removeFocus(e)}
              />
              <div onClick={() => setShowPassword(!showPassword)} style={eyeIconWrapperStyle}>
                {showPassword ? <i className="fa-solid fa-eye-low-vision"></i> : <i className="fa-solid fa-eye"></i>}
              </div>
            </div>
          </div>

          <div style={footerActionStyle}>
            <label style={checkboxLabelStyle}>
              <input type="checkbox" style={checkboxStyle} /> 
              <span style={{ fontSize: "13px" }}>Maintain persistent link</span>
            </label>
            <a href="#" style={linkStyle}>Recovery protocol</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...submitBtnStyle,
              background: loading ? "#f1f5f9" : "#3257ff",
              color: loading ? "#94a3b8" : "#ffffff"
            }}
          >
            {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Authenticate Access"}
            {!loading && <i className="fa-solid fa-shield-halved" style={{ fontSize: "14px", opacity: 0.8 }}></i>}
          </button>
        </form>

        <div style={brandFooterStyle}>
          &copy; {new Date().getFullYear()} KNYX PLATAFORM ARCHITECTURE
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        input::placeholder { color: #cbd5e1 !important; }
      `}</style>
    </div>
  );
};

// --- STYLES ---
const rootStyle = { minHeight: "100vh", backgroundColor: "#f8faff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", padding: "30px", overflow: "hidden", fontFamily: "'Plus Jakarta Sans', sans-serif" };
const meshGradientStyle = { position: "absolute", inset: 0, backgroundImage: "radial-gradient(at 0% 0%, rgba(50, 87, 255, 0.08) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(50, 87, 255, 0.08) 0, transparent 50%)", zIndex: 0 };
const glowTopStyle = { position: "absolute", width: "600px", height: "600px", background: "rgba(50, 87, 255, 0.04)", borderRadius: "50%", filter: "blur(120px)", top: "-200px", right: "-100px", zIndex: 1 };
const glowBottomStyle = { position: "absolute", width: "600px", height: "600px", background: "rgba(50, 87, 255, 0.04)", borderRadius: "50%", filter: "blur(120px)", bottom: "-200px", left: "-100px", zIndex: 1 };

const cardStyle = { position: "relative", zIndex: 10, maxWidth: "480px", width: "100%", background: "rgba(255, 255, 255, 0.95)", backdropFilter: "blur(20px)", border: "1px solid #ffffff", borderRadius: "40px", padding: "60px 50px", transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)" };

const logoContainerStyle = { marginBottom: "25px" };
const logoStyle = { height: "36px", width: "auto", objectFit: "contain" };
const badgeContainerStyle = { display: "inline-flex", alignItems: "center", gap: "10px", padding: "8px 16px", background: "#f1f5f9", borderRadius: "100px", marginBottom: "20px" };
const badgeDotStyle = { width: "8px", height: "8px", borderRadius: "50%", background: "#3257ff" };
const badgeTextStyle = { color: "#3257ff", fontSize: "11px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 800 };

const titleStyle = { margin: 0, fontSize: "28px", fontWeight: 800, color: "#1e293b", letterSpacing: "-0.5px" };
const subtitleStyle = { margin: "10px 0 0", fontSize: "14px", color: "#64748b", fontWeight: 500 };

const errorContainerStyle = { padding: "16px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "16px", color: "#b91c1c", fontSize: "13px", marginBottom: "30px", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center" };

const inputGroupStyle = { position: "relative" };
const labelStyle = { display: "block", color: "#1e293b", fontSize: "12px", fontWeight: 800, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px", opacity: 0.7 };
const inputWrapperBase = { position: "relative", display: "flex", alignItems: "center" };
const inputIconStyle = { position: "absolute", left: "20px", color: "#cbd5e1", fontSize: "16px", transition: "color 0.3s" };
const inputFieldStyle = { width: "100%", padding: "18px 20px 18px 55px", background: "#f8faff", border: "1.5px solid #e2e8f0", borderRadius: "18px", color: "#1e293b", fontSize: "15px", outline: "none", fontWeight: 600, transition: "all 0.3s" };
const eyeIconWrapperStyle = { position: "absolute", right: "20px", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center", fontSize: "18px", transition: "all 0.2s" };

const footerActionStyle = { display: "flex", justifyContent: "space-between", alignItems: "center" };
const checkboxLabelStyle = { display: "flex", alignItems: "center", gap: "10px", color: "#64748b", cursor: "pointer", fontWeight: 600 };
const checkboxStyle = { accentColor: "#3257ff", width: "18px", height: "18px", borderRadius: "6px" };
const linkStyle = { color: "#3257ff", fontSize: "13px", textDecoration: "none", fontWeight: 800 };

const submitBtnStyle = { width: "100%", padding: "20px", border: "none", borderRadius: "20px", fontWeight: 800, fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", marginTop: "10px", boxShadow: "0 10px 30px rgba(50, 87, 255, 0.2)", transition: "all 0.4s ease" };
const brandFooterStyle = { marginTop: "50px", textAlign: "center", fontSize: "10px", color: "#cbd5e1", fontWeight: 800, letterSpacing: "1.5px" };

const applyFocus = (e) => {
  e.target.style.borderColor = "#3257ff";
  e.target.style.background = "#ffffff";
  e.target.style.boxShadow = "0 0 0 5px rgba(50, 87, 255, 0.08)";
  e.target.previousSibling.style.color = "#3257ff";
};
const removeFocus = (e) => {
  e.target.style.borderColor = "#e2e8f0";
  e.target.style.background = "#f8faff";
  e.target.style.boxShadow = "none";
  e.target.previousSibling.style.color = "#cbd5e1";
};

export default AdminLoginPage;
