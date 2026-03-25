"use client";
import React, { useState } from "react";
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
    { title: "Products", id: "products", icon: "fa-helmet-safety", href: "/admin/products" },
    { title: "Categories", id: "categories", icon: "fa-folder-tree", href: "/admin/categories" },
    { title: "Stockists", id: "stockists", icon: "fa-location-dot", href: "/admin/stockists" },
    { title: "Brand Story", id: "brand-story", icon: "fa-book-open", href: "/admin/brand-story" },
    { title: "Technology", id: "technology", icon: "fa-bolt", href: "/admin/technology" },
  ];

  // Helper to match path names
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
    <div style={{ display: "flex", height: "100vh", background: "#000000", color: "#ffffff", overflow: "hidden", position: "relative" }}>
      
      {/* 1. SIDEBAR */}
      <aside 
        style={{
          width: isSidebarMinimized ? "72px" : "260px",
          backgroundColor: "#030303",
          backgroundImage: "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, rgba(3,3,3,0.85) 100%), url('https://www.transparenttextures.com/patterns/carbon-fibre.png'), url('/assets/img/hero/ai/bg-black.jpg')",
          backgroundSize: "auto, auto, cover",
          backgroundPosition: "center",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(200, 255, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          padding: isSidebarMinimized ? "24px 10px" : "24px 16px",
          position: "relative",
          zIndex: 10,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden"
        }}
      >
        {/* Ambient Radial Green Glowing Light (Like Login Screen) */}
        <div
          style={{
            position: "absolute",
            width: "100%", height: "100%",
            background: "radial-gradient(ellipse at center, rgba(200,255,0,0.12) 0%, rgba(0,0,0,0) 80%)",
            top: 0, left: 0,
            zIndex: 1, pointerEvents: "none"
          }}
        ></div>
        <button 
          onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
          style={{
            position: "absolute", top: "26px", right: isSidebarMinimized ? "50%" : "-12px",
            transform: isSidebarMinimized ? "translateX(50%)" : "none",
            width: "24px", height: "24px", borderRadius: "6px",
            background: "#c8ff00", border: "none", color: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", zIndex: 11, fontSize: "11px",
            boxShadow: "0 2px 8px rgba(200, 255, 0, 0.3)",
          }}
        >
          <i className={`fa-solid ${isSidebarMinimized ? "fa-chevron-right" : "fa-chevron-left"}`}></i>
        </button>

        <div style={{ marginBottom: "40px", padding: "0 12px", textAlign: isSidebarMinimized ? "center" : "left" }}>
          <img src={withBasePath("/assets/img/logo/logo-white-2.png")} alt="KNYX Logo" style={{ height: "23px", maxWidth: "100%", objectFit: "contain" }} />
          {!isSidebarMinimized && <p style={{ color: "#c8ff00", fontSize: "10px", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 700, marginTop: "6px", margin: 0 }}>Operator Panel</p>}
        </div>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
          {menuItems.map((item) => {
            const isActive = checkActive(item.href);
            return (
              <a key={item.id} href={item.href} style={{ display: "flex", alignItems: "center", justifyContent: isSidebarMinimized ? "center" : "flex-start", gap: isSidebarMinimized ? "0" : "12px", padding: "12px", borderRadius: "12px", fontSize: "14px", fontWeight: 500, color: isActive ? "#000000" : "rgba(255,255,255,0.6)", background: isActive ? "linear-gradient(135deg, #c8ff00 0%, #a2cc00 100%)" : "transparent", textDecoration: "none", transition: "color 0.2s, background 0.2s", cursor: "pointer", boxShadow: isActive ? "0 4px 12px rgba(200, 255, 0, 0.15)" : "none" }}>
                <i className={`fa-solid ${item.icon}`} style={{ width: "16px", textAlign: "center", fontSize: "15px" }}></i>
                {!isSidebarMinimized && <span>{item.title}</span>}
              </a>
            );
          })}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        
        <header style={{ height: "70px", background: "rgba(3, 4, 6, 0.4)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.03)", padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 9 }}>
          <div>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Dashboard / </span>
            <span style={{ color: "#ffffff", fontSize: "13px", fontWeight: 500 }}>Overview</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
            <div 
              onClick={() => { setIsProfileOpen(!isProfileOpen); fetchProfile(); }}
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "6px 12px", borderRadius: "12px", background: isProfileOpen ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}
            >
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(200, 255, 0, 0.1)", border: "1px solid rgba(200, 255, 0, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#c8ff00", fontSize: "14px" }}>K</div>
              <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>KNYX Admin</span>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)" }}>Operator</span>
              </div>
            </div>

            {isProfileOpen && (
              <div style={{ position: "absolute", top: "50px", right: 0, width: "220px", background: "#0c0f17", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px", padding: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", gap: "4px", zIndex: 12 }}>
                <a onClick={() => { setIsModalOpen(true); setIsProfileOpen(false); }} style={{ padding: "10px 12px", color: "#ffffff", fontSize: "13px", textDecoration: "none", borderRadius: "8px", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <i className="fa-solid fa-user-gear" style={{ width: "16px", color: "#c8ff00" }}></i> Edit Contact Details
                </a>
                <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", margin: "4px 0" }}></div>
                <button onClick={handleLogout} style={{ padding: "10px 12px", background: "transparent", border: "none", color: "#ff6b6b", fontSize: "13px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", textAlign: "left", width: "100%" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(220, 53, 69, 0.08)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <i className="fa-solid fa-right-from-bracket" style={{ width: "16px" }}></i> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main style={{ flex: 1, padding: "30px", overflowY: "auto", position: "relative" }}>
          {children}
        </main>
      </div>

      {/* 🔐 EDIT PROFILE MODAL */}
      {isModalOpen && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ width: "400px", background: "#060a12", backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "30px", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>Edit contact details</h3>
            
            {message.text && (
              <div style={{ padding: "10px", background: message.type === "success" ? "rgba(40, 167, 69, 0.1)" : "rgba(220, 53, 69, 0.1)", border: `1px solid ${message.type === "success" ? "#28a745" : "#dc3545"}`, borderRadius: "8px", fontSize: "13px", color: message.type === "success" ? "#28a745" : "#ff6b6b", marginBottom: "15px", textAlign: "center" }}>
                {message.text}
              </div>
            )}

            <form onSubmit={saveProfile} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "6px" }}>Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#ffffff", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "6px" }}>New Password <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>(Leave blank to keep same)</span></label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#ffffff", outline: "none" }} />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #c8ff00 0%, #a2cc00 100%)", border: "none", borderRadius: "10px", color: "#000000", fontWeight: 700, cursor: "pointer" }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
