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
    { title: "Products", value: stats.products, icon: "fa-helmet-safety", color: "#1B3B8A" },
    { title: "Categories", value: stats.categories, icon: "fa-folder-tree", color: "#112D6A" },
    { title: "Administrators", value: stats.admins, icon: "fa-shield-halved", color: "#00d2d3" },
    { title: "Today's Hits", value: "1,245", icon: "fa-arrow-trend-up", color: "#ff9f43" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.3s ease both" }}>
      
      {/* 1. Header Banner */}
      <div>
        <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, color: "#ffffff" }}>Dashboard Overview</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "4px" }}>Control panel for live Prisma server metrics and analytics.</p>
      </div>

      {/* 2. Advanced Statistics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
        {statCards.map((stat) => (
          <div 
            key={stat.title}
            style={{
              padding: "20px", background: "rgba(255, 255, 255, 0.02)", backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.03)", borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "space-between"
            }}
          >
            <div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", margin: 0 }}>{stat.title}</p>
              <p style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700, marginTop: "6px", marginBottom: 0 }}>{loading ? "..." : stat.value}</p>
            </div>
            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${stat.color}15`, border: `1px solid ${stat.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color, fontSize: "15px" }}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Sexy Glowing SVG Chart (Analytics view) */}
      <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.03)", borderRadius: "16px", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, margin: 0, color: "#ffffff" }}>Server Requests & Activity</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", margin: "4px 0 0" }}>Live metrics over the last 6 months (simulated)</p>
          </div>
          <span style={{ color: "#1B3B8A", fontSize: "12px", fontWeight: 600, background: "rgba(27,59,138,0.1)", padding: "4px 10px", borderRadius: "20px" }}>+24% Increase</span>
        </div>

        {/* SVG Graph Structure with glowing attributes */}
        <div style={{ width: "100%", height: "200px", position: "relative" }}>
          <svg viewBox="0 0 1000 200" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
              <linearGradient id="areaGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1B3B8A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#1B3B8A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1B3B8A" />
                <stop offset="100%" stopColor="#001A3D" />
              </linearGradient>
              <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#1B3B8A" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Grid Lines */}
            {[0, 50, 100, 150, 200].map((y) => (
              <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="4 4" />
            ))}

            {/* Filled Glow Area under the curve */}
            <path 
              d="M0,170 C100,160 150,80 250,90 C350,100 400,30 500,40 C600,50 650,140 750,120 C850,100 900,20 1000,30 L1000,200 L0,200 Z" 
              fill="url(#areaGlow)" 
            />

            {/* Main Shiny Curve path */}
            <path 
              d="M0,170 C100,160 150,80 250,90 C350,100 400,30 500,40 C600,50 650,140 750,120 C850,100 900,20 1000,30" 
              fill="transparent" 
              stroke="url(#lineGlow)" 
              strokeWidth="3.5" 
              filter="url(#shadowGlow)"
            />

            {/* Dot markers on high peaks */}
            <circle cx="500" cy="40" r="6" fill="#1B3B8A" stroke="#000000" strokeWidth="2" filter="url(#shadowGlow)" />
            <circle cx="900" cy="20" r="6" fill="#1B3B8A" stroke="#000000" strokeWidth="2" filter="url(#shadowGlow)" />
          </svg>
        </div>
        
        {/* X-Axis labels aligns */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => <span key={m}>{m}</span>)}
        </div>
      </div>

      {/* 4. Lists & Actions Bottom Area */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", width: "100%" }}>
        <div style={{ flex: 2, background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "16px", padding: "24px", minWidth: "400px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "#ffffff" }}>Recently Added Products</h3>
          {recentActivity.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentActivity.map((p) => (
                <div key={p.slug} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "12px" }}>
                  <div>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff" }}>{p.name}</span>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>Slug: {p.slug}</p>
                  </div>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{new Date(p.createdAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "13px", textAlign: "center", padding: "30px" }}>No product activity logged.</div>
          )}
        </div>

        <div style={{ flex: 1, background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255,255,255,0.03)", borderRadius: "16px", padding: "24px", minWidth: "250px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", color: "#ffffff" }}>System Links</h3>
          <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
            {["View Main Site", "Server Control", "Database Backup"].map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: "rgba(255,255,255,0.01)", borderRadius: "10px", cursor: "pointer", fontSize: "13px", color: "#ffffff" }}>
                <span>{item}</span><i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", color: "rgba(255,255,255,0.2)" }}></i>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
         @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
