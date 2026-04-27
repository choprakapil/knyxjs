"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ products: 0, categories: 0, admins: 0 });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setRecentActivity(data.recentActivity || []);
        }
      } catch (err) { console.error("Dashboard Stats Fetch Error:", err); }
      finally { setLoading(false); }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Active Products", value: stats.products, icon: "fa-helmet-safety", color: "#3257ff" },
    { title: "Classification", value: stats.categories, icon: "fa-folder-tree", color: "#6366f1" },
    { title: "System Admins", value: stats.admins, icon: "fa-shield-halved", color: "#0ea5e9" },
    { title: "Platform Traffic", value: "1,245", icon: "fa-arrow-trend-up", color: "#8b5cf6" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "30px", animation: "fadeSlideIn 0.4s ease-out both" }}>
      
      {/* 1. Header Banner */}
      <div>
        <h1 style={{ fontSize: "28px", fontWeight: 800, margin: 0, color: "#1e293b" }}>Welcome Back, Admin</h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Here is what's happening with the KNYX platform today.</p>
      </div>

      {/* 2. Advanced Statistics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
        {statCards.map((stat) => (
          <div 
            key={stat.title}
            style={{
              padding: "24px", 
              background: "#ffffff", 
              border: "1px solid #f1f5f9", 
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              transition: "transform 0.3s ease",
              cursor: "default"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div>
              <p style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>{stat.title}</p>
              <p style={{ color: "#1e293b", fontSize: "28px", fontWeight: 800, marginTop: "8px", marginBottom: 0 }}>{loading ? "..." : stat.value}</p>
            </div>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${stat.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color, fontSize: "18px" }}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Modern Chart View (Light Mode) */}
      <div style={{ background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "24px", padding: "30px", boxShadow: "0 10px 40px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", gap: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#1e293b" }}>Requests & Analytics</h3>
            <p style={{ color: "#94a3b8", fontSize: "13px", margin: "4px 0 0" }}>Live usage metrics scaled over the production period.</p>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <span style={{ color: "#10b981", fontSize: "12px", fontWeight: 700, background: "#ecfdf5", padding: "6px 14px", borderRadius: "20px" }}>Efficiency +24%</span>
          </div>
        </div>

        {/* SVG Graph for Light Theme */}
        <div style={{ width: "100%", height: "240px", position: "relative" }}>
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
              <linearGradient id="areaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3257ff" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#3257ff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3257ff" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>

            {/* Grid Horizontal */}
            {[0, 50, 100, 150, 200].map((y) => (
              <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="6 6" />
            ))}

            <path 
              d="M0,170 C100,160 150,80 250,90 C350,100 400,30 500,40 C600,50 650,140 750,120 C850,100 900,20 1000,30 L1000,200 L0,200 Z" 
              fill="url(#areaGlow)" 
            />

            <path 
              d="M0,170 C100,160 150,80 250,90 C350,100 400,30 500,40 C600,50 650,140 750,120 C850,100 900,20 1000,30" 
              fill="transparent" 
              stroke="url(#lineGlow)" 
              strokeWidth="4" 
              strokeLinecap="round"
            />

            <circle cx="500" cy="40" r="6" fill="#3257ff" stroke="#ffffff" strokeWidth="3" />
            <circle cx="900" cy="20" r="6" fill="#6366f1" stroke="#ffffff" strokeWidth="3" />
          </svg>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", color: "#94a3b8", fontSize: "12px", fontWeight: 600 }}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>

      {/* 4. Lists Container */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        <div style={{ background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "24px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
             <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Recent Activity</h3>
             <a href="/admin/products" style={{ fontSize: "12px", fontWeight: 700, color: "#3257ff", textDecoration: "none" }}>View Inventory</a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {recentActivity.length > 0 ? recentActivity.slice(0, 4).map((p) => (
              <div key={p.slug} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "#f8faff", borderRadius: "16px", border: "1px solid transparent", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#ffffff"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "#f8faff"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                   <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#ffffff", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", color: "#3257ff", fontSize: "14px" }}>
                      <i className="fa-solid fa-box-open"></i>
                   </div>
                   <div>
                      <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{p.name}</p>
                      <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>Module initialized successfully</p>
                   </div>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#64748b" }}>{new Date(p.createdAt).toLocaleDateString()}</span>
              </div>
            )) : (
              <p style={{ textAlign: "center", padding: "20px", color: "#94a3b8", fontSize: "14px" }}>No recent log entries.</p>
            )}
          </div>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "24px", padding: "30px", boxShadow: "0 10px 30px rgba(0,0,0,0.02)" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px", color: "#1e293b" }}>Quick Links</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {[
              { label: "Main Website", icon: "fa-arrow-up-right-from-square", href: "/" },
              { label: "Products Catalog", icon: "fa-list", href: "/admin/products" },
              { label: "Server Health", icon: "fa-heart-pulse", href: "#" }
            ].map((link) => (
              <a key={link.label} href={link.href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", background: "#f8faff", borderRadius: "12px", textDecoration: "none", color: "#1e293b", transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "#3257ff08"} onMouseLeave={(e) => e.currentTarget.style.background = "#f8faff"}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                   <i className={`fa-solid ${link.icon}`} style={{ fontSize: "14px", color: "#3257ff" }}></i>
                   <span style={{ fontSize: "13px", fontWeight: 700 }}>{link.label}</span>
                </div>
                <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", color: "#94a3b8" }}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
         @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
