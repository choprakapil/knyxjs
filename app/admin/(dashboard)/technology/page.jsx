"use client";
import React, { useState, useEffect, useRef } from "react";
import { uploadMediaFile } from "@/lib/uploadClient";
import RichTextEditor from "@/components/common/RichTextEditor";

const defaultTechnologyState = {
  hero: {
    badge: "Engineered excellence",
    title: "The Science",
    content: "At KNYX, technology is the core of our design philosophy. Every helmet is the result of advanced engineering, material science, and relentless testing, created to deliver protection you can trust at every level of the game. We use high performance materials selected for their strength to weight ratio, durability and resilience under pressure. Each layer within a KNYX helmet serves a precise function — from outer shell rigidity to inner cushioning — working together as a unified protection system.",
    image: "/assets/img/technology/section_1.png",
    reverse: false
  },
  sections: [
    {
      id: 1,
      title: "Outer Layer",
      content: "The shell of KNYX C7 Cricket Helmets form the cornerstone for Pro Level Players by incorporating layers of Carbon Composite which distribute and dissipate impact energy across the fibre matrix, reducing localized stress and deformation resulting in a lighter shell with higher structural integrity.<br/><br/>Similarly, KNYX C5 and C3 ranges are built with Impact Modified Polymer shell designed to undergo controlled plastic deformation under impact. This absorbs and dissipate energy without cracking or shattering making it a reliable material where accessibility and durability are key.",
      image: "/assets/img/technology/section2.png",
      video: "",
      reverse: true
    },
    {
      id: 2,
      title: "Inner Layer",
      content: "The internal Impact Layer of our C7 and C5 cricket helmets is constructed with Expanded Polypropylene (EPP) which offers superior performance under repeated and variable impact loading conditions. It absorbs energy and returns to its original shape, maintaining protective performance over multiple impacts.<br/><br/>Impact Lining of our C3 and other Cricket Helmets utilise Expanded Polystyrene (EPS) which is effective for a single high impact protection through permanent densification and irreversible cell deformation.",
      image: "/assets/img/technology/section_3.png",
      video: "",
      reverse: false
    },
    {
      id: 3,
      title: "Impact Intelligence",
      content: "KNYX C5 and C7 Cricket Helmet are constructed with our in-house Radial Impact Mitigation (RIM) System. RIM employs unique moulding abilities of EPP to create flexible and autonomous pods that absorb, disperse, and reduce the force of high-speed linear and lateral impacts. Through carefully engineered geometry and energy-dissipating material, we minimized shock transfer while maintaining structural integrity resulting in superior protection without unnecessary bulk.<br/><br/>The Inner Layer of all our other helmets is designed with a variable thickness EPS lining that directs impact forces away from the player’s head while progressively absorbing the shock via singular buckling behaviour.",
      image: "/assets/img/technology/impact_intelligence.png",
      video: "",
      reverse: true
    },
    {
      id: 4,
      title: "Thermal Management",
      content: "The Engineered Ventilation System (EVS) is a designed by-product of the RIM System. This resulted in creation of multiple air pathways in between the Shell and the EPP which increases airflow and reduces heat buildup by generating a cooling wind exchange system in C7 and C5 ranges of helmet.<br/><br/>The C3 and other cricket helmet models take advantage of strategically placed inlets and outlets on the helmet to optimize airflow and regulate temperature allowing players to stay focused under pressure.",
      image: "/assets/img/technology/Thermal_Management.png",
      video: "",
      reverse: false
    },
    {
      id: 5,
      title: "Precision Fit System",
      content: "All of the KNYX helmets feature ergonomic design principles and variable fit systems that ensure stability, comfort, and secure positioning during play because protection is only efficient when it fits perfectly.<br/><br/>KNYX C7 and C5 Cricket Helmets are equipped with patented ISOFIT micro adjustment system. IsoFit adapts to the unique shape of each wearer’s head, delivering a truly personalized fit without ever needing to 3D scan your head. IsoFit evenly distributes helmet weight around the head, keeping the helmet stable, balanced and centred during use.<br/><br/>Fit systems on our C3 and other cricket helmets are designed to tighten around the lower head with either the use of our unique 360 fit system or achieve stability with conforming comfort liner for easy and quick adjustments for a perfect fit.",
      image: "/assets/img/products/6.png",
      video: "/assets/video/Precision_Fit_System.MP4",
      reverse: true
    },
    {
      id: 6,
      title: "Facial Protection",
      content: "Every KNYX Helmet Is equipped with our proprietary Tactical Faceguard engineered for optimal protection. The unique lightweight design expands the frontal as well as peripheral vision for better tracking of the incoming ball. The compact and optimized structure contours to the face while reducing gaps to hinder any possible penetration of the ball and evading facial contact.",
      image: "/assets/img/products/7.png",
      video: "",
      reverse: false
    }
  ]
};

const resolvePreviewUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("/")) {
    return path;
  }
  return `/${path}`;
};

export default function TechnologyCMS() {
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isDirty, setIsDirty] = useState(false); // Unsaved Changes tracker

  const heroImageInputRef = useRef(null);
  const sectionMediaInputRef = useRef(null);

  const [hero, setHero] = useState(defaultTechnologyState.hero);
  const [sections, setSections] = useState(defaultTechnologyState.sections);
  const [editingSection, setEditingSection] = useState(null);

  const [dragActiveHero, setDragActiveHero] = useState(false);
  const [dragActiveSection, setDragActiveSection] = useState(false);

  // Sync window warn dialog for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    fetchTechnologyContent();
  }, []);

  const fetchTechnologyContent = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success) {
        const tech = data.settings?.content?.technology || {};
        setHero({
          badge: tech.hero?.badge || defaultTechnologyState.hero.badge,
          title: tech.hero?.title || defaultTechnologyState.hero.title,
          content: tech.hero?.content || defaultTechnologyState.hero.content,
          image: tech.hero?.image || defaultTechnologyState.hero.image,
          reverse: tech.hero?.reverse ?? defaultTechnologyState.hero.reverse
        });
        setSections(tech.sections ? tech.sections.map((section, index) => ({
          id: section.id || Date.now() + index,
          title: section.title || `Section ${index + 1}`,
          content: section.content || "",
          image: section.image || "",
          video: section.video || "",
          reverse: section.reverse ?? false
        })) : defaultTechnologyState.sections);
      }
    } catch (err) {
      console.error("Failed to load technology content", err);
    } finally {
      setLoading(false);
    }
  };

  const processHeroImage = async (file) => {
    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Please upload a valid image file.", type: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: "Hero image exceeds 5MB limit.", type: "error" });
      return;
    }

    try {
      const path = await uploadMediaFile(file);
      setHero({ ...hero, image: path });
      setIsDirty(true);
      setMessage({ text: "Hero image uploaded. Click Publish to save.", type: "success" });
    } catch (err) {
      setMessage({ text: err.message || "Upload failed.", type: "error" });
    }
  };

  const processSectionMedia = async (file) => {
    if (!editingSection) return;

    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");

    if (!isVideo && !isImage) {
      setMessage({ text: "Please upload a valid image or video file.", type: "error" });
      return;
    }

    if (isVideo && file.size > 50 * 1024 * 1024) {
      setMessage({ text: "Section video exceeds 50MB limit.", type: "error" });
      return;
    }
    if (isImage && file.size > 5 * 1024 * 1024) {
      setMessage({ text: "Section image exceeds 5MB limit.", type: "error" });
      return;
    }

    try {
      const path = await uploadMediaFile(file);
      setEditingSection({
        ...editingSection,
        video: isVideo ? path : "",
        image: isVideo ? "" : path,
      });
      setMessage({ text: "Section media uploaded.", type: "success" });
    } catch (err) {
      setMessage({ text: err.message || "Upload failed.", type: "error" });
    }
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    await processHeroImage(file);
  };

  const handleSectionMediaUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    await processSectionMedia(file);
  };

  // Drag and Drop
  const handleDragHero = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveHero(true);
    } else if (e.type === "dragleave") {
      setDragActiveHero(false);
    }
  };

  const handleDropHero = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveHero(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processHeroImage(file);
    }
  };

  const handleDragSection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveSection(true);
    } else if (e.type === "dragleave") {
      setDragActiveSection(false);
    }
  };

  const handleDropSection = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveSection(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processSectionMedia(file);
    }
  };

  const addSection = () => {
    const newId = Date.now();
    const newSec = { id: newId, title: "New Feature Block", content: "Technical details...", image: "", video: "", reverse: false };
    setSections([...sections, newSec]);
    setEditingSection(newSec);
    setIsDirty(true);
  };

  const deleteSection = (id) => {
    if (confirm("Permanently delete this module?")) {
      setSections(sections.filter((s) => s.id !== id));
      setIsDirty(true);
    }
  };

  const saveSection = (id, updatedData) => {
    if (!updatedData.title.trim() || !updatedData.content.trim()) {
      alert("Title and content cannot be blank.");
      return;
    }
    setSections(sections.map((s) => (s.id === id ? { ...s, ...updatedData } : s)));
    setEditingSection(null);
    setIsDirty(true);
  };

  const handlePublish = async () => {
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: {
            technology: {
              hero,
              sections
            }
          }
        })
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Technology content published successfully.", type: "success" });
        setIsDirty(false); // Reset unsaved changes warning
        await fetchTechnologyContent();
      } else {
        setMessage({ text: data.error || "Failed to save technology content.", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "An unexpected error occurred.", type: "error" });
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", animation: "fadeIn 0.5s ease" }}>
      <input type="file" ref={heroImageInputRef} onChange={handleHeroImageUpload} style={{ display: "none" }} accept="image/*" />
      <input type="file" ref={sectionMediaInputRef} onChange={handleSectionMediaUpload} style={{ display: "none" }} accept="image/*,video/*" />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Technology Page Manager</h1>
          <p style={{ color: "#64748b", fontSize: "15px", marginTop: "6px" }}>Manage technical page documentation and brand modules.</p>
        </div>
        <button onClick={handlePublish} disabled={saving} style={primaryBtnStyle}>
          {saving ? <i className="fa-solid fa-sync fa-spin"></i> : <i className="fa-solid fa-cloud-arrow-up"></i>}
          {saving ? "Publishing..." : "Publish Content"}
        </button>
      </div>

      {isDirty && (
        <div style={{ marginBottom: "20px", padding: "12px 18px", borderRadius: "10px", background: "#fffbeb", border: "1px solid #fef3c7", color: "#b45309", fontSize: "13px", fontWeight: 600 }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ marginRight: "8px" }}></i>
          You have unsaved changes. Click "Publish Content" to save them to the live site.
        </div>
      )}

      {message.text && (
        <div style={{ marginBottom: "24px", padding: "18px", borderRadius: "14px", background: message.type === "success" ? "#ecfdf5" : "#fef2f2", border: `1px solid ${message.type === "success" ? "#d1fae5" : "#fecaca"}`, color: message.type === "success" ? "#065f46" : "#991b1b" }}>
          {message.text}
        </div>
      )}

      <div style={{ display: "flex", gap: "40px", borderBottom: "1px solid #e2e8f0", marginBottom: "40px" }}>
        <button onClick={() => setActiveTab("hero")} style={{ ...tabStyle, borderBottom: activeTab === "hero" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "hero" ? "#1e293b" : "#94a3b8" }}>Hero Section</button>
        <button onClick={() => setActiveTab("sections")} style={{ ...tabStyle, borderBottom: activeTab === "sections" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "sections" ? "#1e293b" : "#94a3b8" }}>Content Sections</button>
      </div>

      <div style={panelStyle}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "28px", color: "#3257ff", marginBottom: "12px" }}></i>
            <p style={{ color: "#64748b" }}>Loading technology details...</p>
          </div>
        ) : (
          <>
            {activeTab === "hero" && (
              <div>
                <h3 style={sectionTitleStyle}>Hero Content</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "40px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div>
                      <label style={labelStyle}>Badge</label>
                      <input type="text" value={hero.badge} onChange={(e) => { setHero({ ...hero, badge: e.target.value }); setIsDirty(true); }} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Title</label>
                      <input type="text" value={hero.title} onChange={(e) => { setHero({ ...hero, title: e.target.value }); setIsDirty(true); }} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Content</label>
                      <RichTextEditor 
                        value={hero.content} 
                        onChange={(html) => { setHero({ ...hero, content: html }); setIsDirty(true); }} 
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Hero Image</label>
                    <div 
                      onClick={() => heroImageInputRef.current.click()} 
                      onDragEnter={handleDragHero}
                      onDragOver={handleDragHero}
                      onDragLeave={handleDragHero}
                      onDrop={handleDropHero}
                      style={{ 
                        width: "100%", 
                        height: "240px", 
                        background: dragActiveHero ? "#f0f3ff" : (hero.image ? `url(${resolvePreviewUrl(hero.image)})` : "#f8faff"), 
                        backgroundSize: "cover", 
                        backgroundPosition: "center", 
                        borderRadius: "20px", 
                        border: dragActiveHero ? "2px dashed #3257ff" : "1px solid #e2e8f0", 
                        cursor: "pointer", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        transition: "all 0.3s"
                      }}
                    >
                      {dragActiveHero ? (
                        <span style={{ fontWeight: 700, color: "#3257ff" }}>Drop Image Here</span>
                      ) : (
                        !hero.image && <i className="fa-solid fa-image" style={{ fontSize: "24px", color: "#3257ff" }}></i>
                      )}
                    </div>
                    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "12px", background: "#f8faff", padding: "12px", borderRadius: "12px" }}>
                      <input type="checkbox" checked={hero.reverse} onChange={(e) => { setHero({ ...hero, reverse: e.target.checked }); setIsDirty(true); }} style={{ width: "18px", height: "18px", accentColor: "#3257ff" }} />
                      <label style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>Reverse Layout</label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "sections" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "30px" }}>
                  <h3 style={sectionTitleStyle}>Technology Modules</h3>
                  <button onClick={addSection} style={{ background: "transparent", border: "none", color: "#3257ff", fontWeight: 800, fontSize: "14px", cursor: "pointer" }}>+ Add Section</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {sections.map((section, index) => (
                    <div key={section.id} style={{ padding: "15px 20px", background: "#f8faff", borderRadius: "18px", border: "1px solid #f1f5f9", display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px", flex: "1 1 200px", overflow: "hidden" }}>
                        <div style={{ width: "50px", height: "50px", background: "#ffffff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                          {section.video ? (
                            <i className="fa-solid fa-circle-play" style={{ color: "#3257ff", fontSize: "20px" }}></i>
                          ) : section.image ? (
                            <img src={resolvePreviewUrl(section.image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <i className="fa-solid fa-microchip" style={{ color: "#cbd5e1" }}></i>
                          )}
                          {section.reverse && <div style={{ position: "absolute", top: 0, right: 0, width: "12px", height: "12px", background: "#3257ff", borderRadius: "0 0 0 4px", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-repeat" style={{ color: "#fff", fontSize: "6px" }}></i></div>}
                        </div>
                        <div style={{ flex: 1, overflow: "hidden" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                            <p style={{ margin: 0, fontSize: "15px", fontWeight: 800, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{section.title}</p>
                            <span style={{ fontSize: "10px", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>{section.video ? "Video" : "Image"}</span>
                          </div>
                          <p 
                            style={{ margin: 0, fontSize: "12px", color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                            dangerouslySetInnerHTML={{ __html: section.content.replace(/<[^>]*>/g, " ").slice(0, 100) }}
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
                        <button onClick={() => setEditingSection(section)} style={actionBtnStyle}><i className="fa-solid fa-sliders"></i></button>
                        <button onClick={() => deleteSection(section.id)} style={{ ...actionBtnStyle, color: "#ef4444" }}><i className="fa-solid fa-trash"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {editingSection && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
              <h3 style={{ margin: 0, fontSize: "22px", fontWeight: 800, color: "#1e293b" }}>Edit Section</h3>
              <button onClick={() => setEditingSection(null)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                  <label style={labelStyle}>Title</label>
                  <input type="text" value={editingSection.title} onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Layout</label>
                  <select value={editingSection.reverse ? "reverse" : "standard"} onChange={(e) => setEditingSection({ ...editingSection, reverse: e.target.value === "reverse" })} style={inputStyle}>
                    <option value="standard">Standard</option>
                    <option value="reverse">Reverse Layout</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}>Content Details</label>
                <RichTextEditor 
                  value={editingSection.content} 
                  onChange={(html) => setEditingSection({ ...editingSection, content: html })} 
                />
              </div>
              <div>
                <label style={labelStyle}>Media</label>
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                  <div 
                    onDragEnter={handleDragSection}
                    onDragOver={handleDragSection}
                    onDragLeave={handleDragSection}
                    onDrop={handleDropSection}
                    onClick={() => sectionMediaInputRef.current.click()}
                    style={{ 
                      width: "120px", 
                      height: "120px", 
                      background: dragActiveSection ? "#f0f3ff" : "#f8faff", 
                      borderRadius: "16px", 
                      border: dragActiveSection ? "2px dashed #3257ff" : "1px solid #e2e8f0", 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center", 
                      overflow: "hidden",
                      cursor: "pointer" 
                    }}
                  >
                    {dragActiveSection ? (
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#3257ff", textAlign: "center" }}>Drop File</span>
                    ) : editingSection.video ? (
                      <div style={{ textAlign: "center" }}><i className="fa-solid fa-video" style={{ fontSize: "20px", color: "#3257ff" }}></i><p style={{ margin: "5px 0 0", fontSize: "9px", color: "#3257ff" }}>Video Active</p></div>
                    ) : editingSection.image ? (
                      <img src={resolvePreviewUrl(editingSection.image)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <i className="fa-solid fa-plus" style={{ color: "#cbd5e1" }}></i>
                    )}
                  </div>
                  <button onClick={() => sectionMediaInputRef.current.click()} style={{ padding: "12px", background: "#3257ff15", color: "#3257ff", borderRadius: "10px", border: "none", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>Upload Media</button>
                </div>
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <button onClick={() => setEditingSection(null)} style={{ flex: 1, padding: "16px", background: "#f1f5f9", borderRadius: "12px", border: "none", color: "#64748b", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button onClick={() => saveSection(editingSection.id, editingSection)} style={{ flex: 1, padding: "16px", background: "#3257ff", borderRadius: "12px", border: "none", color: "#ffffff", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)" }}>Save Section</button>
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

const primaryBtnStyle = { padding: "14px 32px", background: "#3257ff", color: "#ffffff", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 20px rgba(50, 87, 255, 0.2)" };
const tabStyle = { padding: "15px 0", background: "transparent", border: "none", fontWeight: 800, fontSize: "15px", cursor: "pointer" };
const panelStyle = { background: "#ffffff", borderRadius: "24px", padding: "40px", border: "1px solid #f1f5f9", boxShadow: "0 4px 25px rgba(0,0,0,0.02)" };
const sectionTitleStyle = { fontSize: "20px", fontWeight: 800, color: "#1e293b", marginBottom: "25px" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: 700, color: "#64748b", marginBottom: "8px" };
const inputStyle = { width: "100%", padding: "16px", background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#1e293b", fontSize: "14px", outline: "none", fontWeight: 600 };
const actionBtnStyle = { width: "36px", height: "36px", borderRadius: "10px", background: "#ffffff", border: "1px solid #f1f5f9", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const modalOverlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalStyle = { width: "520px", background: "#ffffff", borderRadius: "28px", padding: "40px", boxShadow: "0 30px 60px rgba(0,0,0,0.15)" };
