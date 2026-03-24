"use client";

import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.success && Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = editingId ? `/api/categories/${editingId}` : "/api/categories";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setName("");
      setSlug("");
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setSlug(category.slug);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      fetchCategories();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Categories Management</h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "30px" }}>
        {/* Form to Add/Edit */}
        <div style={{ background: "#141416", padding: "20px", borderRadius: "8px" }}>
          <h3 style={{ marginBottom: "20px" }}>{editingId ? "Edit Category" : "Add Category"}</h3>
          {error && <p style={{ color: "#ff4d4d", fontSize: "0.85rem", marginBottom: "15px" }}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Slug (Optional)</label>
              <input 
                type="text" 
                className="form-control" 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} 
                placeholder="Auto-generated if left empty"
              />
            </div>

            <button type="submit" className="admin-btn">
              {editingId ? "Update Category" : "Create Category"}
            </button>
            {editingId && (
              <button 
                type="button" 
                className="admin-btn btn-danger" 
                style={{ marginLeft: "10px" }} 
                onClick={() => { setEditingId(null); setName(""); setSlug(""); }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Table list */}
        <div>
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Products</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.id}</td>
                    <td>{cat.name}</td>
                    <td>{cat.slug}</td>
                    <td>{cat._count?.products || 0}</td>
                    <td className="action-container">
                      <button className="admin-btn btn-sm" onClick={() => handleEdit(cat)}>Edit</button>
                      <button className="admin-btn btn-sm btn-danger" onClick={() => handleDelete(cat.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
