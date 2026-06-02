"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { uploadMediaFile } from "@/lib/uploadClient";
import { withBasePath } from "@/lib/asset";
import RichTextEditor from "@/components/common/RichTextEditor";

const resolvePreviewUrl = (src) => {
  if (!src) return "";
  if (/^(data:|https?:|\/\/)/.test(src)) return src;
  return withBasePath(src);
};

const defaultHeroState = {
  videoSrc: "/assets/video/hero.mp4",
  posterImg: "/assets/img/hero/ai/bg-black.jpg",
  bgImage: "/assets/img/hero/ai/bg-black.jpg",
  videoName: "hero.mp4"
};

const defaultStoryState = {
  manifestoTitle: "Brand Story",
  manifestoBody: "At KNYX, protection is a craft, and performance is a promise. Born from the spirit of knight, KNYX reflects strength, precision, and timeless honour. We represent the modern athlete — focused, fearless, and equipped. KNYX was created with a singular vision: to build elite sports protection that blends advanced engineering with the classic elegance.",
  sections: [
    {
      id: 1,
      title: "The Origin",
      body: "Inspired by the word NYX, meaning night, and transformed into KNYX, meaning knight, our brand represents the new age athlete — focused, fearless, and equipped. We exist to protect the moments that matter in sport.<br/><br/>We are a sports protection brand built for athletes who play hard, think fast, and demand gear they can trust. Just like a knight’s armour once safeguarded warriors on the battlefield, KNYX exists to protect athletes in their arena.<br/><br/>Our journey begins with cricket—a game of skill, speed, and split-second decisions—where protection isn’t optional, it’s essential."
    },
    {
      id: 2,
      title: "The Modern Knight",
      body: "Every athlete who steps onto the field is a warrior of the game.<br/><br/>At KNYX, protection is not just a feature—it’s a responsibility. Every curve, every layer, every detail is engineered to perform under pressure. KNYX equips players with armour they can rely on — so they can focus on their game, not their safety.<br/><br/>When you wear KNYX, you don’t just wear equipment. You wear confidence. You wear courage. You wear protection worthy of a knight."
    },
    {
      id: 3,
      title: "Heritage & Innovation",
      body: "Cricket carries tradition in every stroke and every stance. We respect that legacy.<br/><br/>KNYX was created with a singular vision: to build elite sports protection that blends advanced engineering with the classic elegance.<br/><br/>Our flagship cricket helmet is designed to preserve the iconic silhouette of the game, while integrating cutting-edge impact protection, lightweight materials, and superior comfort systems.<br/><br/>Every KNYX product is meticulously engineered to deliver uncompromising safety without sacrificing style."
    },
    {
      id: 4,
      title: "Our Philosophy",
      body: "We believe in:<ul><li>Safety First – Protection that meets and exceeds performance expectations</li><li>Player-Focused Design – Comfort, fit, and confidence built in</li><li>Relentless Innovation – Always improving, never standing still</li></ul>Because when athletes feel protected, they play without hesitation—and that’s when the game is at its best."
    },
    {
      id: 5,
      title: "The KNYX Promise",
      body: "Our journey begins with cricket helmets, but our ambition extends far beyond.<br/><br/>As KNYX continues to evolve, we will introduce new innovations across sports—each designed to redefine safety, performance, and confidence. We are carving a path where the future isn’t something you wait for.<br/><br/>It’s something you wear.<br/><br/>This isn’t the future of sport.<br/><br/>It’s #NowKnyx"
    }
  ]
};

