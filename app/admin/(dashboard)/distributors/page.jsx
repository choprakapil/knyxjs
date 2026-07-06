"use client";
import React, { useState, useEffect } from "react";

export default function DistributorsPage() {
  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDistributor, setEditingDistributor] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    address: "",
    phone: "",
    email: "",
    website: ""
  });

  // Fetch distributors
  useEffect(() => {
    fetchDistributors();
  }, []);

  const fetchDistributors = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/distributors");
      const data = await res.json();
      if (data.success) {
        setDistributors(data.distributors || []);
      }
    } catch (err) {
      setMessage({ text: "Failed to load distributors", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingDistributor(null);
    setFormData({
      name: "",
      country: "",
      address: "",
      phone: "",
      email: "",
      website: ""
    });
    setShowForm(true);
  };

  const handleEdit = (distributor) => {
    setEditingDistributor(distributor);
    setFormData({
      name: distributor.name || "",
      country: distributor.country || "",
      address: distributor.address || "",
      phone: distributor.phone || "",
      email: distributor.email || "",
      website: distributor.website || ""
    });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!formData.name.trim() || !formData.country.trim()) {
      setMessage({ text: "Name and Country are required", type: "error" });
      return;
    }

    try {
      if (editingDistributor) {
        const res = await fetch("/api/admin/distributors", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingDistributor.id, ...formData })
        });

        const data = await res.json();
        if (data.success) {
          setMessage({ text: "Distributor updated successfully", type: "success" });
          fetchDistributors();
          setShowForm(false);
        } else {
          setMessage({ text: data.error || "Failed to update distributor", type: "error" });
        }
      } else {
        const res = await fetch("/api/admin/distributors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        const data = await res.json();
        if (data.success) {
          setMessage({ text: "Distributor created successfully", type: "success" });
          fetchDistributors();
          setShowForm(false);
        } else {
          setMessage({ text: data.error || "Failed to create distributor", type: "error" });
        }
      }
    } catch (err) {
      setMessage({ text: "An error occurred", type: "error" });
    }
  };

  const handleDelete = async (distributorId) => {
    if (!confirm("Are you sure you want to delete this distributor?")) return;

    try {
      const res = await fetch(`/api/admin/distributors?id=${distributorId}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Distributor deleted successfully", type: "success" });
        fetchDistributors();
      } else {
        setMessage({ text: data.error || "Failed to delete distributor", type: "error" });
      }
    } catch (err) {
      setMessage({ text: "Failed to delete distributor", type: "error" });
    }
  };

  const filteredDistributors = distributors.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.4s ease-out both" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Distributors</h1>
          <p style={{ color: "#64748b", fontSize: "14px", marginTop: "4px" }}>Manage your official distribution partners and distributors.</p>
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
            <i className="fa-solid fa-plus"></i> Add Distributor
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
          padding: "32px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
        }}>
          <h2 style={{ fontSize: "20px", fontWeight: 800, marginBottom: "24px", color: "#1e293b" }}>
            {editingDistributor ? "Edit Distributor" : "Add New Distributor"}
          </h2>

          <form onSubmit={handleSave}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
              {/* Name */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                  Distributor / Store Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="e.g., ABC Sports Store"
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

              {/* Country */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  placeholder="e.g., India"
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

              {/* Phone */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="e.g., +91 9876543210"
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

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="e.g., contact@store.com"
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

              {/* Website */}
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleFormChange}
                  placeholder="https://example.com"
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

            {/* Address */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 600, marginBottom: "8px", color: "#334155" }}>
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Full address"
                rows={3}
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

            {/* Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
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
                {editingDistributor ? "Update Distributor" : "Add Distributor"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Distributors List */}
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
              placeholder="Search by name or country..."
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
              <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: "24px", marginBottom: "12px" }}></i>
              <p>Loading distributors...</p>
            </div>
          ) : filteredDistributors.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>
              <i className="fa-solid fa-store" style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.2 }}></i>
              <p>{searchTerm ? "No distributors found." : "No distributors added yet."}</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
              {filteredDistributors.map((distributor) => (
                <div
                  key={distributor.id}
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
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", margin: "0 0 12px 0" }}>
                    {distributor.name}
                  </h3>

                  <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "12px", lineHeight: "1.6" }}>
                    <div style={{ marginBottom: "4px" }}>
                      <i className="fa-solid fa-globe" style={{ marginRight: "6px" }}></i> {distributor.country}
                    </div>
                    {distributor.address && (
                      <div style={{ marginBottom: "4px" }}>
                        <i className="fa-solid fa-location-dot" style={{ marginRight: "6px" }}></i> {distributor.address}
                      </div>
                    )}
                    {distributor.phone && (
                      <div style={{ marginBottom: "4px" }}>
                        <i className="fa-solid fa-phone" style={{ marginRight: "6px" }}></i> {distributor.phone}
                      </div>
                    )}
                    {distributor.email && (
                      <div style={{ marginBottom: "4px" }}>
                        <i className="fa-solid fa-envelope" style={{ marginRight: "6px" }}></i> {distributor.email}
                      </div>
                    )}
                    {distributor.website && (
                      <div>
                        <i className="fa-solid fa-link" style={{ marginRight: "6px" }}></i>
                        <a href={distributor.website} target="_blank" rel="noopener noreferrer" style={{ color: "#3257ff", textDecoration: "none" }}>
                          Visit Website
                        </a>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                    <button
                      onClick={() => handleEdit(distributor)}
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
                      onClick={() => handleDelete(distributor.id)}
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
