"use client";
import React, { useState } from "react";

export default function SiteSettings() {
  const [activeTab, setActiveTab] = useState("identity");
  const [saving, setSaving] = useState(false);

  // --- MOCK LOCAL STATE ---
  const [identity, setIdentity] = useState({
    logoLight: "/assets/img/logo/logo-white-2.png",
    logoDark: "/assets/img/logo/logo-black.png",
    email: "contact@knyxsports.com",
    phone: "+44 20 7946 0958"
  });

  const [seo, setSeo] = useState({
    title: "KNYX | Engineered Sports Protection",
    description: "KNYX represents the modern athlete — focused, fearless, and equipped with elite sports protection.",
    keywords: "KNYX, sports protection, cricket helmets, tactical gear"
  });

  const [socials, setSocials] = useState([
    { id: 1, network: "Instagram", url: "https://instagram.com/knyxsports" },
    { id: 2, network: "Twitter", url: "https://twitter.com/knyxsports" }
  ]);

  const [menus, setMenus] = useState([
    { id: 1, label: "Home", href: "/" },
    { id: 2, label: "Technology", href: "/technology" },
    { id: 3, label: "Stockists", href: "/stockists" }
  ]);

  // --- HANDLERS ---
  const addSocial = () => setSocials([...socials, { id: Date.now(), network: "", url: "" }]);
  const addMenu = () => setMenus([...menus, { id: Date.now(), label: "", href: "" }]);
  
  const handlePublish = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); alert("Site configuration successfully synced."); }, 800);
  };

  return (
    <div style={{ animation: "fadeIn 0.5s ease" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Site Configuration</h1>
          <p style={{ color: "#64748b", fontSize: "15px", marginTop: "6px" }}>Manage global brand identity, navigation, and SEO intelligence.</p>
        </div>
        <button onClick={handlePublish} disabled={saving} style={primaryBtnStyle}>
           {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-globe"></i>}
           {saving ? "Deploying..." : "Update Website"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "40px", borderBottom: "1px solid #e2e8f0", marginBottom: "40px" }}>
        <button onClick={() => setActiveTab("identity")} style={{...tabStyle, borderBottom: activeTab === "identity" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "identity" ? "#1e293b" : "#94a3b8" }}>1. Brand Identity</button>
        <button onClick={() => setActiveTab("menus")} style={{...tabStyle, borderBottom: activeTab === "menus" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "menus" ? "#1e293b" : "#94a3b8" }}>2. Navigation</button>
        <button onClick={() => setActiveTab("social")} style={{...tabStyle, borderBottom: activeTab === "social" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "social" ? "#1e293b" : "#94a3b8" }}>3. Social Connect</button>
        <button onClick={() => setActiveTab("seo")} style={{...tabStyle, borderBottom: activeTab === "seo" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "seo" ? "#1e293b" : "#94a3b8" }}>4. Global SEO</button>
      </div>

      <div style={panelStyle}>
        
        {/* --- 1. BRAND IDENTITY & LOGOS --- */}
        {activeTab === "identity" && (
           <div style={{ animation: "slideUp 0.4s ease" }}>
              <h3 style={sectionTitleStyle}>Primary Brand Assets</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
                 <div style={editorSectionStyle}>
                    <p style={labelStyle}>Header Logo (Light Mode / Dark Text)</p>
                    <div style={{ height: "120px", background: "#f8faff", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                       <img src={identity.logoDark} style={{ maxHeight: "40px" }} />
                    </div>
                    <button style={{ width: "100%", marginTop: "10px", padding: "12px", background: "#3257ff10", border: "none", color: "#3257ff", fontWeight: 700, borderRadius: "10px", cursor: "pointer" }}>Replace Logo</button>
                 </div>
                 <div style={{ ...editorSectionStyle, background: "#1e293b" }}>
                    <p style={{ ...labelStyle, color: "rgba(255,255,255,0.6)" }}>Header Logo (Dark Mode / Light Text)</p>
                    <div style={{ height: "120px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                       <img src={identity.logoLight} style={{ maxHeight: "40px" }} />
                    </div>
                    <button style={{ width: "100%", marginTop: "10px", padding: "12px", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontWeight: 700, borderRadius: "10px", cursor: "pointer" }}>Replace Logo</button>
                 </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "30px" }}>
                 <div><label style={labelStyle}>Support Email</label><input type="text" value={identity.email} onChange={(e) => setIdentity({...identity, email: e.target.value})} style={inputStyle} /></div>
                 <div><label style={labelStyle}>Brand Hotline</label><input type="text" value={identity.phone} onChange={(e) => setIdentity({...identity, phone: e.target.value})} style={inputStyle} /></div>
              </div>
           </div>
        )}

        {/* --- 2. MENU MANAGEMENT --- */}
        {activeTab === "menus" && (
           <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "25px" }}>
                <h3 style={sectionTitleStyle}>Primary Navigation Hub</h3>
                <button onClick={addMenu} style={{ background: "transparent", border: "none", color: "#3257ff", fontWeight: 800, cursor: "pointer" }}>+ Insert Link</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                 {menus.map((m, i) => (
                    <div key={m.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 50px", gap: "15px", alignItems: "center", padding: "15px", background: "#f8faff", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
                       <input type="text" value={m.label} onChange={(e) => {
                          const nm = [...menus]; nm[i].label = e.target.value; setMenus(nm);
                       }} placeholder="Link Label" style={{ ...inputStyle, background: "#fff" }} />
                       <input type="text" value={m.href} onChange={(e) => {
                          const nm = [...menus]; nm[i].href = e.target.value; setMenus(nm);
                       }} placeholder="Link Destination (/path)" style={{ ...inputStyle, background: "#fff" }} />
                       <button onClick={() => setMenus(menus.filter(x => x.id !== m.id))} style={{ height: "48px", border: "none", background: "transparent", color: "#ef4444", cursor: "pointer" }}><i className="fa-solid fa-trash"></i></button>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* --- 3. SOCIAL MEDIA ARCHITECTURE --- */}
        {activeTab === "social" && (
           <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "25px" }}>
                <h3 style={sectionTitleStyle}>Social Integration Matrices</h3>
                <button onClick={addSocial} style={{ background: "transparent", border: "none", color: "#3257ff", fontWeight: 800, cursor: "pointer" }}>+ Add Connect Point</button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                 {socials.map((s, i) => (
                    <div key={s.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 50px", gap: "15px", alignItems: "center", padding: "15px", background: "#f8faff", borderRadius: "16px", border: "1px solid #f1f5f9" }}>
                       <select value={s.network} onChange={(e) => {
                          const ns = [...socials]; ns[i].network = e.target.value; setSocials(ns);
                       }} style={{ ...inputStyle, background: "#fff" }}>
                          <option>Instagram</option>
                          <option>Twitter / X</option>
                          <option>LinkedIn</option>
                          <option>Facebook</option>
                          <option>YouTube</option>
                       </select>
                       <input type="text" value={s.url} onChange={(e) => {
                          const ns = [...socials]; ns[i].url = e.target.value; setSocials(ns);
                       }} placeholder="Full URL Link" style={{ ...inputStyle, background: "#fff" }} />
                       <button onClick={() => setSocials(socials.filter(x => x.id !== s.id))} style={{ height: "48px", border: "none", background: "transparent", color: "#ef4444", cursor: "pointer" }}><i className="fa-solid fa-trash"></i></button>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* --- 4. GLOBAL SEO INTELLIGENCE --- */}
        {activeTab === "seo" && (
           <div style={{ animation: "slideUp 0.4s ease" }}>
              <h3 style={sectionTitleStyle}>Index Search Intelligence</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                 <div>
                    <label style={labelStyle}>Global Title Template</label>
                    <input type="text" value={seo.title} onChange={(e) => setSeo({...seo, title: e.target.value})} style={inputStyle} />
                 </div>
                 <div>
                    <label style={labelStyle}>Master Meta Description</label>
                    <textarea rows="4" value={seo.description} onChange={(e) => setSeo({...seo, description: e.target.value})} style={{ ...inputStyle, height: "auto", resize: "none" }} />
                 </div>
                 <div>
                    <label style={labelStyle}>Contextual Keywords (CSV)</label>
                    <input type="text" value={seo.keywords} onChange={(e) => setSeo({...seo, keywords: e.target.value})} style={inputStyle} />
                    <p style={{ margin: "10px 0 0", fontSize: "12px", color: "#94a3b8" }}>Separate keywords with commas for search engine indexing.</p>
                 </div>
              </div>
           </div>
        )}

      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// STYLES
const panelStyle = { background: "#ffffff", borderRadius: "28px", padding: "40px", border: "1px solid #f1f5f9", boxShadow: "0 10px 40px rgba(0,0,0,0.02)", minHeight: "600px" };
const primaryBtnStyle = { padding: "14px 32px", background: "#3257ff", color: "#ffffff", border: "none", borderRadius: "14px", fontWeight: 800, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 20px rgba(50, 87, 255, 0.25)" };
const tabStyle = { padding: "15px 0", background: "transparent", border: "none", fontWeight: 800, fontSize: "15px", cursor: "pointer" };
const sectionTitleStyle = { fontSize: "20px", fontWeight: 800, color: "#1e293b", marginBottom: "25px" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: 700, color: "#64748b", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "1px" };
const inputStyle = { width: "100%", padding: "16px 20px", background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#1e293b", fontSize: "14px", outline: "none", fontWeight: 600 };
const editorSectionStyle = { padding: "20px", background: "#ffffff", borderRadius: "20px", border: "1px solid #f1f5f9" };
