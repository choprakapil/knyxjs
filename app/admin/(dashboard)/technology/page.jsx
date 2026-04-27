"use client";
import React, { useState, useRef } from "react";

export default function TechnologyCMS() {
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);

  // File Input Refs
  const heroImageInputRef = useRef(null);
  const sectionMediaInputRef = useRef(null);

  // --- Local UI State (Mocking Data) ---
  const [hero, setHero] = useState({
    badge: "Engineered excellence",
    title: "The Science",
    content: "At KNYX, technology is the core of our design philosophy...",
    image: "/assets/img/technology/section_1.png",
    reverse: false
  });

  const [sections, setSections] = useState([
    { 
      id: 1, 
      title: "Outer Layer", 
      content: "The shell of KNYX C7 Cricket Helmets...", 
      image: "/assets/img/technology/section2.png", 
      video: "", 
      reverse: true 
    },
    { 
      id: 2, 
      title: "Precision Fit System", 
      content: "All of the KNYX helmets feature ergonomic design...", 
      image: "/assets/img/products/6.png", 
      video: "/assets/video/Precision_Fit_System.MP4", 
      reverse: false 
    }
  ]);

  const [editingSection, setEditingSection] = useState(null);

  // --- UI Handlers ---

  const handleHeroImageUpload = (e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setHero({ ...hero, image: ev.target.result });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSectionMediaUpload = (e) => {
    if (e.target.files?.[0] && editingSection) {
      const file = e.target.files[0];
      const isVideo = file.type.startsWith("video/");
      
      if (isVideo) {
        setEditingSection({ ...editingSection, video: file.name, image: "" });
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => setEditingSection({ ...editingSection, image: ev.target.result, video: "" });
        reader.readAsDataURL(file);
      }
    }
  };

  const addSection = () => {
    const newId = Date.now();
    const newSec = { id: newId, title: "New Feature Block", content: "Technical details...", image: "", video: "", reverse: false };
    setSections([...sections, newSec]);
    setEditingSection(newSec);
  };

  const deleteSection = (id) => {
    if (confirm("Permanently delete this module?")) {
      setSections(sections.filter(s => s.id !== id));
    }
  };

  const saveSection = (id, updatedData) => {
    setSections(sections.map(s => s.id === id ? { ...s, ...updatedData } : s));
    setEditingSection(null);
  };

  const handlePublish = () => {
    setSaving(true);
    setTimeout(() => { setSaving(false); alert("Module configuration successfully updated."); }, 600);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
      
      {/* Hidden Inputs */}
      <input type="file" ref={heroImageInputRef} onChange={handleHeroImageUpload} style={{ display: "none" }} />
      <input type="file" ref={sectionMediaInputRef} onChange={handleSectionMediaUpload} style={{ display: "none" }} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
           <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Technology Node CMS</h1>
           <p style={{ color: "#64748b", fontSize: "15px", marginTop: "6px" }}>Complete CRUD management for tech specs, images, and videos.</p>
        </div>
        <button onClick={handlePublish} disabled={saving} style={primaryBtnStyle}>
           {saving ? <i className="fa-solid fa-sync fa-spin"></i> : <i className="fa-solid fa-microchip"></i>}
           {saving ? "Updating..." : "Deploy Tech Nodes"}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "40px", borderBottom: "1px solid #e2e8f0", marginBottom: "40px" }}>
        <button onClick={() => setActiveTab("hero")} style={{...tabStyle, borderBottom: activeTab === "hero" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "hero" ? "#1e293b" : "#94a3b8" }}>1. Global Hero Header</button>
        <button onClick={() => setActiveTab("sections")} style={{...tabStyle, borderBottom: activeTab === "sections" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "sections" ? "#1e293b" : "#94a3b8" }}>2. Tech Module CRUD</button>
      </div>

      <div style={panelStyle}>
        
        {activeTab === "hero" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
             <h3 style={sectionTitleStyle}>Primary Tech Visualization</h3>
             <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                   <div>
                      <label style={labelStyle}>Promotion Badge</label>
                      <input type="text" value={hero.badge} onChange={(e) => setHero({...hero, badge: e.target.value})} style={inputStyle} />
                   </div>
                   <div>
                      <label style={labelStyle}>Headline Title</label>
                      <input type="text" value={hero.title} onChange={(e) => setHero({...hero, title: e.target.value})} style={inputStyle} />
                   </div>
                   <div>
                      <label style={labelStyle}>Technical Narrative</label>
                      <textarea value={hero.content} onChange={(e) => setHero({...hero, content: e.target.value})} rows="6" style={{...inputStyle, height: "auto", resize: "none"}} />
                   </div>
                </div>
                <div>
                   <label style={labelStyle}>Visualization Asset (Static)</label>
                   <div onClick={() => heroImageInputRef.current.click()} style={{ width: "100%", height: "240px", background: hero.image ? `url(${hero.image})` : "#f8faff", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "20px", border: "1px solid #f1f5f9", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      {!hero.image && <i className="fa-solid fa-image-polaroid" style={{ fontSize: "24px", color: "#3257ff" }}></i>}
                   </div>
                   <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "12px", background: "#f8faff", padding: "12px", borderRadius: "12px" }}>
                      <input type="checkbox" checked={hero.reverse} onChange={(e) => setHero({...hero, reverse: e.target.checked})} style={{ width: "18px", height: "18px", accentColor: "#3257ff" }} />
                      <label style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>Reverse Visual Layout</label>
                   </div>
                </div>
             </div>
          </div>
        )}

        {activeTab === "sections" && (
           <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "30px" }}>
                 <h3 style={sectionTitleStyle}>Technology Segment Management</h3>
                 <button onClick={addSection} style={{ background: "transparent", border: "none", color: "#3257ff", fontWeight: 800, cursor: "pointer" }}>+ New Technical Module</button>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                 {sections.map((sec, idx) => (
                    <div key={sec.id} style={{ padding: "20px", background: "#f8faff", borderRadius: "18px", border: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                       <div style={{ display: "flex", alignItems: "center", gap: "25px", flex: 1 }}>
                          <div style={{ width: "60px", height: "60px", background: "#ffffff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0", overflow: "hidden", position: "relative" }}>
                             {sec.video ? (
                                <i className="fa-solid fa-play-circle" style={{ color: "#3257ff", fontSize: "24px" }}></i>
                             ) : sec.image ? (
                                <img src={sec.image} style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                             ) : (
                                <i className="fa-solid fa-microchip" style={{ color: "#cbd5e1" }}></i>
                             )}
                             {sec.reverse && <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", background: "#3257ff", borderRadius: "0 0 0 4px", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-repeat" style={{ color: "#fff", fontSize: "6px" }}></i></div>}
                          </div>
                          <div style={{ flex: 1 }}>
                             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <p style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>{sec.title}</p>
                                <span style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>{sec.video ? "Video Linked" : "Static Image"}</span>
                             </div>
                             <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8", maxWidth: "500px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sec.content}</p>
                          </div>
                       </div>
                       <div style={{ display: "flex", gap: "10px" }}>
                          <button onClick={() => setEditingSection(sec)} style={actionBtnStyle}><i className="fa-solid fa-sliders"></i></button>
                          <button onClick={() => deleteSection(sec.id)} style={{...actionBtnStyle, color: "#ef4444"}}><i className="fa-solid fa-trash"></i></button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

      </div>

      {/* --- EXTENDED SPECIFICATION EDITOR MODAL --- */}
      {editingSection && (
        <div style={modalOverlayStyle}>
           <div style={modalStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 800 }}>Node Specification Editor</h3>
                <button onClick={() => setEditingSection(null)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}><i className="fa-solid fa-xmark"></i></button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div>
                        <label style={labelStyle}>Feature Label</label>
                        <input type="text" value={editingSection.title} onChange={(e) => setEditingSection({...editingSection, title: e.target.value})} style={inputStyle} />
                    </div>
                    <div>
                        <label style={labelStyle}>Layout Strategy</label>
                        <select value={editingSection.reverse ? "reverse" : "standard"} onChange={(e) => setEditingSection({...editingSection, reverse: e.target.value === "reverse"})} style={inputStyle}>
                           <option value="standard">Standard (Image Left)</option>
                           <option value="reverse">Inverted (Image Right)</option>
                        </select>
                    </div>
                 </div>

                 <div>
                    <label style={labelStyle}>Technical Narrative</label>
                    <textarea value={editingSection.content} onChange={(e) => setEditingSection({...editingSection, content: e.target.value})} rows="4" style={{...inputStyle, height: "auto", resize: "none"}} />
                 </div>

                 <div>
                    <label style={labelStyle}>Media Content (Image or Video)</label>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <div style={{ width: "120px", height: "120px", background: "#f8faff", borderRadius: "16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                           {editingSection.video ? (
                             <div style={{ textAlign: "center" }}><i className="fa-solid fa-video" style={{ fontSize: "20px", color: "#3257ff" }}></i><p style={{ margin: "5px 0 0", fontSize: "9px", color: "#3257ff" }}>{editingSection.video}</p></div>
                           ) : editingSection.image ? (
                             <img src={editingSection.image} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                           ) : (
                             <i className="fa-solid fa-plus" style={{ color: "#cbd5e1" }}></i>
                           )}
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                           <button onClick={() => sectionMediaInputRef.current.click()} style={{ padding: "12px", background: "#3257ff15", color: "#3257ff", borderRadius: "10px", border: "none", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>Upload Media File</button>
                           <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>Supported: MP4, JPG, PNG, WebP</p>
                        </div>
                    </div>
                 </div>

                 <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                    <button onClick={() => setEditingSection(null)} style={{ flex: 1, padding: "16px", background: "#f1f5f9", borderRadius: "12px", border: "none", color: "#64748b", fontWeight: 700, cursor: "pointer" }}>Dismiss</button>
                    <button onClick={() => saveSection(editingSection.id, editingSection)} style={{ flex: 1, padding: "16px", background: "#3257ff", borderRadius: "12px", border: "none", color: "#ffffff", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)" }}>Apply Spec Updates</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// STYLES
const primaryBtnStyle = { padding: "14px 32px", background: "#3257ff", color: "#ffffff", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 20px rgba(50, 87, 255, 0.2)" };
const tabStyle = { padding: "15px 0", background: "transparent", border: "none", fontWeight: 800, fontSize: "15px", cursor: "pointer" };
const panelStyle = { background: "#ffffff", borderRadius: "24px", padding: "40px", border: "1px solid #f1f5f9", boxShadow: "0 4px 25px rgba(0,0,0,0.02)" };
const sectionTitleStyle = { fontSize: "20px", fontWeight: 800, color: "#1e293b", marginBottom: "25px" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: 700, color: "#64748b", marginBottom: "8px" };
const inputStyle = { width: "100%", padding: "16px", background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#1e293b", fontSize: "14px", outline: "none", fontWeight: 600 };
const actionBtnStyle = { width: "36px", height: "36px", borderRadius: "10px", background: "#ffffff", border: "1px solid #f1f5f9", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const modalOverlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalStyle = { width: "520px", background: "#ffffff", borderRadius: "28px", padding: "40px", boxShadow: "0 30px 60px rgba(0,0,0,0.15)" };
