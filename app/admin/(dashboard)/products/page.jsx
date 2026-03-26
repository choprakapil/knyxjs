"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal / Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", categoryId: "", description: "", image: "" });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setCategories(data.categories || []);
      }
    } catch (err) { console.error("Fetch products failed:", err); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Product added successfully!", type: "success" });
        setFormData({ name: "", categoryId: "", description: "", image: "" });
        setTimeout(() => { setIsModalOpen(false); fetchProducts(); }, 1500);
      } else {
        setMessage({ text: data.error || "Failed to add", type: "error" });
      }
    } catch (err) { setMessage({ text: "Submission failed", type: "error" }); }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

      {/* 1. Page Header with CTA */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", margin: 0 }}>Products</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "4px" }}>Manage and review your live KNYX catalog listings.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ padding: "12px 20px", background: "linear-gradient(135deg, #1B3B8A 0%, #001A3D 100%)", border: "none", borderRadius: "12px", color: "#ffffff", fontWeight: 700, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 15px rgba(27, 59, 138, 0.2)" }}
        >
          <i className="fa-solid fa-plus" style={{ color: "#ffffff" }}></i> Add Product
        </button>
      </div>

      {/* 2. Products Table Container */}
      <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.03)", borderRadius: "16px", padding: "20px", overflowX: "auto" }}>
        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>Loading inventory...</div>
        ) : products.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>No products found. Start by creating one!</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <th style={{ padding: "14px", color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Name</th>
                <th style={{ padding: "14px", color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Category</th>
                <th style={{ padding: "14px", color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Slug</th>
                <th style={{ padding: "14px", color: "rgba(255,255,255,0.4)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase" }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)", transition: "background 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.02)"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px", fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>{p.name}</td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "#1B3B8A" }}>{p.category?.name || "Uncategorized"}</td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{p.slug}</td>
                  <td style={{ padding: "14px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🔐 ADD PRODUCT MODAL OVERLAY */}
      {isModalOpen && (
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ width: "450px", background: "#0a0c10", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "30px", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px", color: "#ffffff" }}>Create New Product</h3>

            {message.text && (
              <div style={{ padding: "10px", background: message.type === "success" ? "rgba(40, 167, 69, 0.1)" : "rgba(220, 53, 69, 0.1)", border: `1px solid ${message.type === "success" ? "#28a745" : "#dc3545"}`, borderRadius: "8px", fontSize: "13px", color: message.type === "success" ? "#28a745" : "#ff6b6b", marginBottom: "15px", textAlign: "center" }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "6px" }}>Product Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#ffffff", outline: "none" }} />
              </div>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "6px" }}>Category</label>
                <select value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} required style={{ width: "100%", padding: "12px", background: "#10141d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#ffffff", outline: "none", cursor: "pointer" }}>
                  <option value="">Select a category</option>
                  {categories.map((cat) => <option style={{ background: "#0c0f17" }} key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "6px" }}>Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", color: "#ffffff", outline: "none", resize: "none" }} />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>Cancel</button>
                <button type="submit" style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #1B3B8A 0%, #001A3D 100%)", border: "none", borderRadius: "10px", color: "#ffffff", fontWeight: 700, cursor: "pointer" }}>Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
