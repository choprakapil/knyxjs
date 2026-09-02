"use client";
import React, { useState, useEffect } from "react";

const DEFAULT_FEATURES = {
  carbon_composite: {
    id: "carbon_composite",
    iconImg: "logo-4.png",
    title: "CARBON COMPOSITE",
    desc: "Carbon Composite Reinforced Shell with Matte Painted Finish",
    detail: {
      headline: "Carbon Composite Reinforced Shell",
      intro: "Engineered for elite cricketers who demand ultra-lightweight construction and uncompromising protection.",
      highlights: ["Carbon Composite Reinforced Shell", "Matte painted finish"],
      specs: { Material: "Carbon Composite" }
    }
  },
  impact_polymer: {
    id: "impact_polymer",
    iconImg: "logo-4.png",
    title: "IMPACT POLYMER",
    desc: "Impact Modified Polymer Shell with matte painted finish",
    detail: {
      headline: "Impact Modified Polymer Shell",
      intro: "Lightweight and designed for maximum protection across every class of cricket.",
      highlights: ["Impact Modified Polymer Shell", "Matte painted finish"],
      specs: { Material: "Impact Modified Polymer" }
    }
  },
  epp: {
    id: "epp",
    iconImg: "logo-7.png",
    title: "EPP LINER",
    desc: "High Density Impact Absorbing Layer",
    detail: {
      headline: "High Density EPP Liner",
      intro: "Shock absorbing liner designed to mitigate extreme impacts.",
      highlights: ["High Density EPP", "Multi-impact absorbing"],
      specs: { Material: "Expanded Polypropylene" }
    }
  },
  rim: {
    id: "rim",
    iconImg: "logo-1.png",
    title: "RIM",
    desc: "Radial Impact Mitigation System for Elastic Shock Deflection",
    detail: {
      headline: "Radial Impact Mitigation",
      intro: "Handles impacts from every direction using elastic shock absorption.",
      highlights: ["Elastic shock absorption", "Multi-directional protection"],
      specs: { Technology: "RIM Elastic System" }
    }
  },
  evs: {
    id: "evs",
    iconImg: "logo-5.png",
    title: "EVS",
    desc: "Engineered Ventilation System for Enhanced Air Flow",
    detail: {
      headline: "Engineered Ventilation System",
      intro: "Continuous cooling airflow across the head ensuring maximum comfort.",
      highlights: ["Enhanced air flow", "Strategic intake/exhaust routing"],
      specs: { System: "EVS Channels" }
    }
  },
  isofit: {
    id: "isofit",
    iconImg: "logo-8.png",
    title: "ISOFIT",
    desc: "Personalized Fit Adjustment System",
    detail: {
      headline: "Personalized Fit Adjustment System",
      intro: "Micro-adjustable system that accommodates different head sizes in a single shell.",
      highlights: ["Maximum size range cover", "Personalized comfort"],
      specs: { Adjustment: "Dial-in Ratchet" }
    }
  },
  koolform: {
    id: "koolform",
    iconImg: "logo-6.png",
    title: "KOOLFORM",
    desc: "Wide Surface and Cooling Comfort Liner Padding",
    detail: {
      headline: "Wide Surface and Cooling Comfort Liner Padding",
      intro: "Included in varied thicknesses for your very own personalization and maximum comfort.",
      highlights: ["Varied thickness options", "Moisture-wicking comfort"],
      specs: { Material: "KoolForm Foam" }
    }
  },
  titanium_grille: {
    id: "titanium_grille",
    iconImg: "logo.png",
    title: "TACTICAL FACEGUARD",
    desc: "Ultralight Titanium Facial Protection",
    detail: {
      headline: "Ultralight Titanium Facial Protection",
      intro: "Unparalleled facial protection without compromising on weight or visibility.",
      highlights: ["Aerospace-grade Titanium", "Ultra-lightweight"],
      specs: { Material: "Titanium" }
    }
  },
  steel_grille: {
    id: "steel_grille",
    iconImg: "logo.png",
    title: "CARBON STEEL",
    desc: "Carbon Steel Tactical Faceguard",
    detail: {
      headline: "Carbon Steel Tactical Faceguard",
      intro: "High-grade carbon steel provides uncompromising strength and defense.",
      highlights: ["High tensile strength", "Maximum impact resistance"],
      specs: { Material: "Carbon Steel" }
    }
  },
  maglock: {
    id: "maglock",
    iconImg: "logo-3.png",
    title: "MAGLOCK",
    desc: "Magnetic Quick Fastening and Release Buckle System",
    detail: {
      headline: "Maglock Buckle System",
      intro: "Self-aligning magnetic buckle system you can fasten and release instantly.",
      highlights: ["Magnetic quick-release", "Glove-compatible operation"],
      specs: { Mechanism: "Magnetic" }
    }
  },
  quick_release: {
    id: "quick_release",
    iconImg: "logo-3.png",
    title: "QUICK RELEASE",
    desc: "Quick release buckle system",
    detail: {
      headline: "Quick Release Buckle",
      intro: "Fast and secure buckle system for immediate release.",
      highlights: ["Rapid deployment", "High-tension secure hold"],
      specs: { Mechanism: "Standard Clip" }
    }
  }
};

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("general");
  
  // Custom Dynamic Features State
  const [featurePopupGlobal, setFeaturePopupGlobal] = useState(true);
  const [showDocsMenu, setShowDocsMenu] = useState(false);
  const [features, setFeatures] = useState(DEFAULT_FEATURES);
  const [selectedFeatureId, setSelectedFeatureId] = useState("carbon_composite");
  const [newHighlight, setNewHighlight] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecVal, setNewSpecVal] = useState("");
  const [featureImgUploading, setFeatureImgUploading] = useState(null);

  const [formData, setFormData] = useState({
    logoPath: "/assets/img/logo/logo-white-2.png",
    siteEmail: "contact@knyxsports.com",
    sitePhone: "",
    instagramUrl: "https://www.instagram.com/knyxsports/",
    facebookUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
    youtubeUrl: ""
  });

  // Fetch settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success) {
        setFormData({
          logoPath: data.settings?.logoPath || "/assets/img/logo/logo-white-2.png",
          siteEmail: data.settings?.siteEmail || "contact@knyxsports.com",
          sitePhone: data.settings?.sitePhone || "",
          instagramUrl: data.settings?.instagramUrl || "https://www.instagram.com/knyxsports/",
          facebookUrl: data.settings?.facebookUrl || "",
          twitterUrl: data.settings?.twitterUrl || "",
          linkedinUrl: data.settings?.linkedinUrl || "",
          youtubeUrl: data.settings?.youtubeUrl || ""
        });
        
        // Hydrate from DB or fallback
        if (data.settings?.content) {
          if (data.settings.content.featurePopupGlobal !== undefined) {
            setFeaturePopupGlobal(data.settings.content.featurePopupGlobal);
          }
          if (data.settings.content.showDocsMenu !== undefined) {
            setShowDocsMenu(data.settings.content.showDocsMenu);
          }
          if (data.settings.content.features) {
            // Merge to ensure no missing keys if new features are added statically in products.js
            setFeatures({
              ...DEFAULT_FEATURES,
              ...data.settings.content.features
            });
          }
        }
      }
    } catch (err) {
      setMessage({ text: "Failed to load settings", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureFieldChange = (featureId, field, nestedField, value) => {
    setFeatures(prev => {
      const f = prev[featureId] || DEFAULT_FEATURES[featureId];
      if (nestedField) {
        return {
          ...prev,
          [featureId]: {
            ...f,
            [field]: {
              ...f[field],
              [nestedField]: value
            }
          }
        };
      } else {
        return {
          ...prev,
          [featureId]: {
            ...f,
            [field]: value
          }
        };
      }
    });
  };

  const addHighlight = (featureId) => {
    if (!newHighlight.trim()) return;
    setFeatures(prev => {
      const f = prev[featureId] || DEFAULT_FEATURES[featureId];
      const highlights = [...(f.detail?.highlights || [])];
      highlights.push(newHighlight.trim());
      return {
        ...prev,
        [featureId]: {
          ...f,
          detail: { ...f.detail, highlights }
        }
      };
    });
    setNewHighlight("");
  };

  const addSpec = (featureId) => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setFeatures(prev => {
      const f = prev[featureId] || DEFAULT_FEATURES[featureId];
      const specs = { ...(f.detail?.specs || {}) };
      specs[newSpecKey.trim()] = newSpecVal.trim();
      return {
        ...prev,
        [featureId]: {
          ...f,
          detail: { ...f.detail, specs }
        }
      };
    });
    setNewSpecKey("");
    setNewSpecVal("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      setSaving(true);
      const payload = {
        ...formData,
        content: {
          features: features,
          featurePopupGlobal: featurePopupGlobal,
          showDocsMenu: showDocsMenu,
        }
      };
      
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Settings saved successfully", type: "success" });
        fetchSettings();
      } else {
        setMessage({ text: data.error || "Failed to save settings", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "An error occurred", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: "fa-gear" },
    { id: "contact", label: "Contact Info", icon: "fa-phone" },
    { id: "social", label: "Social Media", icon: "fa-share-nodes" },
    { id: "features", label: "Key Features", icon: "fa-microchip" }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.4s ease-out both" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Site Settings</h1>
        <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Configure global site settings and branding options.</p>
      </div>

      {/* Message */}
      {message.text && (
        <div style={{
          padding: "16px",
          borderRadius: "12px",
          background: message.type === "success" ? "#ecfdf5" : "#fef2f2",
          color: message.type === "success" ? "#047857" : "#dc2626",
          fontSize: "14px",
          border: `1px solid ${message.type === "success" ? "#d1fae5" : "#fee2e2"}`
        }}>
          <i className={`fa-solid ${message.type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}`}></i> {message.text}
        </div>
      )}

      {/* Settings Container */}
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
        overflow: "hidden"
      }}>
        {/* Tabs */}
        <div style={{
          display: "flex",
          borderBottom: "1px solid #f1f5f9",
          backgroundColor: "#f9fafb"
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "16px",
                background: activeTab === tab.id ? "#fff" : "transparent",
                border: activeTab === tab.id ? "2px solid #3257ff" : "none",
                borderBottom: activeTab === tab.id ? "-2px solid #3257ff" : "1px solid transparent",
                color: activeTab === tab.id ? "#3257ff" : "#64748b",
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <i className={`fa-solid ${tab.icon}`}></i> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ padding: "32px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
              <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "24px", marginBottom: "12px" }}></i>
              <p>Loading settings...</p>
            </div>
          ) : (
            <form onSubmit={handleSave}>
              {/* General Tab */}
              {activeTab === "general" && (
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px", color: "#1e293b" }}>
                    Brand & Logo
                  </h3>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                      Logo URL
                    </label>
                    <input
                      type="text"
                      name="logoPath"
                      value={formData.logoPath}
                      onChange={handleChange}
                      placeholder="https://example.com/logo.png"
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        fontFamily: "inherit",
                        boxSizing: "border-box"
                      }}
                    />
                    <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
                      Use absolute URLs for the logo image
                    </p>
                  </div>

                  {formData.logoPath && (
                    <div style={{ marginBottom: "24px", padding: "16px", background: "#f9fafb", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>Logo Preview:</p>
                      <img
                        src={formData.logoPath}
                        alt="Logo"
                        style={{ maxHeight: "80px", maxWidth: "300px" }}
                      />
                    </div>
                  )}

                  {/* Navigation Visibility */}
                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "20px", marginTop: "8px" }}>
                    <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1e293b", marginBottom: "14px" }}>Navigation Visibility</h3>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <div>
                        <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: "0 0 3px 0" }}>Show Documents in Site Navigation</h4>
                        <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>Adds a "Documents" link to the main menu. Toggle OFF to hide it from the public site.</p>
                      </div>
                      <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px", flexShrink: 0 }}>
                        <input
                          type="checkbox"
                          checked={showDocsMenu}
                          onChange={(e) => setShowDocsMenu(e.target.checked)}
                          style={{ opacity: 0, width: 0, height: 0 }}
                        />
                        <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: showDocsMenu ? "#3257ff" : "#cbd5e1", transition: ".3s", borderRadius: "24px" }}></span>
                        <span style={{ position: "absolute", cursor: "pointer", top: "3px", left: showDocsMenu ? "23px" : "3px", width: "18px", height: "18px", backgroundColor: "white", transition: ".3s", borderRadius: "50%", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Info Tab */}
              {activeTab === "contact" && (
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px", color: "#1e293b" }}>
                    Contact Information
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        name="siteEmail"
                        value={formData.siteEmail}
                        onChange={handleChange}
                        placeholder="contact@example.com"
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="sitePhone"
                        value={formData.sitePhone}
                        onChange={handleChange}
                        placeholder="+44 20 7946 0958"
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Social Media Tab */}
              {activeTab === "social" && (
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px", color: "#1e293b" }}>
                    Social Media Links
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                        <i className="fa-brands fa-instagram" style={{ marginRight: "8px", color: "#e1306c" }}></i>
                        Instagram
                      </label>
                      <input
                        type="url"
                        name="instagramUrl"
                        value={formData.instagramUrl}
                        onChange={handleChange}
                        placeholder="https://instagram.com/yourprofile"
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                        <i className="fa-brands fa-facebook" style={{ marginRight: "8px", color: "#1877f2" }}></i>
                        Facebook
                      </label>
                      <input
                        type="url"
                        name="facebookUrl"
                        value={formData.facebookUrl}
                        onChange={handleChange}
                        placeholder="https://facebook.com/yourpage"
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                        <i className="fa-brands fa-twitter" style={{ marginRight: "8px", color: "#000" }}></i>
                        Twitter
                      </label>
                      <input
                        type="url"
                        name="twitterUrl"
                        value={formData.twitterUrl}
                        onChange={handleChange}
                        placeholder="https://twitter.com/yourprofile"
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>

                     <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                        <i className="fa-brands fa-linkedin" style={{ marginRight: "8px", color: "#0a66c2" }}></i>
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/company/yourcompany"
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                        <i className="fa-brands fa-youtube" style={{ marginRight: "8px", color: "#ff0000" }}></i>
                        YouTube
                      </label>
                      <input
                        type="url"
                        name="youtubeUrl"
                        value={formData.youtubeUrl}
                        onChange={handleChange}
                        placeholder="https://youtube.com/@yourchannel"
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #e2e8f0",
                          borderRadius: "10px",
                          fontSize: "14px",
                          fontFamily: "inherit",
                          boxSizing: "border-box"
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Key Features Tab */}
              {activeTab === "features" && (
                <div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "#1e293b" }}>
                    Dynamic Key Features Editor
                  </h3>
                  <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "24px" }}>
                    Configure the detailed descriptions, icons, headlines, and specifications for each product feature.
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", padding: "16px", borderRadius: "12px", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
                    <div>
                      <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>Global Popup Visibility</h4>
                      <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Enable or disable feature detail popups across the entire website.</p>
                    </div>
                    <label style={{ position: "relative", display: "inline-block", width: "44px", height: "24px" }}>
                      <input type="checkbox" checked={featurePopupGlobal} onChange={(e) => setFeaturePopupGlobal(e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: featurePopupGlobal ? "#3257ff" : "#cbd5e1", transition: ".4s", borderRadius: "24px" }}></span>
                      <span style={{ position: "absolute", cursor: "pointer", top: "2px", left: featurePopupGlobal ? "22px" : "2px", width: "20px", height: "20px", backgroundColor: "white", transition: ".4s", borderRadius: "50%" }}></span>
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: "24px", minHeight: "450px" }}>
                    {/* Left Pane: Features List */}
                    <div style={{ width: "240px", display: "flex", flexDirection: "column", gap: "4px", borderRight: "1px solid #e2e8f0", paddingRight: "16px", flexShrink: 0 }}>
                      <p style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px 0" }}>Select Feature</p>
                      {Object.keys(features).map((fid, idx) => {
                        const isSelected = selectedFeatureId === fid;
                        const f = features[fid];
                        const iconSrc = f.iconImg ? `/assets/img/brands/${f.iconImg}` : null;
                        return (
                          <button
                            key={fid}
                            type="button"
                            onClick={() => setSelectedFeatureId(fid)}
                            style={{
                              padding: "10px 12px",
                              borderRadius: "10px",
                              border: isSelected ? "1px solid #3257ff" : "1px solid transparent",
                              background: isSelected ? "linear-gradient(135deg, #eef1ff 0%, #f0f4ff 100%)" : "transparent",
                              color: isSelected ? "#3257ff" : "#475569",
                              fontWeight: isSelected ? 700 : 500,
                              fontSize: "12px",
                              textAlign: "left",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              transition: "all 0.2s",
                              width: "100%",
                              boxSizing: "border-box"
                            }}
                          >
                            {/* Icon Badge */}
                            <div style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              background: isSelected ? "#3257ff" : "#f1f5f9",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              transition: "all 0.2s"
                            }}>
                              {iconSrc ? (
                                <img
                                  src={iconSrc}
                                  alt={f.title}
                                  style={{
                                    width: "18px",
                                    height: "18px",
                                    objectFit: "contain",
                                    filter: isSelected ? "invert(1) brightness(2)" : "invert(0.4)"
                                  }}
                                />
                              ) : (
                                <span style={{ fontSize: "11px", fontWeight: 700, color: isSelected ? "#fff" : "#94a3b8" }}>
                                  {(idx + 1).toString().padStart(2, "0")}
                                </span>
                              )}
                            </div>
                            {/* Title */}
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, fontSize: "12px" }}>
                              {f.title || fid}
                            </span>
                            {isSelected && (
                              <i className="fa-solid fa-chevron-right" style={{ fontSize: "10px", color: "#3257ff", flexShrink: 0 }}></i>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Pane: Editor Form */}
                    {selectedFeatureId && features[selectedFeatureId] && (() => {
                      const f = features[selectedFeatureId];
                      return (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "20px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>Feature Title</label>
                              <input
                                type="text"
                                value={f.title || ""}
                                onChange={(e) => handleFeatureFieldChange(selectedFeatureId, "title", null, e.target.value)}
                                style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#334155", boxSizing: "border-box" }}
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>Short Description (on Grid Card)</label>
                              <input
                                type="text"
                                value={f.desc || ""}
                                onChange={(e) => handleFeatureFieldChange(selectedFeatureId, "desc", null, e.target.value)}
                                style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#334155", boxSizing: "border-box" }}
                              />
                            </div>
                          </div>

                          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", marginBottom: "12px" }}>Modal Popup Details</h4>
                            
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
                              <div>
                                <h4 style={{ fontSize: "13px", fontWeight: 600, color: "#1e293b", margin: "0 0 2px 0" }}>Enable Popup for this Feature</h4>
                                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>If disabled, clicking this feature on the product page will not open a popup.</p>
                              </div>
                              <label style={{ position: "relative", display: "inline-block", width: "36px", height: "20px" }}>
                                <input type="checkbox" checked={f.disablePopup !== true} onChange={(e) => handleFeatureFieldChange(selectedFeatureId, "disablePopup", null, !e.target.checked)} style={{ opacity: 0, width: 0, height: 0 }} />
                                <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: f.disablePopup !== true ? "#10b981" : "#cbd5e1", transition: ".4s", borderRadius: "20px" }}></span>
                                <span style={{ position: "absolute", cursor: "pointer", top: "2px", left: f.disablePopup !== true ? "18px" : "2px", width: "16px", height: "16px", backgroundColor: "white", transition: ".4s", borderRadius: "50%" }}></span>
                              </label>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                              <div style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>Modal Headline</label>
                                <input
                                  type="text"
                                  value={f.detail?.headline || ""}
                                  onChange={(e) => handleFeatureFieldChange(selectedFeatureId, "detail", "headline", e.target.value)}
                                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#334155", boxSizing: "border-box" }}
                                />
                              </div>
                              <div>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>Modal Intro Text</label>
                                <textarea
                                  value={f.detail?.intro || ""}
                                  onChange={(e) => handleFeatureFieldChange(selectedFeatureId, "detail", "intro", e.target.value)}
                                  rows={3}
                                  style={{ width: "100%", padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#334155", fontFamily: "inherit", boxSizing: "border-box" }}
                                />
                              </div>

                              {/* Feature Image Upload */}
                              <div>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>Feature Image (optional)</label>
                                <p style={{ fontSize: "11px", color: "#94a3b8", marginBottom: "10px" }}>Displayed inside the popup below the intro text. Supports JPG, PNG, WebP.</p>
                                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start", flexWrap: "wrap" }}>
                                  {f.detail?.image && (
                                    <div style={{ position: "relative", flexShrink: 0 }}>
                                      <img
                                        src={f.detail.image}
                                        alt="Feature"
                                        style={{ width: "120px", height: "80px", objectFit: "contain", borderRadius: "8px", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}
                                      />
                                      <button
                                        type="button"
                                        onClick={() => handleFeatureFieldChange(selectedFeatureId, "detail", "image", "")}
                                        style={{ position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", cursor: "pointer", fontSize: "11px", display: "flex", alignItems: "center", justifyContent: "center" }}
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  )}
                                  <label
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: "6px",
                                      width: "120px",
                                      height: "80px",
                                      border: "2px dashed #e2e8f0",
                                      borderRadius: "8px",
                                      cursor: "pointer",
                                      background: "#f8fafc",
                                      fontSize: "11px",
                                      color: "#94a3b8",
                                      flexShrink: 0,
                                      transition: "all 0.2s"
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3257ff"; e.currentTarget.style.color = "#3257ff"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#94a3b8"; }}
                                  >
                                    <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: "20px" }}></i>
                                    {featureImgUploading === selectedFeatureId ? "Uploading..." : "Upload Image"}
                                    <input
                                      type="file"
                                      accept="image/jpeg,image/png,image/webp,image/gif"
                                      style={{ display: "none" }}
                                      disabled={featureImgUploading === selectedFeatureId}
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setFeatureImgUploading(selectedFeatureId);
                                        try {
                                          const fd = new FormData();
                                          fd.append("file", file);
                                          const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
                                          const data = await res.json();
                                          if (data.success) {
                                            handleFeatureFieldChange(selectedFeatureId, "detail", "image", data.path);
                                          } else {
                                            alert("Upload failed: " + (data.error || "Unknown error"));
                                          }
                                        } catch (err) {
                                          alert("Upload error: " + err.message);
                                        } finally {
                                          setFeatureImgUploading(null);
                                          e.target.value = "";
                                        }
                                      }}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>


                          {/* Highlights List */}
                          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>Highlights Checklist</label>
                            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                              <input
                                type="text"
                                placeholder="Add key highlight point..."
                                value={newHighlight}
                                onChange={(e) => setNewHighlight(e.target.value)}
                                style={{ flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#334155", boxSizing: "border-box" }}
                                onKeyDown={(e) => { if(e.key === "Enter") { e.preventDefault(); addHighlight(selectedFeatureId); } }}
                              />
                              <button
                                type="button"
                                onClick={() => addHighlight(selectedFeatureId)}
                                style={{ padding: "8px 16px", background: "#3257ff", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
                              >
                                Add
                              </button>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                              {(f.detail?.highlights || []).map((h, idx) => (
                                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f1f5f9", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", color: "#334155" }}>
                                  <span>{h}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const highlights = (f.detail?.highlights || []).filter((_, i) => i !== idx);
                                      handleFeatureFieldChange(selectedFeatureId, "detail", "highlights", highlights);
                                    }}
                                    style={{ background: "none", border: "none", color: "#ef4444", fontWeight: "bold", cursor: "pointer", padding: "0 2px" }}
                                  >
                                    &times;
                                  </button>
                                </div>
                              ))}
                              {(f.detail?.highlights || []).length === 0 && (
                                <span style={{ fontSize: "12px", color: "#94a3b8", fontStyle: "italic" }}>No highlight points added yet.</span>
                              )}
                            </div>
                          </div>

                          {/* Specs Table */}
                          <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: 600, marginBottom: "6px", color: "#475569" }}>Specifications Table</label>
                            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                              <input
                                type="text"
                                placeholder="Key (e.g. Material)"
                                value={newSpecKey}
                                onChange={(e) => setNewSpecKey(e.target.value)}
                                style={{ flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#334155", boxSizing: "border-box" }}
                              />
                              <input
                                type="text"
                                placeholder="Value (e.g. Titanium)"
                                value={newSpecVal}
                                onChange={(e) => setNewSpecVal(e.target.value)}
                                style={{ flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "13px", color: "#334155", boxSizing: "border-box" }}
                                onKeyDown={(e) => { if(e.key === "Enter") { e.preventDefault(); addSpec(selectedFeatureId); } }}
                              />
                              <button
                                type="button"
                                onClick={() => addSpec(selectedFeatureId)}
                                style={{ padding: "8px 16px", background: "#3257ff", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer", fontSize: "13px" }}
                              >
                                Add
                              </button>
                            </div>
                            <div style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden" }}>
                              {Object.entries(f.detail?.specs || {}).map(([key, val]) => (
                                <div key={key} style={{ display: "flex", borderBottom: "1px solid #f1f5f9", background: "#fff", fontSize: "12px" }}>
                                  <div style={{ width: "150px", padding: "8px 12px", fontWeight: 600, color: "#475569", background: "#fafbff", borderRight: "1px solid #f1f5f9" }}>{key}</div>
                                  <div style={{ flex: 1, padding: "8px 12px", color: "#334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span>{val}</span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const specs = { ...(f.detail?.specs || {}) };
                                        delete specs[key];
                                        handleFeatureFieldChange(selectedFeatureId, "detail", "specs", specs);
                                      }}
                                      style={{ background: "none", border: "none", color: "#ef4444", fontWeight: "bold", cursor: "pointer" }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                              {Object.keys(f.detail?.specs || {}).length === 0 && (
                                <div style={{ padding: "12px", textAlign: "center", color: "#94a3b8", fontStyle: "italic", fontSize: "12px" }}>No specifications entered.</div>
                              )}
                            </div>
                          </div>

                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    padding: "12px 32px",
                    background: saving ? "#cbd5e1" : "#3257ff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: saving ? "not-allowed" : "pointer",
                    fontWeight: 700,
                    fontSize: "14px",
                    boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)"
                  }}
                >
                  {saving ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: "8px" }}></i>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk" style={{ marginRight: "8px" }}></i>
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
