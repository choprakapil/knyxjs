"use client";
import React, { useState, useEffect } from "react";

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeTab, setActiveTab] = useState("general");

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

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      setSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
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
    { id: "social", label: "Social Media", icon: "fa-share-nodes" }
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
