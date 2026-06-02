"use client";
import React, { useState, useEffect } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (err) {
      setMessage({ text: "Failed to load categories", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingCategory(null);
    setFormData({ name: "" });
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { value } = e.target;
    setFormData({ name: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!formData.name.trim()) {
      setMessage({ text: "Category name is required", type: "error" });
      return;
    }

    try {
      if (editingCategory) {
        const res = await fetch("/api/admin/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingCategory.id, name: formData.name })
        });

        const data = await res.json();
        if (data.success) {
          setMessage({ text: "Category updated successfully", type: "success" });
          fetchCategories();
          setShowForm(false);
        } else {
          setMessage({ text: data.error || "Failed to update category", type: "error" });
        }
      } else {
        const res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: formData.name })
        });

        const data = await res.json();
        if (data.success) {
          setMessage({ text: "Category created successfully", type: "success" });
          fetchCategories();
          setShowForm(false);
        } else {
          setMessage({ text: data.error || "Failed to create category", type: "error" });
        }
      }
    } catch (err) {
      setMessage({ text: "An error occurred", type: "error" });
    }
  };

  const handleDelete = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${categoryId}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Category deleted successfully", type: "success" });
        fetchCategories();
      } else {
        setMessage({ text: data.error || "Failed to delete category", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Failed to delete category", type: "error" });
    }
  };

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.4s ease-out both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Product Categories</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Organize your product catalog by classification.</p>
        </div>
        {!showForm && (
          <button
            onClick={handleAddNew}
            style={{
              padding: "12px 24px",
              background: "#3257ff",
              border: "none",
              borderRadius: "12px",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)"
            }}
          >
            <i className="fa-solid fa-plus"></i> New Category
          </button>
        )}
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

      {/* Form */}
      {showForm && (
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f1f5f9",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "20px", color: "#1e293b" }}>
            {editingCategory ? "Edit Category" : "Create New Category"}
          </h2>

          <form onSubmit={handleSave}>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                Category Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="e.g., Helmets, Accessories, etc."
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  boxSizing: "border-box"
                }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "12px 24px",
                  background: "#e2e8f0",
                  color: "#1e293b",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px"
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "12px 24px",
                  background: "#3257ff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                  boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)"
                }}
              >
                {editingCategory ? "Update Category" : "Create Category"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      {!showForm && (
        <div style={{
          background: "#ffffff",
          border: "1px solid #f1f5f9",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                maxWidth: "400px",
                padding: "12px 16px",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                fontSize: "14px",
                fontFamily: "inherit"
              }}
            />
          </div>

          {loading ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>
              <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: "24px", marginBottom: "15px", color: "#3257ff" }}></i>
              <p>Loading categories...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>
              <i className="fa-solid fa-folder-open" style={{ fontSize: "32px", marginBottom: "15px", opacity: 0.2 }}></i>
              <p>{searchTerm ? "No categories found." : "No categories defined yet."}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  style={{
                    padding: "20px",
                    background: "#f9fafb",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f1f5f9";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: 0 }}>{category.name}</h3>
                      <p style={{ color: "#64748b", fontSize: "13px", margin: "4px 0 0 0" }}>
                        {category._count?.products || 0} products
                      </p>
                    </div>
                    <span style={{
                      display: "inline-block",
                      background: "#3257ff",
                      color: "#fff",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: 700
                    }}>
                      {category.slug}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleEdit(category)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        background: "#3257ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 600
                      }}
                    >
                      <i className="fa-solid fa-pen-to-square"></i> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: 600
                      }}
                    >
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