export default function HomepageCMS() {
  const [activeTab, setActiveTab] = useState("hero");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isDirty, setIsDirty] = useState(false); // Unsaved Changes tracker

  const [hero, setHero] = useState(defaultHeroState);
  const [story, setStory] = useState(defaultStoryState);

  const videoInputRef = useRef(null);
  const posterInputRef = useRef(null);
  const [editingSegment, setEditingSegment] = useState(null);
  const [dragActiveVideo, setDragActiveVideo] = useState(false);
  const [dragActivePoster, setDragActivePoster] = useState(false);

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
    fetchHomepageContent();
  }, []);

  const fetchHomepageContent = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();

      if (data.success) {
        const content = data.settings?.content || {};
        const home = content.home || {};

        setHero({
          videoSrc: home.hero?.videoSrc || defaultHeroState.videoSrc,
          posterImg: home.hero?.posterImg || defaultHeroState.posterImg,
          bgImage: home.hero?.bgImage || defaultHeroState.bgImage,
          videoName: home.hero?.videoName || defaultHeroState.videoName
        });

        // Ensure we load the sections content correctly
        const dbStory = home.brandStory || {};
        setStory({
          manifestoTitle: dbStory.title || defaultStoryState.manifestoTitle,
          manifestoBody: dbStory.intro || defaultStoryState.manifestoBody,
          sections: dbStory.sections ? dbStory.sections.map((section, index) => ({
            id: section.id || Date.now() + index,
            title: section.title || section.heading || "Untitled Segment",
            body: Array.isArray(section.content) ? section.content.join(" ") : section.content || ""
          })) : defaultStoryState.sections
        });
      }
    } catch (err) {
      console.error("Failed to load homepage content:", err);
    } finally {
      setLoading(false);
    }
  };

  const triggerVideoUpload = () => videoInputRef.current?.click();
  const triggerPosterUpload = () => posterInputRef.current?.click();

  const persistHero = useCallback(async (heroPayload) => {
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        content: {
          home: {
            hero: heroPayload,
          },
        },
      }),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || "Failed to save hero media");
    }
    return data;
  }, []);

  const processVideo = async (file) => {
    // 1. Validation
    if (!file.type.startsWith("video/")) {
      setMessage({ text: "Please select a valid video file (MP4/WebM).", type: "error" });
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setMessage({ text: "Video file exceeds 50MB limit.", type: "error" });
      return;
    }

    setSaving(true);
    setMessage({ text: "Uploading video...", type: "" });

    try {
      const path = await uploadMediaFile(file);
      // Synchronously construct payload to prevent state updater race condition
      const nextHero = {
        videoSrc: path,
        videoName: file.name,
        posterImg: hero.posterImg,
        bgImage: hero.posterImg || hero.bgImage,
      };
      
      setHero(nextHero);
      await persistHero(nextHero);
      setMessage({ text: "Hero video saved. Refresh the homepage to see it live.", type: "success" });
    } catch (err) {
      setMessage({ text: err.message || "Video upload failed.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const processPoster = async (file) => {
    // 1. Validation
    if (!file.type.startsWith("image/")) {
      setMessage({ text: "Please select a valid image file.", type: "error" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: "Poster image exceeds 5MB limit.", type: "error" });
      return;
    }

    setSaving(true);
    setMessage({ text: "Uploading poster...", type: "" });

    try {
      const path = await uploadMediaFile(file);
      // Synchronously construct payload to prevent state updater race condition
      const nextHero = {
        videoSrc: hero.videoSrc,
        videoName: hero.videoName,
        posterImg: path,
        bgImage: path,
      };

      setHero(nextHero);
      await persistHero(nextHero);
      setMessage({ text: "Poster image saved. Refresh the homepage to see it live.", type: "success" });
    } catch (err) {
      setMessage({ text: err.message || "Image upload failed.", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleVideoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    await processVideo(file);
  };

  const handlePosterChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    await processPoster(file);
  };

  // Drag and Drop handlers
  const handleDragVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActiveVideo(true);
    } else if (e.type === "dragleave") {
      setDragActiveVideo(false);
    }
  };

  const handleDropVideo = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveVideo(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processVideo(file);
    }
  };

  const handleDragPoster = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActivePoster(true);
    } else if (e.type === "dragleave") {
      setDragActivePoster(false);
    }
  };

  const handleDropPoster = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActivePoster(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processPoster(file);
    }
  };

  const addSegment = () => {
    const newId = Date.now();
    const newSec = { id: newId, title: "New Story Segment", body: "Edit this content to share more about KNYX..." };
    setStory({ ...story, sections: [...story.sections, newSec] });
    setEditingSegment(newSec);
    setIsDirty(true);
  };

  const deleteSegment = (id) => {
    if (confirm("Permanently remove this segment?")) {
      setStory({ ...story, sections: story.sections.filter(s => s.id !== id) });
      setIsDirty(true);
    }
  };

  const saveSegmentEdit = (id, newTitle, newBody) => {
    if (!newTitle.trim() || !newBody.trim()) {
      alert("Title and Body content cannot be blank.");
      return;
    }
    setStory({
      ...story,
      sections: story.sections.map(s => s.id === id ? { ...s, title: newTitle.trim(), body: newBody.trim() } : s)
    });
    setEditingSegment(null);
    setIsDirty(true);
  };

  const handlePublish = async () => {
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: {
            home: {
              hero: {
                videoSrc: hero.videoSrc,
                posterImg: hero.posterImg,
                bgImage: hero.bgImage,
                videoName: hero.videoName
              },
              brandStory: {
                title: story.manifestoTitle,
                intro: story.manifestoBody,
                sections: story.sections.map((section) => ({
                  id: section.id,
                  title: section.title,
                  content: section.body
                }))
              }
            }
          }
        })
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Homepage content published successfully.", type: "success" });
        setIsDirty(false); // Reset unsaved changes warning
        await fetchHomepageContent();
      } else {
        setMessage({ text: data.error || "Failed to save homepage content.", type: "error" });
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
      <input type="file" ref={videoInputRef} onChange={handleVideoChange} accept="video/mp4,video/webm" style={{ display: "none" }} />
      <input type="file" ref={posterInputRef} onChange={handlePosterChange} accept="image/*" style={{ display: "none" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0, letterSpacing: "-0.5px" }}>Homepage Manager</h1>
          <p style={{ color: "#64748b", fontSize: "15px", marginTop: "6px" }}>Manage the website hero media and brand story content dynamically.</p>
        </div>
        <button
          onClick={handlePublish}
          disabled={saving}
          style={{ padding: "14px 32px", background: "#3257ff", color: "#ffffff", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 20px rgba(50, 87, 255, 0.2)" }}
        >
          {saving ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-cloud-arrow-up"></i>}
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
        <button onClick={() => setActiveTab("hero")} style={{ padding: "15px 0", background: "transparent", border: "none", borderBottom: activeTab === "hero" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "hero" ? "#1e293b" : "#94a3b8", fontWeight: 800, fontSize: "15px", cursor: "pointer", transition: "all 0.2s" }}>
          Hero Media
        </button>
        <button onClick={() => setActiveTab("brand")} style={{ padding: "15px 0", background: "transparent", border: "none", borderBottom: activeTab === "brand" ? "3px solid #3257ff" : "3px solid transparent", color: activeTab === "brand" ? "#1e293b" : "#94a3b8", fontWeight: 800, fontSize: "15px", cursor: "pointer", transition: "all 0.2s" }}>
          Brand Story
        </button>
      </div>

      <div style={{ background: "#ffffff", borderRadius: "24px", padding: "40px", border: "1px solid #f1f5f9", boxShadow: "0 4px 25px rgba(0,0,0,0.02)" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "28px", color: "#3257ff", marginBottom: "12px" }}></i>
            <p style={{ color: "#64748b" }}>Loading homepage details...</p>
          </div>
        ) : (
          <>
            {activeTab === "hero" && (
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", marginBottom: "25px" }}>Hero Video & Poster</h3>
                <p style={{ fontSize: "13px", color: "#64748b", marginTop: "-12px", marginBottom: "25px" }}>
                  Hero media saves immediately upon selection. Recommended video size is &lt; 50MB.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "50px" }}>
                  
                  {/* Video Upload Dropzone */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div 
                      onClick={triggerVideoUpload}
                      onDragEnter={handleDragVideo}
                      onDragOver={handleDragVideo}
                      onDragLeave={handleDragVideo}
                      onDrop={handleDropVideo}
                      style={{ 
                        background: dragActiveVideo ? "#f0f3ff" : "#f8faff", 
                        borderRadius: "20px", 
                        border: dragActiveVideo ? "2px dashed #3257ff" : "2px dashed #e2e8f0", 
                        padding: "40px", 
                        textAlign: "center", 
                        minHeight: "220px", 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        cursor: saving ? "wait" : "pointer", 
                        opacity: saving ? 0.7 : 1,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div style={{ width: "80px", height: "80px", background: "#ffffff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 20px rgba(0,0,0,0.05)", marginBottom: "20px" }}>
                        <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: "24px", color: "#3257ff" }}></i>
                      </div>
                      <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#1e293b" }}>
                        {dragActiveVideo ? "Drop Video Here" : "Drag & Drop or Click to Replace Hero Video"}
                      </h4>
                      <p style={{ margin: "10px 0 25px", fontSize: "13px", color: "#64748b" }}>MP4 recommended (max 50MB). Saves automatically.</p>
                      <button type="button" style={{ padding: "12px 24px", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", color: "#1e293b", fontWeight: 700, fontSize: "13px", cursor: "pointer", pointerEvents: "none" }}>Choose File</button>
                    </div>
                    
                    <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0", background: "#000" }}>
                      <video
                        key={hero.videoSrc}
                        src={resolvePreviewUrl(hero.videoSrc)}
                        poster={resolvePreviewUrl(hero.posterImg)}
                        controls
                        muted
                        playsInline
                        style={{ width: "100%", maxHeight: "240px", display: "block" }}
                      />
                    </div>
                  </div>

                  {/* Active Asset and Poster Preview */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                    <div>
                      <h4 style={{ margin: "0 0 5px", fontSize: "15px", fontWeight: 800, color: "#1e293b" }}>Active Asset</h4>
                      <p style={{ margin: 0, fontSize: "13px", color: "#3257ff", fontWeight: 700 }}>{hero.videoName || "No video named"}</p>
                      <p style={{ margin: "6px 0 0", fontSize: "11px", color: "#94a3b8", wordBreak: "break-all" }}>{hero.videoSrc}</p>
                    </div>
                    <div style={{ height: "1px", background: "#f1f5f9" }}></div>
                    <div>
                      <h4 style={{ margin: "0 0 15px", fontSize: "15px", fontWeight: 800, color: "#1e293b" }}>Fallback Poster Image</h4>
                      
                      <div 
                        onDragEnter={handleDragPoster}
                        onDragOver={handleDragPoster}
                        onDragLeave={handleDragPoster}
                        onDrop={handleDropPoster}
                        onClick={triggerPosterUpload}
                        style={{ 
                          width: "100%", 
                          height: "140px", 
                          backgroundImage: `url(${resolvePreviewUrl(hero.posterImg)})`, 
                          backgroundSize: "cover", 
                          backgroundPosition: "center", 
                          borderRadius: "16px", 
                          border: dragActivePoster ? "2px dashed #3257ff" : "1px solid #e2e8f0", 
                          marginBottom: "15px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#ffffff"
                        }}
                      >
                        {dragActivePoster && (
                          <div style={{ background: "rgba(50, 87, 255, 0.8)", width: "100%", height: "100%", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                            Drop Poster Here
                          </div>
                        )}
                      </div>
                      
                      <button type="button" onClick={(e) => { e.stopPropagation(); triggerPosterUpload(); }} disabled={saving} style={{ width: "100%", padding: "14px", background: "#f8faff", borderRadius: "10px", border: "none", color: "#3257ff", fontWeight: 800, fontSize: "13px", cursor: saving ? "wait" : "pointer" }}>Upload New Poster</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "brand" && (
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#1e293b", marginBottom: "30px" }}>Brand Story Settings</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "35px" }}>
                  <div style={{ padding: "30px", background: "#f8faff", borderRadius: "20px", border: "1px solid #f1f5f9" }}>
                    <p style={{ fontSize: "12px", color: "#3257ff", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "15px" }}>Main Manifesto Info</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>Manifesto Title</label>
                        <input type="text" value={story.manifestoTitle} onChange={(e) => { setStory({ ...story, manifestoTitle: e.target.value }); setIsDirty(true); }} style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>Manifesto Description</label>
                        <RichTextEditor 
                          value={story.manifestoBody} 
                          onChange={(html) => { setStory({ ...story, manifestoBody: html }); setIsDirty(true); }} 
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                      <h4 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#1e293b" }}>Story Segments</h4>
                      <button onClick={addSegment} style={{ background: "transparent", color: "#3257ff", fontWeight: 700, fontSize: "14px", border: "none", cursor: "pointer" }}>+ Add Segment</button>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                      {story.sections.map((sec, idx) => (
                        <div key={sec.id} style={{ padding: "20px", border: "1px solid #f1f5f9", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "15px", overflow: "hidden", flex: 1 }}>
                            <div style={{ width: "32px", height: "32px", background: "#3257ff20", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#3257ff", fontWeight: 800, fontSize: "13px", flexShrink: 0 }}>{idx + 1}</div>
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{sec.title}</p>
                              <p 
                                style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}
                                dangerouslySetInnerHTML={{ __html: sec.body.replace(/<[^>]*>/g, " ").slice(0, 100) }}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "10px", marginLeft: "20px" }}>
                            <button onClick={() => setEditingSegment(sec)} style={actionBtnStyle}><i className="fa-solid fa-pen-to-square"></i></button>
                            <button onClick={() => deleteSegment(sec.id)} style={{ ...actionBtnStyle, color: "#ef4444" }}><i className="fa-solid fa-trash"></i></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {editingSegment && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(5px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ width: "620px", background: "#ffffff", borderRadius: "24px", padding: "40px", boxShadow: "0 20px 50px rgba(0,0,0,0.2)", display: "flex", flexDirection: "column", gap: "25px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#1e293b" }}>Edit Segment</h3>
              <button onClick={() => setEditingSegment(null)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}><i className="fa-solid fa-xmark"></i></button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>Segment Title</label>
                <input id="editTitle" type="text" defaultValue={editingSegment.title} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>Segment Body</label>
                <RichTextEditor 
                  value={editingSegment.body} 
                  onChange={(html) => {
                    setEditingSegment(prev => ({ ...prev, body: html }));
                  }} 
                />
              </div>
              <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
                <button onClick={() => setEditingSegment(null)} style={{ flex: 1, padding: "16px", background: "#f1f5f9", borderRadius: "12px", border: "none", color: "#64748b", fontWeight: 700, cursor: "pointer" }}>Cancel</button>
                <button onClick={() => {
                  const title = document.getElementById("editTitle").value;
                  saveSegmentEdit(editingSegment.id, title, editingSegment.body);
                }} style={{ flex: 1, padding: "16px", background: "#3257ff", borderRadius: "12px", border: "none", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}>Save Segment</button>
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
