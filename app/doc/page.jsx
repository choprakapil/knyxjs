"use client";
import React, { useState, useEffect } from "react";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import Offcanvas from "@/components/layout/Offcanvas";

export default function DocumentPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/docs");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents || []);
      }
    } catch (err) {
      console.error("Failed to load documents:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFileIcon = (type) => {
    if (type.includes("pdf")) return { icon: "fa-file-pdf", color: "#FF4D4D" };
    if (type.includes("word") || type.includes("msword")) return { icon: "fa-file-word", color: "#3B82F6" };
    if (type.includes("sheet") || type.includes("excel")) return { icon: "fa-file-excel", color: "#10B981" };
    if (type.includes("presentation") || type.includes("powerpoint")) return { icon: "fa-file-powerpoint", color: "#A855F7" };
    if (type.startsWith("image/")) return { icon: "fa-file-image", color: "#06B6D4" };
    if (type.startsWith("video/")) return { icon: "fa-file-video", color: "#F97316" };
    if (type.includes("zip")) return { icon: "fa-file-zipper", color: "#EC4899" };
    return { icon: "fa-file", color: "#94A3B8" };
  };

  const filteredDocs = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#030303" }}>
      <div className="tp-hero-ai-body-overlay"></div>
      <BackToTop />
      <Offcanvas />
      <Header />
      <ClientRuntime />
      
      <main>
        <section className="tp-docs-section pt-120 pb-120" style={{ minHeight: "100vh" }}>
          <div className="container">
            
            {/* Section Header */}
            <div className="row mb-40">
              <div className="col-12">
                <h1 className="tp-ff-jakarta fw-600 fs-48 fs-md-36 tp-text-common-white mb-15">Official Documents</h1>
                <p className="tp-ff-dm fw-400 fs-18 tp-text-grey-2 max-w-600" style={{ maxWidth: "600px" }}>
                  Access and download compliance certificates, safety guidelines, and official user manuals for KNYX protective equipment.
                </p>
              </div>
            </div>

            {/* Search Filter Bar */}
            <div className="row mb-40">
              <div className="col-12 col-md-6 col-lg-4">
                <div style={{ position: "relative" }}>
                  <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}></i>
                  <input
                    type="text"
                    placeholder="Search documents by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "14px 16px 14px 44px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      outline: "none",
                      transition: "all 0.3s"
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#3257ff";
                      e.target.style.boxShadow = "0 0 15px rgba(50, 87, 255, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Document Content List */}
            <div className="row">
              <div className="col-12">
                {loading ? (
                  <div style={{ padding: "80px 0", textAlign: "center", color: "rgba(255,255,255,0.5)" }}>
                    <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "28px", color: "#3257ff", marginBottom: "15px" }}></i>
                    <p className="tp-ff-dm fs-16">Retrieving documents from repository...</p>
                  </div>
                ) : filteredDocs.length === 0 ? (
                  <div style={{
                    padding: "80px 40px",
                    background: "rgba(255, 255, 255, 0.01)",
                    border: "1px dashed rgba(255,255,255,0.06)",
                    borderRadius: "20px",
                    textAlign: "center",
                    color: "rgba(255,255,255,0.4)"
                  }}>
                    <i className="fa-solid fa-file-excel" style={{ fontSize: "40px", color: "rgba(255,255,255,0.15)", marginBottom: "15px" }}></i>
                    <h4 className="tp-ff-jakarta fw-600 tp-text-common-white fs-18 mb-2">No Documents Found</h4>
                    <p className="tp-ff-dm fs-14">
                      {searchQuery ? "Try refining your search terms." : "There are currently no files uploaded for download. Check back soon."}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                    {filteredDocs.map((doc) => {
                      const fileMeta = getFileIcon(doc.type);
                      return (
                        <div
                          key={doc.name}
                          className="doc-card"
                          style={{
                            background: "rgba(255, 255, 255, 0.02)",
                            backdropFilter: "blur(20px)",
                            borderRadius: "20px",
                            border: "1px solid rgba(255,255,255,0.05)",
                            padding: "24px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            gap: "20px",
                            transition: "all 0.3s ease",
                            position: "relative",
                            overflow: "hidden"
                          }}
                        >
                          {/* Card Content */}
                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                              <div style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "12px",
                                background: "rgba(255,255,255,0.03)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                color: fileMeta.color
                              }}>
                                <i className={`fa-solid ${fileMeta.icon}`}></i>
                              </div>
                              <span className="tp-ff-inter fw-600 text-uppercase" style={{ fontSize: "11px", color: fileMeta.color, letterSpacing: "1px" }}>
                                {doc.type.split("/")[1]?.toUpperCase() || "DOCUMENT"}
                              </span>
                            </div>
                            <h3 className="tp-ff-jakarta fw-600 fs-18 tp-text-common-white mb-10" style={{ wordBreak: "break-word", lineHeight: 1.4 }}>
                              {doc.name}
                            </h3>
                            <div className="d-flex gap-3 tp-ff-dm fs-13 tp-text-grey-2" style={{ opacity: 0.6 }}>
                              <span>{formatSize(doc.size)}</span>
                              <span>•</span>
                              <span>Uploaded {formatDate(doc.uploadDate)}</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <a
                            href={doc.url}
                            download={doc.name}
                            className="download-btn tp-ff-inter fw-600 fs-14 text-center py-3 px-4 rounded-3 d-flex align-items-center justify-content-center gap-2"
                            style={{
                              background: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.08)",
                              color: "#fff",
                              textDecoration: "none",
                              transition: "all 0.2s ease"
                            }}
                          >
                            <i className="fa-solid fa-arrow-down-to-line"></i> Download File
                          </a>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <LegacyScripts />

      <style jsx global>{`
        .doc-card:hover {
          border-color: rgba(50, 87, 255, 0.3) !important;
          box-shadow: 0 10px 30px rgba(50, 87, 255, 0.05);
          transform: translateY(-4px);
          background: rgba(255,255,255,0.03) !important;
        }
        .doc-card:hover .download-btn {
          background: #3257ff !important;
          border-color: #3257ff !important;
          box-shadow: 0 8px 20px rgba(50, 87, 255, 0.25);
        }
      `}</style>
    </div>
  );
}
