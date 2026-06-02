"use client";
import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

export default function DocsManager() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [activeQR, setActiveQR] = useState(null); // { doc, qrDataUrl }
  const [confirmDelete, setConfirmDelete] = useState(null); // doc to delete

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/docs");
      const data = await res.json();
      if (data.success) {
        setDocuments(data.documents);
      } else {
        setMessage({ text: data.error || "Failed to load documents", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Network error loading documents", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setMessage({ text: "", type: "" });
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/docs", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ text: `"${data.document.name}" uploaded successfully!`, type: "success" });
        fetchDocuments();
      } else {
        setMessage({ text: data.error || "Upload failed", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Upload failed due to network error", type: "error" });
    } finally {
      setUploading(false);
      // Reset file input
      e.target.value = null;
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/docs/${confirmDelete.name}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ text: "Document deleted successfully", type: "success" });
        setDocuments(prev => prev.filter(doc => doc.name !== confirmDelete.name));
        setConfirmDelete(null);
      } else {
        setMessage({ text: data.error || "Delete failed", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Delete failed due to network error", type: "error" });
    }
  };

  const handleCopyLink = (url) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        setMessage({ text: "Link copied to clipboard!", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      })
      .catch(() => {
        setMessage({ text: "Failed to copy link", type: "error" });
      });
  };

  const handleGenerateQR = async (doc) => {
    const fullUrl = `${window.location.origin}${doc.url}`;
    try {
      const qrDataUrl = await QRCode.toDataURL(fullUrl, {
        width: 300,
        margin: 2,
        color: {
          dark: "#0f172a", // Navy/Slate
          light: "#ffffff",
        },
      });
      setActiveQR({ doc, qrDataUrl, fullUrl });
    } catch (err) {
      setMessage({ text: "Failed to generate QR Code", type: "error" });
    }
  };

  const formatSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileBadgeStyle = (type) => {
    if (type.includes("pdf")) return { bg: "#fef2f2", text: "#ef4444", label: "PDF" };
    if (type.includes("word") || type.includes("msword")) return { bg: "#eff6ff", text: "#3b82f6", label: "DOC" };
    if (type.includes("sheet") || type.includes("excel")) return { bg: "#f0fdf4", text: "#22c55e", label: "XLS" };
    if (type.includes("presentation") || type.includes("powerpoint")) return { bg: "#faf5ff", text: "#a855f7", label: "PPT" };
    if (type.startsWith("image/")) return { bg: "#ecfeff", text: "#06b6d4", label: "IMG" };
    if (type.startsWith("video/")) return { bg: "#fff7ed", text: "#f97316", label: "VID" };
    if (type.includes("zip")) return { bg: "#fff1f2", text: "#f43f5e", label: "ZIP" };
    return { bg: "#f8fafc", text: "#64748b", label: "FILE" };
  };

  const getFileIcon = (type) => {
    if (type.includes("pdf")) return "fa-file-pdf";
    if (type.includes("word") || type.includes("msword")) return "fa-file-word";
    if (type.includes("sheet") || type.includes("excel")) return "fa-file-excel";
    if (type.includes("presentation") || type.includes("powerpoint")) return "fa-file-powerpoint";
    if (type.startsWith("image/")) return "fa-file-image";
    if (type.startsWith("video/")) return "fa-file-video";
    if (type.includes("zip")) return "fa-file-zipper";
    return "fa-file";
  };

  const filteredDocs = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.4s ease-out both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Docs Manager</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Upload, organize, share, and generate QR codes for your documents.</p>
        </div>

        {/* Upload Button */}
        <div>
          <label
            style={{
              padding: "12px 24px",
              background: uploading ? "#cbd5e1" : "#3257ff",
              color: "#fff",
              borderRadius: "12px",
              cursor: uploading ? "not-allowed" : "pointer",
              fontWeight: 700,
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)",
              transition: "all 0.3s ease"
            }}
          >
            {uploading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                Uploading...
              </>
            ) : (
              <>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                Upload Document
              </>
            )}
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.gif,.webp,.svg,.txt,.csv,.mp4,.zip"
            />
          </label>
        </div>
      </div>

      {/* Message Indicator */}
      {message.text && (
        <div style={{
          padding: "16px",
          borderRadius: "12px",
          background: message.type === "success" ? "#ecfdf5" : "#fef2f2",
          color: message.type === "success" ? "#047857" : "#dc2626",
          fontSize: "14px",
          border: `1px solid ${message.type === "success" ? "#d1fae5" : "#fee2e2"}`,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          transition: "all 0.3s ease"
        }}>
          <i className={`fa-solid ${message.type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}`} style={{ fontSize: "16px" }}></i>
          <span>{message.text}</span>
        </div>
      )}

      {/* Filters and Search */}
      <div style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
          <i className="fa-solid fa-magnifying-glass" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}></i>
          <input
            type="text"
            placeholder="Search documents by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 12px 12px 42px",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.3s ease",
              boxSizing: "border-box"
            }}
          />
        </div>
      </div>

      {/* Documents List */}
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
        overflow: "hidden"
      }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "28px", marginBottom: "16px", color: "#3257ff" }}></i>
            <p style={{ fontWeight: 500 }}>Scanning documents folder...</p>
          </div>
        ) : filteredDocs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 40px", color: "#64748b" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: "24px", color: "#94a3b8" }}></i>
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: "0 0 4px 0" }}>No Documents Found</h3>
            <p style={{ fontSize: "14px", margin: 0 }}>
              {searchQuery ? "No matches found for your search query." : "Upload your first document to share and generate QR codes."}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "#f9fafb", borderBottom: "1px solid #f1f5f9" }}>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>Document Info</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>Type</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>File Size</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>Upload Date</th>
                  <th style={{ padding: "16px 24px", fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((doc) => {
                  const badge = getFileBadgeStyle(doc.type);
                  return (
                    <tr key={doc.name} style={{ borderBottom: "1px solid #f1f5f9", transition: "all 0.2s ease" }}>
                      {/* Info & Name */}
                      <td style={{ padding: "18px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "10px",
                            background: badge.bg,
                            color: badge.text,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "18px"
                          }}>
                            <i className={`fa-solid ${getFileIcon(doc.type)}`}></i>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px", maxWidth: "320px" }}>
                            <a
                              href={doc.url}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                fontSize: "14px",
                                fontWeight: 700,
                                color: "#1e293b",
                                textDecoration: "none",
                                wordBreak: "break-all",
                                transition: "color 0.2s ease"
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = "#3257ff"}
                              onMouseLeave={(e) => e.currentTarget.style.color = "#1e293b"}
                            >
                              {doc.name}
                            </a>
                            <span style={{ fontSize: "11px", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                              <i className="fa-solid fa-link"></i> {doc.url}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Type Badge */}
                      <td style={{ padding: "18px 24px" }}>
                        <span style={{
                          padding: "4px 8px",
                          borderRadius: "6px",
                          background: badge.bg,
                          color: badge.text,
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.5px"
                        }}>
                          {badge.label}
                        </span>
                      </td>

                      {/* Size */}
                      <td style={{ padding: "18px 24px", fontSize: "13px", fontWeight: 500, color: "#334155" }}>
                        {formatSize(doc.size)}
                      </td>

                      {/* Date */}
                      <td style={{ padding: "18px 24px", fontSize: "13px", color: "#64748b" }}>
                        {formatDate(doc.uploadDate)}
                      </td>

                      {/* Action Buttons */}
                      <td style={{ padding: "18px 24px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "8px" }}>
                          {/* Copy Link */}
                          <button
                            onClick={() => handleCopyLink(doc.url)}
                            title="Copy Sharing Link"
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "8px",
                              border: "1px solid #e2e8f0",
                              background: "#fff",
                              color: "#64748b",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#3257ff";
                              e.currentTarget.style.color = "#3257ff";
                              e.currentTarget.style.background = "#f0f3ff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#e2e8f0";
                              e.currentTarget.style.color = "#64748b";
                              e.currentTarget.style.background = "#fff";
                            }}
                          >
                            <i className="fa-solid fa-copy"></i>
                          </button>

                          {/* Generate QR */}
                          <button
                            onClick={() => handleGenerateQR(doc)}
                            title="Generate QR Code"
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "8px",
                              border: "1px solid #e2e8f0",
                              background: "#fff",
                              color: "#64748b",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#3257ff";
                              e.currentTarget.style.color = "#3257ff";
                              e.currentTarget.style.background = "#f0f3ff";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#e2e8f0";
                              e.currentTarget.style.color = "#64748b";
                              e.currentTarget.style.background = "#fff";
                            }}
                          >
                            <i className="fa-solid fa-qrcode"></i>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => setConfirmDelete(doc)}
                            title="Delete Document"
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "8px",
                              border: "1px solid #fecaca",
                              background: "#fff",
                              color: "#ef4444",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.2s"
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "#ef4444";
                              e.currentTarget.style.background = "#fef2f2";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "#fecaca";
                              e.currentTarget.style.background = "#fff";
                            }}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 📱 QR CODE MODAL OVERLAY */}
      {activeQR && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100
        }}>
          <div style={{
            width: "380px",
            background: "#ffffff",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            border: "1px solid #fff",
            textAlign: "center",
            position: "relative",
            animation: "modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            {/* Close Button */}
            <button
              onClick={() => setActiveQR(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                border: "none",
                background: "#f1f5f9",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                cursor: "pointer",
                color: "#64748b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: "0 0 4px 0" }}>Document QR Code</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 20px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {activeQR.doc.name}
            </p>

            {/* QR Code Frame */}
            <div style={{
              background: "#f8fafc",
              padding: "16px",
              borderRadius: "16px",
              display: "inline-block",
              border: "1px solid #f1f5f9",
              marginBottom: "20px"
            }}>
              <img
                src={activeQR.qrDataUrl}
                alt="QR Code"
                style={{ width: "200px", height: "200px", display: "block" }}
              />
            </div>

            {/* Link Preview box */}
            <div style={{
              background: "#f8fafc",
              padding: "12px",
              borderRadius: "10px",
              fontSize: "12px",
              color: "#3257ff",
              border: "1px dashed rgba(50, 87, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
              wordBreak: "break-all",
              textAlign: "left"
            }}>
              <span style={{ maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis" }}>
                {activeQR.fullUrl}
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeQR.fullUrl);
                  setMessage({ text: "URL copied to clipboard!", type: "success" });
                  setTimeout(() => setMessage({ text: "", type: "" }), 3000);
                }}
                style={{ background: "transparent", color: "#3257ff", border: "none", cursor: "pointer", fontSize: "14px" }}
              >
                <i className="fa-solid fa-copy"></i>
              </button>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setActiveQR(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f1f5f9",
                  borderRadius: "12px",
                  color: "#64748b",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px"
                }}
              >
                Close
              </button>
              <a
                href={activeQR.qrDataUrl}
                download={`${activeQR.doc.name}-qr.png`}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#3257ff",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontWeight: 700,
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  display: "inline-block",
                  boxShadow: "0 4px 12px rgba(50, 87, 255, 0.2)"
                }}
              >
                <i className="fa-solid fa-download" style={{ marginRight: "6px" }}></i>
                Download QR
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ DELETE CONFIRMATION MODAL */}
      {confirmDelete && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100
        }}>
          <div style={{
            width: "400px",
            background: "#ffffff",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
            border: "1px solid #fff",
            textAlign: "center",
            animation: "modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#fef2f2",
              color: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              margin: "0 auto 20px auto"
            }}>
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e293b", margin: "0 0 8px 0" }}>Delete Document?</h3>
            <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px 0", lineHeight: "1.5" }}>
              Are you sure you want to permanently delete <strong>{confirmDelete.name}</strong>? This file will be removed from the server immediately.
            </p>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => setConfirmDelete(null)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f1f5f9",
                  borderRadius: "12px",
                  color: "#64748b",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#ef4444",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "13px",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)"
                }}
              >
                Delete File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Modal Keyframes */}
      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
