"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "", slug: "", description: "", image: "", categoryId: "", specs: "{}"
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.success && Array.isArray(data.data) ? data.data : []);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data.success && Array.isArray(data.data) ? data.data : []);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate specs JSON
    let parsedSpecs = null;
    try {
      if (form.specs.trim()) {
        parsedSpecs = JSON.parse(form.specs);
      }
    } catch (err) {
      setError("Specs must be a valid JSON string!");
      return;
    }

    const payload = {
      ...form,
      specs: parsedSpecs
    };

    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setForm({ name: "", slug: "", description: "", image: "", categoryId: "", specs: "{}" });
      setEditingId(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description,
      image: product.image || "",
      categoryId: product.categoryId.toString(),
      specs: JSON.stringify(product.specs || {}, null, 2)
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      fetchProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="admin-header">
        <h2>Products Management</h2>
        <button className="admin-btn" onClick={() => { setShowForm(!showForm); setEditingId(null); }}>
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {showForm && (
        <div style={{ background: "#141416", padding: "30px", borderRadius: "8px", marginBottom: "40px", border: "1px solid #232326" }}>
          <h3>{editingId ? "Edit Product" : "Add Product"}</h3>
          {error && <p style={{ color: "#ff4d4d", marginBottom: "20px" }}>{error}</p>}
          
          <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control" value={form.name} onChange={handleInputChange} required />

              <label className="form-label">Slug (Optional)</label>
              <input type="text" name="slug" className="form-control" value={form.slug} onChange={handleInputChange} placeholder="Auto-generated" />

              <label className="form-label">Category</label>
              <select name="categoryId" className="form-control" value={form.categoryId} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <label className="form-label">Image URL</label>
              <input type="text" name="image" className="form-control" value={form.image} onChange={handleInputChange} />
            </div>

            <div>
              <label className="form-label">Description</label>
              <textarea name="description" className="form-control" style={{ height: "100px" }} value={form.description} onChange={handleInputChange} required></textarea>

              <label className="form-label">Specifications (JSON format)</label>
              <textarea name="specs" className="form-control" style={{ height: "110px", fontFamily: "monospace", fontSize: "0.85rem" }} value={form.specs} onChange={handleInputChange}></textarea>
            </div>

            <div style={{ gridColumn: "span 2" }}>
              <button type="submit" className="admin-btn">{editingId ? "Update Product" : "Create Product"}</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.slug}</td>
                <td>{prod.category?.name || "N/A"}</td>
                <td className="action-container">
                  <button className="admin-btn btn-sm" onClick={() => handleEdit(prod)}>Edit</button>
                  <button className="admin-btn btn-sm btn-danger" onClick={() => handleDelete(prod.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
