"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/products"); 
        const data = await res.json();
        if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (err) { console.error("Fetch categories failed", err); }
      finally { setLoading(false); }
    };
    fetchCategories();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.4s ease-out both" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Groups</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Organize and filter your hardware modules by classification.</p>
        </div>
        <button style={{ padding: "14px 24px", background: "#3257ff", border: "none", borderRadius: "14px", color: "#ffffff", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)" }}>
          <i className="fa-solid fa-plus"></i> New Category
        </button>
      </div>

      <div style={{ background: "#ffffff", border: "1px solid #f1f5f9", borderRadius: "20px", padding: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.03)" }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>
             <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: "24px", marginBottom: "15px", color: "#3257ff" }}></i>
             <p>Indexing archives...</p>
          </div>
        ) : categories.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>
             <i className="fa-solid fa-folder-open" style={{ fontSize: "32px", marginBottom: "15px", opacity: 0.2 }}></i>
             <p>No categories defined yet.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 8px", textAlign: "left" }}>
            <thead>
              <tr>
                <th style={{ padding: "15px", color: "#94a3b8", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>Label</th>
                <th style={{ padding: "15px", color: "#94a3b8", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>Reference Slug</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td style={{ padding: "18px 15px", background: "#f8faff", borderRadius: "12px 0 0 12px", fontSize: "14px", fontWeight: 700, color: "#1e293b" }}>{c.name}</td>
                  <td style={{ padding: "18px 15px", background: "#f8faff", borderRadius: "0 12px 12px 0", fontSize: "13px", color: "#3257ff", fontWeight: 600 }}>{c.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{` @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } } `}</style>
    </div>
  );
}
