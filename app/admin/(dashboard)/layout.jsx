"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";
import { usePathname } from "next/navigation";

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Profile Edit State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const menuItems = [
    { title: "Dashboard", id: "dashboard", icon: "fa-chart-pie", href: "/admin" },
    { title: "Homepage CMS", id: "homepage", icon: "fa-house-chimney-window", href: "/admin/homepage" },
    { title: "Technology", id: "technology", icon: "fa-bolt", href: "/admin/technology" },
    { title: "Products", id: "products", icon: "fa-helmet-safety", href: "/admin/products" },
    { title: "Categories", id: "categories", icon: "fa-folder-tree", href: "/admin/categories" },
    { title: "Stockists", id: "stockists", icon: "fa-location-dot", href: "/admin/stockists" },
    { title: "Site Settings", id: "settings", icon: "fa-sliders", href: "/admin/settings" },
    { title: "Docs Manager", id: "docs", icon: "fa-file-arrow-up", href: "/admin/docs" },
  ];

  const checkActive = (href) => {
    if (pathname === href) return true;
    if (pathname === `${href}/`) return true;
    return false;
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const data = await res.json();
      if (data.success) {
        setEmail(data.user.email);
      }
    } catch (err) { console.error("Fetch Error:", err); }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password || undefined })
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
        setPassword("");
        setTimeout(() => setIsModalOpen(false), 1500);
      } else {
        setMessage({ text: data.error || "failed to save", type: "error" });
      }
    } catch (err) { setMessage({ text: "Update failed.", type: "error" }); }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) { /* fallback */ }
    window.location.href = "/admin/login";
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8faff", color: "#030303", overflow: "hidden", position: "relative", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* 1. SIDEBAR (Light Mode with Navy Accents) */}
      <aside
        style={{
          width: isSidebarMinimized ? "80px" : "280px",
          backgroundColor: "#ffffff",
          borderRight: "1px solid rgba(50, 87, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          padding: isSidebarMinimized ? "30px 15px" : "30px 20px",
          position: "relative",
          zIndex: 10,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "10px 0 30px rgba(0,0,0,0.02)"
        }}
      >
        <button
          onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
          style={{
            position: "absolute", top: "35px", right: "-12px",
            width: "24px", height: "24px", borderRadius: "50%",
            background: "#3257ff", border: "4px solid #f8faff", color: "#ffffff",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 11, fontSize: "10px",
            boxShadow: "0 4px 10px rgba(50, 87, 255, 0.3)",
          }}
        >
          <i className={`fa-solid ${isSidebarMinimized ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
        </button>

        <div style={{ marginBottom: "50px", padding: "0 10px", textAlign: isSidebarMinimized ? "center" : "left" }}>
          <img src={withBasePath("/assets/img/logo/logo-black.png")} alt="KNYX Logo" style={{ height: "25px", maxWidth: "100%", objectFit: "contain" }} />
          {!isSidebarMinimized && <p style={{ color: "#3257ff", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 800, marginTop: "8px", margin: 0, opacity: 0.6 }}>Operator Panel</p>}
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {menuItems.map((item) => {
            const isActive = checkActive(item.href);
            return (
              <a 
                key={item.id} 
                href={item.href} 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: isSidebarMinimized ? "center" : "flex-start", 
                  gap: isSidebarMinimized ? "0" : "15px", 
                  padding: "14px", 
                  borderRadius: "14px", 
                  fontSize: "14px", 
                  fontWeight: isActive ? 700 : 500, 
                  color: isActive ? "#ffffff" : "#64748b", 
                  background: isActive ? "#3257ff" : "transparent", 
                  textDecoration: "none", 
                  transition: "all 0.3s ease", 
                  cursor: "pointer", 
                  boxShadow: isActive ? "0 8px 16px rgba(50, 87, 255, 0.25)" : "none",
                }}
                onMouseEnter={(e) => { if(!isActive) e.currentTarget.style.background = "#f1f5f9"; }}
                onMouseLeave={(e) => { if(!isActive) e.currentTarget.style.background = "transparent"; }}
              >
                <i className={`fa-solid ${item.icon}`} style={{ width: "20px", textAlign: "center", fontSize: "16px" }}></i>
                {!isSidebarMinimized && <span>{item.title}</span>}
              </a>
            );
          })}
        </nav>

        {/* User Quick Info at Bottom */}
        {!isSidebarMinimized && (
          <div style={{ padding: "20px", background: "#f8faff", borderRadius: "16px", marginTop: "20px" }}>
             <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Logged in as</p>
             <p style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b", margin: "2px 0 0 0", overflow: "hidden", textOverflow: "ellipsis" }}>{email || "Admin"}</p>
          </div>
        )}
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        <header style={{ height: "80px", background: "#ffffff", borderBottom: "1px solid #f1f5f9", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 9 }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Management Console</h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
            <div
              onClick={() => { setIsProfileOpen(!isProfileOpen); fetchProfile(); }}
              style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 16px", borderRadius: "12px", background: isProfileOpen ? "#f1f5f9" : "transparent", cursor: "pointer", transition: "all 0.2s ease" }}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#3257ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#ffffff", fontSize: "15px" }}>A</div>
              {!isSidebarMinimized && (
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>Admin</span>
                  <i className="fa-solid fa-chevron-down" style={{ fontSize: "10px", color: "#64748b", marginTop: "2px" }}></i>
                </div>
              )}
            </div>

            {isProfileOpen && (
              <div style={{ position: "absolute", top: "60px", right: 0, width: "240px", background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "16px", padding: "10px", boxShadow: "0 15px 35px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: "5px", zIndex: 12 }}>
                <button onClick={() => { setIsModalOpen(true); setIsProfileOpen(false); }} style={{ padding: "12px", color: "#1e293b", fontSize: "13px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", width: "100%", textAlign: "left" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f8faff"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <i className="fa-solid fa-user-gear" style={{ color: "#3257ff" }}></i> Account Settings
                </button>
                <div style={{ height: "1px", background: "#f1f5f9", margin: "5px 0" }}></div>
                <button onClick={handleLogout} style={{ padding: "12px", background: "transparent", border: "none", color: "#ef4444", fontSize: "13px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px", textAlign: "left", width: "100%", fontWeight: 600 }} onMouseEnter={(e) => e.currentTarget.style.background = "#fef2f2"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <i className="fa-solid fa-right-from-bracket"></i> Logout Session
                </button>
              </div>
            )}
          </div>
        </header>

        <main style={{ flex: 1, padding: "40px", overflowY: "auto", background: "#f8faff" }}>
          {children}
        </main>
      </div>

      {/* 🔐 ACCOUNT SETTINGS MODAL (Light Mode) */}
      {isModalOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(15, 23, 42, 0.3)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ width: "420px", background: "#ffffff", borderRadius: "24px", padding: "35px", boxShadow: "0 25px 50px rgba(0,0,0,0.15)", border: "1px solid #ffffff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Account Settings</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ color: "#94a3b8", cursor: "pointer" }}><i className="fa-solid fa-xmark"></i></button>
            </div>

            {message.text && (
              <div style={{ padding: "12px", background: message.type === "success" ? "#ecfdf5" : "#fef2f2", border: `1px solid ${message.type === "success" ? "#10b981" : "#ef4444"}`, borderRadius: "12px", fontSize: "14px", color: message.type === "success" ? "#065f46" : "#b91c1c", marginBottom: "20px", textAlign: "center" }}>
                {message.text}
              </div>
            )}

            <form onSubmit={saveProfile} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", color: "#64748b", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>Administrator Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  style={{ width: "100%", padding: "14px", background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#1e293b", outline: "none", fontSize: "14px" }} 
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#64748b", fontSize: "13px", fontWeight: 600, marginBottom: "8px" }}>Update Password</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  style={{ width: "100%", padding: "14px", background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#1e293b", outline: "none", fontSize: "14px" }} 
                />
                <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "6px" }}>Leave blank to keep your current password.</p>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: "14px", background: "#f1f5f9", borderRadius: "12px", color: "#64748b", fontWeight: 600, cursor: "pointer" }}>Dismiss</button>
                <button type="submit" style={{ flex: 1, padding: "14px", background: "#3257ff", borderRadius: "12px", color: "#ffffff", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 12px rgba(50, 87, 255, 0.2)" }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        input:focus {
          border-color: #3257ff !important;
          background: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(50, 87, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
