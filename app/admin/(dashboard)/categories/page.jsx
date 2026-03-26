"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/products"); // Reusing products endpoint to fetch categories
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
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.3s ease both" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", margin: 0 }}>Categories</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "4px" }}>Group and filter your catalog items.</p>
        </div>
        <button style={{ padding: "12px 20px", background: "linear-gradient(135deg, #1B3B8A 0%, #001A3D 100%)", border: "none", borderRadius: "12px", color: "#ffffff", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
          <i className="fa-solid fa-plus" style={{ color: "#ffffff" }}></i> Add Category
        </button>
      </div>

      <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.03)", borderRadius: "16px", padding: "20px" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Loading...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <th style={{ padding: "14px", color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Name</th>
                <th style={{ padding: "14px", color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Slug</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                  <td style={{ padding: "14px", fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>{c.name}</td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "#1B3B8A" }}>{c.slug}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{` @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } } `}</style>
    </div>
  );
}
