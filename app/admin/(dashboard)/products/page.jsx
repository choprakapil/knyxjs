"use client";
import React, { useState } from "react";

export default function MasterProductCRUD() {
  const [activeView, setActiveView] = useState("list"); // list, editing, categories
  const [editingProduct, setEditingProduct] = useState(null);

  // --- MOCK DATA FOR UI ---
  const [topCategories, setTopCategories] = useState([
    { id: "cat-1", name: "Helmet", slug: "helmet" },
    { id: "cat-2", name: "Accessories", slug: "accessories" }
  ]);

  const [subCategories, setSubCategories] = useState([
    { id: "sub-1", name: "Professional", parentId: "cat-1" },
    { id: "sub-2", name: "Amateur", parentId: "cat-1" }
  ]);

  const [products, setProducts] = useState([
    { 
      id: "product-1", 
      name: "C7 Iso Pro", 
      category: "Professional", 
      categorySlug: "helmet",
      status: "Active",
      image: "Main Image.png",
      grilleType: "Titanium",
      certification: "BS 7928:2013"
    }
  ]);

  // --- HANDLERS ---
  const handleEdit = (p) => {
    setEditingProduct(p || {
      name: "",
      slug: "",
      category: "Professional",
      categorySlug: "helmet",
      grilleType: "Titanium",
      certification: "",
      sizes: [],
      colors: [],
      description: "",
      gallery: [],
      techText: [],
      featureIds: [],
      neckShieldFolder: "",
      neckShieldGallery: []
    });
    setActiveView("editing");
  };

  const deleteProduct = (id) => {
    if (confirm("Permanently delete this product from database?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      
      {/* 🧭 NAVIGATION HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0 }}>Unified Product Hub</h1>
          <p style={{ color: "#64748b", fontSize: "15px", marginTop: "6px" }}>Complete lifecycle management for KNYX hardware and taxonomy.</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
           {activeView === "list" && (
              <>
                <button onClick={() => setActiveView("categories")} style={secondaryBtnStyle}>Category Architecture</button>
                <button onClick={() => handleEdit(null)} style={primaryBtnStyle}><i className="fa-solid fa-plus"></i> New Product</button>
              </>
           )}
           {activeView !== "list" && (
              <button onClick={() => setActiveView("list")} style={secondaryBtnStyle}><i className="fa-solid fa-arrow-left"></i> Back to Hub</button>
           )}
        </div>
      </div>

      {/* 💼 CONTENT AREA */}
      <div style={containerStyle}>
        
        {/* --- 1. PRODUCT LIST VIEW --- */}
        {activeView === "list" && (
           <div style={{ animation: "slideUp 0.4s ease" }}>
              <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 12px" }}>
                 <thead>
                    <tr style={{ textAlign: "left" }}>
                       <th style={thStyle}>Hardware Name</th>
                       <th style={thStyle}>Taxonomy Node</th>
                       <th style={thStyle}>Status</th>
                       <th style={thStyle}>Action</th>
                    </tr>
                 </thead>
                 <tbody>
                    {products.map(p => (
                       <tr key={p.id}>
                          <td style={{...tdStyle, borderRadius: "16px 0 0 16px"}}>
                             <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                                <div style={{ width: "44px", height: "44px", background: "#f8faff", borderRadius: "12px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-helmet-safety" style={{ color: "#3257ff" }}></i></div>
                                <div>
                                   <p style={{ margin: 0, fontWeight: 800, color: "#1e293b" }}>{p.name}</p>
                                   <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>{p.grilleType} Grille</p>
                                </div>
                             </div>
                          </td>
                          <td style={tdStyle}>
                             <span style={{ fontSize: "12px", fontWeight: 700, color: "#3257ff", background: "#eff6ff", padding: "4px 10px", borderRadius: "8px" }}>{p.categorySlug.toUpperCase()}</span>
                             <span style={{ margin: "0 8px", color: "#cbd5e1" }}>/</span>
                             <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748b" }}>{p.category}</span>
                          </td>
                          <td style={tdStyle}>
                             <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <div style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%" }}></div>
                                <span style={{ fontSize: "13px", fontWeight: 700, color: "#1e293b" }}>Live</span>
                             </div>
                          </td>
                          <td style={{...tdStyle, borderRadius: "0 16px 16px 0"}}>
                             <div style={{ display: "flex", gap: "10px" }}>
                                <button onClick={() => handleEdit(p)} style={actionBtnStyle}><i className="fa-solid fa-sliders"></i></button>
                                <button onClick={() => deleteProduct(p.id)} style={{...actionBtnStyle, color: "#ef4444"}}><i className="fa-solid fa-trash"></i></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        )}

        {/* --- 2. CATEGORY ARCHITECTURE VIEW --- */}
        {activeView === "categories" && (
           <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "40px" }}>
                  {/* Primary Categories */}
                  <div>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                        <h3 style={sectionTitleStyle}>Primary Structure</h3>
                        <button style={{ background: "transparent", border: "none", color: "#3257ff", fontWeight: 800, cursor: "pointer", fontSize: "13px" }}>+ Add Parent</button>
                     </div>
                     <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {topCategories.map(c => (
                           <div key={c.id} style={{ padding: "18px 20px", background: "#f8faff", borderRadius: "14px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontWeight: 800, color: "#1e293b" }}>{c.name} <span style={{ opacity: 0.4, fontWeight: 500, fontSize: "12px" }}>({c.slug})</span></span>
                              <i className="fa-solid fa-chevron-right" style={{ fontSize: "12px", color: "#cbd5e1" }}></i>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Sub-Category Detail Control */}
                  <div>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "20px" }}>
                        <h3 style={sectionTitleStyle}>Sub-Category Nodes (Collections)</h3>
                        <button style={{ background: "transparent", border: "none", color: "#3257ff", fontWeight: 800, cursor: "pointer", fontSize: "13px" }}>+ New Sub-Category</button>
                     </div>
                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                        {subCategories.map(sub => (
                           <div key={sub.id} style={{ padding: "20px", background: "#ffffff", borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                              <p style={{ margin: 0, fontSize: "11px", color: "#3257ff", fontWeight: 800, textTransform: "uppercase" }}>Node: {sub.id}</p>
                              <h4 style={{ margin: "5px 0 15px", fontSize: "16px", fontWeight: 800 }}>{sub.name}</h4>
                              <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                 <button style={actionBtnBase}><i className="fa-solid fa-pen"></i></button>
                                 <button style={{...actionBtnBase, color: "#ef4444"}}><i className="fa-solid fa-trash"></i></button>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
              </div>
           </div>
        )}

        {/* --- 3. MASTER PRODUCT EDITOR (DETAILED UI) --- */}
        {activeView === "editing" && (
           <div style={{ animation: "slideUp 0.4s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", borderBottom: "1px solid #f1f5f9", paddingBottom: "30px" }}>
                 <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    <div style={{ width: "56px", height: "56px", background: "#3257ff", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-rocket" style={{ color: "#fff", fontSize: "20px" }}></i></div>
                    <div>
                       <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800 }}>{editingProduct?.name || "Initializing New Project"}</h2>
                       <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>Edit architectural nodes and physical hardware specifications.</p>
                    </div>
                 </div>
                 <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={() => setActiveView("list")} style={{ padding: "12px 24px", background: "#f8faff", color: "#64748b", border: "none", borderRadius: "12px", fontWeight: 700, cursor: "pointer" }}>Draft Logic</button>
                    <button onClick={() => { alert("Saved"); setActiveView("list"); }} style={primaryBtnStyle}>Deploy to Production</button>
                 </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
                 
                 {/* COLUMN 1: IDENTITY & TEXT */}
                 <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                    
                    {/* Basic Cluster */}
                    <div style={editorSectionStyle}>
                       <h4 style={sectionTitleStyle}>Primary Metadata</h4>
                       <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                             <div><label style={labelStyle}>Product Name</label><input type="text" defaultValue={editingProduct.name} style={inputStyle} /></div>
                             <div><label style={labelStyle}>URL Slug</label><input type="text" defaultValue={editingProduct.slug} style={inputStyle} /></div>
                          </div>
                          <div><label style={labelStyle}>Narrative Description</label><textarea rows="5" defaultValue={editingProduct.description} style={{...inputStyle, height: "auto", resize: "none"}} /></div>
                       </div>
                    </div>

                    {/* Taxonomy Cluster */}
                    <div style={editorSectionStyle}>
                       <h4 style={sectionTitleStyle}>Hierarchy Assignment</h4>
                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                          <div>
                             <label style={labelStyle}>Top Category</label>
                             <select style={inputStyle} defaultValue={editingProduct.categorySlug}>
                                {topCategories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                             </select>
                          </div>
                          <div>
                             <label style={labelStyle}>Sub-Category (Profession/Collection)</label>
                             <select style={inputStyle} defaultValue={editingProduct.category}>
                                {subCategories.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                             </select>
                          </div>
                       </div>
                    </div>

                    {/* Tech List Cluster */}
                    <div style={editorSectionStyle}>
                       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                          <h4 style={{...sectionTitleStyle, marginBottom: 0 }}>Integrated Technologies</h4>
                          <button style={{ background: "transparent", border: "none", color: "#3257ff", fontWeight: 800, fontSize: "12px" }}>+ Insert Point</button>
                       </div>
                       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {["Carbon Composite Shell", "High Density EPP Liner", "RIM System Activated"].map((t, i) => (
                             <div key={i} style={{ padding: "12px 15px", background: "#f8faff", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between" }}>
                                <span style={{ fontSize: "13px", fontWeight: 600 }}>{t}</span>
                                <i className="fa-solid fa-xmark" style={{ color: "#ef4444", fontSize: "12px", cursor: "pointer" }}></i>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* COLUMN 2: HARDWARE & MEDIA */}
                 <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
                    
                    {/* Media Vault */}
                    <div style={editorSectionStyle}>
                       <h4 style={sectionTitleStyle}>Media Architecture</h4>
                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "25px" }}>
                          <div>
                             <label style={labelStyle}>Folder Path</label>
                             <input type="text" defaultValue={editingProduct.imageFolder || "new_collection"} style={inputStyle} />
                             <div style={{ width: "100%", height: "140px", background: "#f8faff", borderRadius: "14px", border: "2px dashed #e2e8f0", marginTop: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <i className="fa-solid fa-image" style={{ color: "#cbd5e1" }}></i>
                             </div>
                          </div>
                          <div>
                             <label style={labelStyle}>Gallery Asset Matrix</label>
                             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                                {[1,2,3,4,5,6].map(i => (
                                   <div key={i} style={{ height: "60px", background: "#f8faff", borderRadius: "10px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                      <i className="fa-solid fa-plus" style={{ fontSize: "10px", color: "#cbd5e1" }}></i>
                                   </div>
                                ))}
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Hardware Specs */}
                    <div style={editorSectionStyle}>
                       <h4 style={sectionTitleStyle}>Engineering Specs</h4>
                       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                          <div><label style={labelStyle}>Grille System Type</label><input type="text" defaultValue={editingProduct.grilleType} style={inputStyle} /></div>
                          <div><label style={labelStyle}>Certification Node</label><input type="text" defaultValue={editingProduct.certification} style={inputStyle} /></div>
                       </div>
                    </div>

                    {/* Variant Matrix */}
                    <div style={editorSectionStyle}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                           <div>
                              <label style={labelStyle}>Color Spectrum</label>
                              <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
                                 {["#000080", "#000000", "#800000"].map(c => <div key={c} style={{ width: "32px", height: "32px", borderRadius: "50%", background: c, border: "2px solid #e2e8f0" }}></div>)}
                                 <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}><i className="fa-solid fa-plus" style={{ fontSize: "10px" }}></i></div>
                              </div>
                           </div>
                           <div>
                              <label style={labelStyle}>Sizing Matrix</label>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
                                 {["Reg (54-61)", "Large (60-64)"].map(s => <span key={s} style={{ background: "#eff6ff", color: "#3257ff", fontWeight: 800, fontSize: "11px", padding: "5px 10px", borderRadius: "6px" }}>{s}</span>)}
                              </div>
                           </div>
                        </div>
                    </div>

                    {/* Accessories Cluster */}
                    <div style={editorSectionStyle}>
                       <h4 style={sectionTitleStyle}>Accessory Linkage</h4>
                       <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <input type="text" placeholder="Neck Shield Folder Name" style={inputStyle} />
                          <div style={{ display: "flex", gap: "10px" }}>
                             {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: "40px", background: "#f8faff", borderRadius: "8px", border: "1px solid #e2e8f0" }}></div>)}
                          </div>
                       </div>
                    </div>

                 </div>
              </div>
           </div>
        )}

      </div>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// STYLES
const containerStyle = { background: "#ffffff", borderRadius: "28px", padding: "40px", border: "1px solid #f1f5f9", boxShadow: "0 10px 40px rgba(0,0,0,0.02)", minHeight: "700px" };
const primaryBtnStyle = { padding: "14px 32px", background: "#3257ff", color: "#ffffff", border: "none", borderRadius: "14px", fontWeight: 800, fontSize: "14px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 10px 20px rgba(50, 87, 255, 0.25)" };
const secondaryBtnStyle = { padding: "14px 28px", background: "#f8faff", color: "#1e293b", border: "1px solid #e2e8f0", borderRadius: "14px", fontWeight: 700, fontSize: "14px", cursor: "pointer" };
const thStyle = { padding: "15px", color: "#94a3b8", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" };
const tdStyle = { padding: "24px 15px", background: "#f8faff", verticalAlign: "middle" };
const actionBtnStyle = { width: "42px", height: "42px", borderRadius: "12px", background: "#ffffff", border: "1px solid #e2e8f0", color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" };
const actionBtnBase = { width: "32px", height: "32px", borderRadius: "8px", background: "#f8faff", border: "1px solid #e2e8f0", color: "#64748b", cursor: "pointer", fontSize: "12px" };
const editorSectionStyle = { padding: "25px", background: "#ffffff", borderRadius: "20px", border: "1px solid #f1f5f9" };
const sectionTitleStyle = { fontSize: "18px", fontWeight: 800, color: "#1e293b", marginBottom: "20px" };
const labelStyle = { display: "block", fontSize: "12px", fontWeight: 700, color: "#64748b", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" };
const inputStyle = { width: "100%", padding: "14px 18px", background: "#f8faff", border: "1px solid #e2e8f0", borderRadius: "12px", color: "#1e293b", fontSize: "14px", outline: "none", fontWeight: 600 };
