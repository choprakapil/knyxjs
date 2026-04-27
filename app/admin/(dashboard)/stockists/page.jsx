"use client";
import React, { useState } from "react";

export default function StockistsManagement() {
  const [activeTab, setActiveTab] = useState("all");
  const [editingLoc, setEditingLoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // --- MOCK DATA ---
  const [stockists, setStockists] = useState([
    { id: 1, name: "Premium Sports Hub", country: "United Kingdom", address: "125 Oxford Street, London", phone: "+44 20 7946 0958", email: "info@premiumsports.uk", website: "https://premiumsports.uk", status: "Verified" },
    { id: 2, name: "Tactical Gear Inc", country: "Australia", address: "42 George St, Sydney", phone: "+61 2 5550 0123", email: "contact@tacticalgear.au", website: "https://tacticalgear.au", status: "Pending" },
    { id: 3, name: "Cricket Central", country: "India", address: "Marine Drive, Mumbai", phone: "+91 22 1234 5678", email: "sales@cricketcentral.in", website: "https://cricketcentral.in", status: "Verified" }
  ]);

  const countries = ["All", ...new Set(stockists.map(s => s.country))];

  // --- HANDLERS ---
  const handleEdit = (loc) => {
    setEditingLoc(loc || { name: "", country: "United Kingdom", address: "", phone: "", email: "", website: "", status: "Pending" });
  };

  const saveLoc = (id, data) => {
    if (id) {
      setStockists(stockists.map(s => s.id === id ? { ...s, ...data } : s));
    } else {
      setStockists([...stockists, { id: Date.now(), ...data }]);
    }
    setEditingLoc(null);
  };

  const deleteLoc = (id) => {
    if (confirm("De-register this stockist from the KNYX network?")) {
      setStockists(stockists.filter(s => s.id !== id));
    }
  };

  const filtered = stockists.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.city?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || s.country === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div style={{ animation: "fadeIn 0.5s ease" }}>
      
      {/* 🧭 Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Network Distribution</h1>
          <p style={{ color: "#64748b", fontSize: "15px", marginTop: "6px" }}>Manage official KNYX stockists, contact details, and regional status.</p>
        </div>
        <button onClick={() => handleEdit(null)} style={primaryBtnStyle}>
           <i className="fa-solid fa-store"></i> Register Partner
        </button>
      </div>

      {/* 📦 Management Hub */}
      <div style={panelStyle}>
        
        {/* Filters & Search */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px" }}>
           <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "10px", maxWidth: "60%" }}>
              {countries.map(c => (
                 <button 
                    key={c} 
                    onClick={() => setActiveTab(c.toLowerCase())} 
                    style={{ 
                      padding: "10px 20px", 
                      fontSize: "13px", 
                      fontWeight: 700, 
                      borderRadius: "10px", 
                      border: "none", 
                      cursor: "pointer", 
                      whiteSpace: "nowrap",
                      background: activeTab === c.toLowerCase() ? "#3257ff" : "#f8faff",
                      color: activeTab === c.toLowerCase() ? "#fff" : "#64748b"
                    }}
                 >
                    {c}
                 </button>
              ))}
           </div>
           <div style={{ position: "relative", width: "260px" }}>
              <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: "13px" }}></i>
              <input 
                type="text" 
                placeholder="Find outlet..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ ...inputStyle, paddingLeft: "42px" }} 
              />
           </div>
        </div>

        {/* Dynamic Table */}
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 10px" }}>
           <thead>
              <tr style={{ textAlign: "left" }}>
                 <th style={thStyle}>Stockist Identity</th>
                 <th style={thStyle}>Contact Access</th>
                 <th style={thStyle}>Status</th>
                 <th style={thStyle}>Action</th>
              </tr>
           </thead>
           <tbody>
              {filtered.map(s => (
                 <tr key={s.id}>
                    <td style={{ ...tdStyle, borderRadius: "16px 0 0 16px" }}>
                       <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                          <div style={{ width: "48px", height: "48px", background: "#ffffff", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0" }}>
                             <i className="fa-solid fa-location-arrow" style={{ color: "#3257ff" }}></i>
                          </div>
                          <div>
                             <p style={{ margin: 0, fontWeight: 800, color: "#1e293b" }}>{s.name}</p>
                             <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>{s.country}</p>
                          </div>
                       </div>
                    </td>
                    <td style={tdStyle}>
                       <div style={{ fontSize: "13px", color: "#64748b" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                             <i className="fa-solid fa-phone" style={{ fontSize: "10px", color: "#cbd5e1" }}></i> {s.phone}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                             <i className="fa-solid fa-envelope" style={{ fontSize: "10px", color: "#cbd5e1" }}></i> {s.email}
                          </div>
                       </div>
                    </td>
                    <td style={tdStyle}>
                       <span style={{ fontSize: "11px", fontWeight: 800, background: s.status === "Verified" ? "#ecfdf5" : "#fff7ed", color: s.status === "Verified" ? "#10b981" : "#f97316", padding: "5px 12px", borderRadius: "100px" }}>{s.status.toUpperCase()}</span>
                    </td>
                    <td style={{ ...tdStyle, borderRadius: "0 16px 16px 0" }}>
                       <div style={{ display: "flex", gap: "10px" }}>
                          <button onClick={() => handleEdit(s)} style={actionBtnStyle}><i className="fa-solid fa-sliders"></i></button>
                          <button onClick={() => deleteLoc(s.id)} style={{ ...actionBtnStyle, color: "#ef4444" }}><i className="fa-solid fa-trash"></i></button>
                       </div>
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px", color: "#94a3b8" }}>
             <i className="fa-solid fa-map-location-dot" style={{ fontSize: "40px", marginBottom: "15px", opacity: 0.3 }}></i>
             <p>No distribution partners found for this region.</p>
          </div>
        )}

      </div>

      {/* --- STOCKIST REGISTRATION MODAL --- */}
      {editingLoc && (
        <div style={modalOverlayStyle}>
           <div style={modalStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                 <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 800 }}>Partner Configuration</h3>
                 <button onClick={() => setEditingLoc(null)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}><i className="fa-solid fa-xmark"></i></button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                 <div>
                    <label style={labelStyle}>Outlet Name</label>
                    <input id="locName" type="text" defaultValue={editingLoc.name} style={inputStyle} />
                 </div>
                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div>
                       <label style={labelStyle}>Region / Country</label>
                       <input id="locCountry" type="text" defaultValue={editingLoc.country} style={inputStyle} />
                    </div>
                    <div>
                       <label style={labelStyle}>Status</label>
                       <select id="locStatus" defaultValue={editingLoc.status} style={inputStyle}>
                          <option>Verified</option>
                          <option>Pending</option>
                          <option>Restricted</option>
                       </select>
                    </div>
                 </div>
                 <div>
                    <label style={labelStyle}>Full Physical Address</label>
                    <textarea id="locAddress" defaultValue={editingLoc.address} rows="3" style={{ ...inputStyle, height: "auto", resize: "none" }} />
                 </div>
                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div><label style={labelStyle}>Contact Number</label><input id="locPhone" type="text" defaultValue={editingLoc.phone} style={inputStyle} /></div>
                    <div><label style={labelStyle}>Email Address</label><input id="locEmail" type="text" defaultValue={editingLoc.email} style={inputStyle} /></div>
                 </div>
                 <div>
                    <label style={labelStyle}>Official Website</label>
                    <input id="locWeb" type="text" defaultValue={editingLoc.website} style={inputStyle} />
                 </div>
                 <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                    <button onClick={() => setEditingLoc(null)} style={{ flex: 1, padding: "16px", background: "#f1f5f9", borderRadius: "12px", border: "none", color: "#64748b", fontWeight: 700, cursor: "pointer" }}>Dismiss</button>
                    <button 
                      onClick={() => {
                        saveLoc(editingLoc.id === undefined ? null : editingLoc.id, {
                          name: document.getElementById("locName").value,
                          country: document.getElementById("locCountry").value,
                          status: document.getElementById("locStatus").value,
                          address: document.getElementById("locAddress").value,
                          phone: document.getElementById("locPhone").value,
                          email: document.getElementById("locEmail").value,
                          website: document.getElementById("locWeb").value
                        });
                      }}
                      style={{ flex: 1, padding: "16px", background: "#3257ff", borderRadius: "12px", border: "none", color: "#ffffff", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)" }}
                    >
                      Authenticate Partner
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

// STYLES
const primaryBtnStyle = { padding: "14px 28px", background: "#3257ff", color: "#ffffff", border: "none", borderRadius: "14px", fontWeight: 800, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 20px rgba(50, 87, 255, 0.25)" };
const panelStyle = { background: "#ffffff", borderRadius: "28px", padding: "40px", border: "1px solid #f1f5f9", boxShadow: "0 4px 25px rgba(0,0,0,0.02)", minHeight: "600px" };
const thStyle = { padding: "15px", color: "#94a3b8", fontSize: "11px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1.5px" };
const tdStyle = { padding: "24px 15px", background: "#f8faff", verticalAlign: "middle" };
const inputStyle = { width: "100%", padding: "14px 18px", background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#1e293b", fontSize: "14px", outline: "none", fontWeight: 600 };
const labelStyle = { display: "block", fontSize: "12px", fontWeight: 700, color: "#64748b", marginBottom: "8px", textTransform: "uppercase" };
const actionBtnStyle = { width: "42px", height: "42px", borderRadius: "12px", background: "#ffffff", border: "1px solid #e2e8f0", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const modalOverlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalStyle = { width: "560px", background: "#ffffff", borderRadius: "30px", padding: "40px", boxShadow: "0 30px 70px rgba(0,0,0,0.15)" };
