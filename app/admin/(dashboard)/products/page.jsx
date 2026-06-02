"use client";
import React, { useState, useEffect } from "react";

const ProductsCRUDPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("list"); // list, create, edit
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    image: "",
    specs: ""
  });

  // Fetch products and categories
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      
      if (data.success) {
        setProducts(data.products || []);
        setCategories(data.categories || []);
      }
    } catch (err) {
      setMessage({ text: "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setFormData({ name: "", categoryId: "", description: "", image: "", specs: "" });
    setActiveView("edit");
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      categoryId: product.categoryId.toString(),
      description: product.description,
      image: product.image || "",
      specs: JSON.stringify(product.specs || {})
    });
    setActiveView("edit");
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!formData.name || !formData.categoryId) {
      setMessage({ text: "Name and Category are required", type: "error" });
      return;
    }

    let parsedSpecs = null;
    if (formData.specs?.trim()) {
      try {
        parsedSpecs = JSON.parse(formData.specs);
      } catch {
        setMessage({ text: "Specifications must be valid JSON", type: "error" });
        return;
      }
    }

    try {
      const payload = {
        name: formData.name,
        categoryId: formData.categoryId,
        description: formData.description,
        image: formData.image,
        specs: parsedSpecs
      };

      if (editingProduct) {
        payload.id = editingProduct.id;
        const res = await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) {
          setMessage({ text: "Product updated successfully", type: "success" });
          fetchData();
          setActiveView("list");
        } else {
          setMessage({ text: data.error || "Failed to update product", type: "error" });
        }
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) {
          setMessage({ text: "Product created successfully", type: "success" });
          fetchData();
          setActiveView("list");
        } else {
          setMessage({ text: data.error || "Failed to create product", type: "error" });
        }
      }
    } catch (err) {
      setMessage({ text: "An error occurred", type: "error" });
    }
  };

  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/admin/products?id=${productId}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Product deleted successfully", type: "success" });
        fetchData();
      } else {
        setMessage({ text: data.error || "Failed to delete product", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Failed to delete product", type: "error" });
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryName = (categoryId) => {
    return categories.find(c => c.id === categoryId)?.name || "Unknown";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.4s ease-out both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Products</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Manage your product catalog and specifications.</p>
        </div>
        {activeView === "list" && (
          <button
            onClick={handleAddNew}
            style={{
              padding: "12px 24px",
              background: "#3257ff",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 8px 20px rgba(50, 87, 255, 0.2)"
            }}
          >
            <i className="fa-solid fa-plus"></i> Add Product
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

      {/* List View */}
      {activeView === "list" && (
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f1f5f9",
          padding: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
        }}>
          {/* Search Bar */}
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                fontSize: "14px",
                fontFamily: "inherit"
              }}
            />
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
              <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "24px", marginBottom: "12px" }}></i>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
              <i className="fa-solid fa-inbox" style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.3 }}></i>
              <p>{searchTerm ? "No products found" : "No products yet. Create one to get started."}</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f1f5f9" }}>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: 700, color: "#64748b", fontSize: "13px" }}>Name</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: 700, color: "#64748b", fontSize: "13px" }}>Category</th>
                    <th style={{ padding: "12px", textAlign: "left", fontWeight: 700, color: "#64748b", fontSize: "13px" }}>Description</th>
                    <th style={{ padding: "12px", textAlign: "center", fontWeight: 700, color: "#64748b", fontSize: "13px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} style={{ borderBottom: "1px solid #f1f5f9", hoverBackground: "#f9fafb" }}>
                      <td style={{ padding: "12px", fontSize: "14px", fontWeight: 500 }}>{product.name}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#64748b" }}>
                        <span style={{ background: "#f1f5f9", padding: "4px 12px", borderRadius: "6px", fontSize: "13px" }}>
                          {getCategoryName(product.categoryId)}
                        </span>
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px", color: "#64748b", maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {product.description ? product.description.substring(0, 50) + "..." : "-"}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          onClick={() => handleEdit(product)}
                          style={{
                            padding: "8px 12px",
                            background: "#3257ff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "12px",
                            marginRight: "8px",
                            fontWeight: 600
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          style={{
                            padding: "8px 12px",
                            background: "#ef4444",
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: 600
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Edit/Create View */}
      {activeView === "edit" && (
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #f1f5f9",
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "24px", color: "#1e293b" }}>
            {editingProduct ? "Edit Product" : "Create New Product"}
          </h2>

          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
              {/* Product Name */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="e.g., C7 Iso Pro"
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

              {/* Category */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleFormChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #e2e8f0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    boxSizing: "border-box"
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Product description..."
                rows={5}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  resize: "none"
                }}
              />
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
                placeholder="https://example.com/image.jpg"
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

            {/* Specs (JSON) */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                Specifications (JSON)
              </label>
              <textarea
                name="specs"
                value={formData.specs}
                onChange={handleFormChange}
                placeholder='{"color": "black", "size": "large"}'
                rows={4}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "monospace",
                  boxSizing: "border-box",
                  resize: "none"
                }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setActiveView("list")}
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
                {editingProduct ? "Update Product" : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductsCRUDPage;
