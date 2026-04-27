"use client";
import React, { useState, useRef } from "react";

export default function HomepageCMS() {
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);

  // File Input Refs
  const videoInputRef = useRef(null);
  const posterInputRef = useRef(null);

  // --- Local UI State (Mocking Data) ---
  const [hero, setHero] = useState({
    videoName: "hero.mp4",
    posterImg: "/assets/img/hero/ai/bg-black.jpg",
  });

  const [story, setStory] = useState({
    manifestoTitle: "THE KNYX MANIFESTO",
    manifestoBody: "At KNYX, protection is a craft, and performance is a promise. Born from the spirit of knight, KNYX reflects strength, precision, and timeless honour.",
    sections: [
      { id: 1, title: "The Origin", body: "Inspired by the word NYX, meaning night, and transformed into KNYX..." },
      { id: 2, title: "Heritage & Innovation", body: "Cricket carries tradition in every stroke and every stance..." }
    ]
  });

  // Modal State for Editing Segments
  const [editingSegment, setEditingSegment] = useState(null);

  // --- Handlers for "Working" UI ---

  // 1. File Handling
  const triggerVideoUpload = () => videoInputRef.current.click();
  const triggerPosterUpload = () => posterInputRef.current.click();

  const handleVideoChange = (e) => {
    if (e.target.files?.[0]) {
      setHero({ ...hero, videoName: e.target.files[0].name });
      alert(`Staged: ${e.target.files[0].name}`);
    }
  };

  const handlePosterChange = (e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setHero({ ...hero, posterImg: event.target.result });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // 2. Story Segment Management
  const addSegment = () => {
    const newId = Date.now();
    const newSec = { id: newId, title: "New Story Segment", body: "Edit this content to share more about KNYX..." };
    setStory({ ...story, sections: [...story.sections, newSec] });
    setEditingSegment(newSec);
  };

  const deleteSegment = (id) => {
    if (confirm("Permanently remove this segment from the UI?")) {
      setStory({ ...story, sections: story.sections.filter(s => s.id !== id) });
    }
  };

  const saveSegmentEdit = (id, newTitle, newBody) => {
    setStory({
      ...story,
      sections: story.sections.map(s => s.id === id ? { ...s, title: newTitle, body: newBody } : s)
    });
    setEditingSegment(null);
  };

  const handlePublish = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Landing page architecture successfully updated in local session.");
    }, 800);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
      
      {/* Hidden File Inputs */}
      <input type="file" ref={videoInputRef} onChange={handleVideoChange} accept="video/*" style={{ display: "none" }} />
      <input type="file" ref={posterInputRef} onChange={handlePosterChange} accept="image/*" style={{ display: "none" }} />

      {/* 🧭 Header & Action */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0, letterSpacing: "-0.5px" }}>Landing Page Architecture</h1>
          <p style={{ color: "#64748b", fontSize: "15px", marginTop: "6px" }}>Manage core visual and narrative assets for the KNYX homepage.</p>
        </div>
        <button 
          onClick={handlePublish}
          disabled={saving}
          style={{ padding: "14px 32px", background: "#3257ff", color: "#ffffff", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 20px rgba(50, 87, 255, 0.2)" }}
        >
          {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-check"></i>}
          {saving ? "Processing..." : "Publish Changes"}
        </button>
      </div>

      {/* 📑 Minimalist Tab Switcher */}
      <div style={{ display: "flex", gap: "40px", borderBottom: "1px solid #e2e8f0", marginBottom: "40px" }}>
        <button 
          onClick={() => setActiveTab("hero")}
          style={{ padding: "15px 0", background: "transparent", border: "none", borderBottom: activeTab === "hero" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "hero" ? "#1e293b" : "#94a3b8", fontWeight: 800, fontSize: "15px", cursor: "pointer", transition: "all 0.2s" }}
        >
          1. Hero Video Asset
        </button>
        <button 
          onClick={() => setActiveTab("brand")}
          style={{ padding: "15px 0", background: "transparent", border: "none", borderBottom: activeTab === "brand" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "brand" ? "#1e293b" : "#94a3b8", fontWeight: 800, fontSize: "15px", cursor: "pointer", transition: "all 0.2s" }}
        >
          2. Brand Story Architecture
        </button>
      </div>

      {/* 🛠 Configuration Panels */}
      <div style={{ background: "#ffffff", borderRadius: "24px", padding: "40px", border: "1px solid #f1f5f9", boxShadow: "0 4px 25px rgba(0,0,0,0.02)" }}>
        
        {activeTab === "hero" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", marginBottom: "25px" }}>Hero Media Management</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "50px" }}>
              <div 
                onClick={triggerVideoUpload}
                style={{ background: "#f8faff", borderRadius: "20px", border: "2px dashed #e2e8f0", padding: "40px", textAlign: "center", minHeight: "300px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
              >
                <div style={{ width: "80px", height: "80px", background: "#ffffff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
                  <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: "24px", color: "#3257ff" }}></i>
                </div>
                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>Replace Hero Video</h4>
                <p style={{ margin: "10px 0 25px", fontSize: "13px", color: "#64748b" }}>Recommended: MP4, 1920x1080px, Max 50MB</p>
                <button style={{ padding: "12px 24px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", color: "#1e293b", fontWeight: 700, fontSize: "13px", cursor: "pointer", pointerEvents: "none" }}>Choose File</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                <div>
                  <h4 style={{ margin: "0 0 5px", fontSize: "15px", fontWeight: 800, color: "#1e293b" }}>Active Asset</h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "#3257ff", fontWeight: 700 }}>{hero.videoName}</p>
                </div>
                <div style={{ height: "1px", background: "#f1f5f9" }}></div>
                <div>
                   <h4 style={{ margin: "0 0 15px", fontSize: "15px", fontWeight: 800, color: "#1e293b" }}>Fallback Image</h4>
                   <div style={{ width: "100%", height: "140px", background: `url(${hero.posterImg})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "15px" }}></div>
                   <button onClick={triggerPosterUpload} style={{ width: "100%", padding: "14px", background: "#f8faff", borderRadius: "10px", border: "none", color: "#3257ff", fontWeight: 800, fontSize: "13px", cursor: "pointer" }}>Upload New Poster</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "brand" && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", marginBottom: "30px" }}>Narrative Content</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
              
              <div style={{ padding: "30px", background: "#f8faff", borderRadius: "20px", border: "1px solid #f1f5f9" }}>
                <p style={{ fontSize: "12px", color: "#3257ff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>Main Manifesto</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                   <input type="text" value={story.manifestoTitle} onChange={(e) => setStory({...story, manifestoTitle: e.target.value})} style={inputStyle} />
                   <textarea value={story.manifestoBody} onChange={(e) => setStory({...story, manifestoBody: e.target.value})} rows="4" style={{...inputStyle, height: "auto", resize: "none"}} />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                   <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#1e293b" }}>Story Structure Segments</h4>
                   <button onClick={addSegment} style={{ background: "transparent", color: "#3257ff", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>+ Insert Segment</button>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                   {story.sections.map((sec, idx) => (
                      <div key={sec.id} style={{ padding: "20px", border: "1px solid #f1f5f9", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                           <div style={{ width: "32px", height: "32px", background: "#3257ff20", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#3257ff", fontWeight: 800, fontSize: "13px" }}>{idx+1}</div>
                           <div>
                              <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{sec.title}</p>
                              <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "400px" }}>{sec.body}</p>
                           </div>
                        </div>
                        <div style={{ display: "flex", gap: "10px" }}>
                           <button onClick={() => setEditingSegment(sec)} style={actionBtnStyle}><i className="fa-solid fa-pen-to-square"></i></button>
                           <button onClick={() => deleteSegment(sec.id)} style={{...actionBtnStyle, color: "#ef4444"}}><i className="fa-solid fa-trash"></i></button>
                        </div>
                      </div>
                   ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* --- EDIT SEGMENT MODAL (UI Only) --- */}
      {editingSegment && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
           <div style={{ width: "500px", background: "#ffffff", borderRadius: "24px", padding: "40px", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
              <h3 style={{ margin: "0 0 25px 0", fontSize: "20px", fontWeight: 800, color: "#1e293b" }}>Edit Segment</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                 <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>Segment Title</label>
                    <input id="editTitle" type="text" defaultValue={editingSegment.title} style={inputStyle} />
                 </div>
                 <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>Segment Body</label>
                    <textarea id="editBody" defaultValue={editingSegment.body} rows="5" style={{...inputStyle, height: "auto"}} />
                 </div>
                 <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                    <button onClick={() => setEditingSegment(null)} style={{ flex: 1, padding: "14px", background: "#f1f5f9", borderRadius: "12px", border: "none", color: "#64748b", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                    <button 
                      onClick={() => {
                        const t = document.getElementById("editTitle").value;
                        const b = document.getElementById("editBody").value;
                        saveSegmentEdit(editingSegment.id, t, b);
                      }}
                      style={{ flex: 1, padding: "14px", background: "#3257ff", borderRadius: "12px", border: "none", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
                    >
                      Apply Changes
                    </button>
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

const inputStyle = {
  width: "100%",
  padding: "16px",
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  color: "#1e293b",
  fontSize: "14px",
  outline: "none",
  fontWeight: 600,
  transition: "all 0.3s ease"
};

const actionBtnStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: "#ffffff",
  border: "1px solid #f1f5f9",
  color: "#64748b",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  fontSize: "14px"
};
