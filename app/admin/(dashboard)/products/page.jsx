"use client";
import React, { useState, useEffect, useRef } from "react";
import { uploadMediaFile } from "@/lib/uploadClient";

// ─── Feature Dictionary ────────────────────────────────────────────────────
const FEATURES = [
  { id: "carbon_composite", title: "CARBON COMPOSITE", desc: "Carbon Composite Reinforced Shell", iconImg: "logo-4.png" },
  { id: "impact_polymer",   title: "IMPACT POLYMER",   desc: "Impact Modified Polymer Shell",    iconImg: "logo-4.png" },
  { id: "epp",              title: "EPP LINER",         desc: "High Density Impact Absorbing Layer", iconImg: "logo-7.png" },
  { id: "rim",              title: "RIM",               desc: "Radial Impact Mitigation System",  iconImg: "logo-1.png" },
  { id: "evs",              title: "EVS",               desc: "Engineered Ventilation System",    iconImg: "logo-5.png" },
  { id: "isofit",           title: "ISOFIT",            desc: "Personalized Fit Adjustment System", iconImg: "logo-8.png" },
  { id: "koolform",         title: "KOOLFORM",          desc: "Wide Surface Cooling Comfort Liner", iconImg: "logo-6.png" },
  { id: "titanium_grille",  title: "TACTICAL FACEGUARD (Titanium)", desc: "Ultralight Titanium Facial Protection", iconImg: "logo.png" },
  { id: "steel_grille",     title: "CARBON STEEL FACEGUARD", desc: "Carbon Steel Tactical Faceguard", iconImg: "logo.png" },
  { id: "maglock",          title: "MAGLOCK",           desc: "Magnetic Quick Release Buckle",    iconImg: "logo-3.png" },
  { id: "quick_release",    title: "QUICK RELEASE",     desc: "Quick Release Buckle System",      iconImg: "logo-3.png" },
];

const PRESET_COLORS = [
  { name: "Navy",   color: "#000080" },
  { name: "Black",  color: "#000000" },
  { name: "Maroon", color: "#800000" },
  { name: "Green",  color: "#008000" },
  { name: "White",  color: "#FFFFFF" },
  { name: "Red",    color: "#CC0000" },
  { name: "Blue",   color: "#0044CC" },
  { name: "Grey",   color: "#666666" },
];

const safeJson = (v, fallback) => {
  if (!v) return fallback;
  if (typeof v === "object") return v;
  try { return JSON.parse(v); } catch { return fallback; }
};

/**
 * Resolve a product image to a displayable src URL for the admin panel.
 * Handles both uploaded paths (/assets/uploads/...) and static product folder images.
 */
function getAdminImgSrc(imageField, imageFolder) {
  if (!imageField) return "";
  // Absolute: uploaded file or external URL — use as-is
  if (imageField.startsWith("/") || imageField.startsWith("http") || imageField.startsWith("data:")) {
    return imageField;
  }
  // Relative filename — resolve using product's imageFolder
  if (imageFolder) {
    return `/assets/img/products_images/${imageFolder}/${imageField}`;
  }
  return "";
}

const emptyForm = () => ({
  name: "", categoryId: "", description: "",
  level: "", grilleType: "", certification: "BS 7928:2013 + A1:2019",
  image: "", imageFolder: "",
  gallery: [],
  featureIds: [],
  techText: [],
  techSectionImage: "",
  colors: [],
  sizes: ["Regular (54-61 cm)"],
  sizingTitle: "Helmet Sizing",
  sizingText: 'Our "Iso" range of helmets come fitted with Isofit adjustment system which is able to accommodate different head sizes in a single shell allowing maximum size range cover.\n\nTry the helmet out of the box and turn the ratchet to best suit your comfort.\n\nEvery helmet includes KoolForm Comfort Liner in varied thickness for your very own personalization.',
  accessories: [],
  neckShieldFolder: "",
  neckShieldGallery: [],
});

export default function ProductsCRUDPage() {
  const [products, setProducts]         = useState([]);
  const [categories, setCategories]     = useState([]);
  const [loading, setLoading]           = useState(true);
  const [view, setView]                 = useState("list"); // list | edit
  const [editingId, setEditingId]       = useState(null);
  const [tab, setTab]                   = useState("basic");
  const [form, setForm]                 = useState(emptyForm());
  const [saving, setSaving]             = useState(false);
  const [msg, setMsg]                   = useState({ text: "", type: "" });
  const [search, setSearch]             = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingTechImg, setUploadingTechImg] = useState(null); // index of tech item uploading
  const [newColorName, setNewColorName] = useState("");
  const [newColorHex, setNewColorHex]   = useState("#000000");
  const [newSize, setNewSize]           = useState("");
  const [newTech, setNewTech]           = useState("");
  const [newAccessory, setNewAccessory] = useState("");
  const mainImgRef  = useRef(null);
  const galleryRef  = useRef(null);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/products");
      const d = await r.json();
      if (d.success) { setProducts(d.products || []); setCategories(d.categories || []); }
    } catch { setMsg({ text: "Failed to load products", type: "error" }); }
    finally { setLoading(false); }
  }

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm());
    setTab("basic");
    setMsg({ text: "", type: "" });
    setView("edit");
  }

  function openEdit(p) {
    const sp = safeJson(p.specs, {});
    setEditingId(p.id);
    setForm({
      name:             p.name || "",
      categoryId:       String(p.categoryId || ""),
      description:      p.description || "",
      level:            sp.level || "",
      grilleType:       sp.grilleType || "",
      certification:    sp.certification || "BS 7928:2013 + A1:2019",
      image:            p.image || sp.image || "",
      imageFolder:      sp.imageFolder || "",
      gallery:          safeJson(sp.gallery, []),
      featureIds:       safeJson(sp.featureIds, []),
      techText:         safeJson(sp.techText, []),
      techSectionImage: sp.techSectionImage || "",
      colors:           safeJson(sp.colors, []),
      sizes:            safeJson(sp.sizes, ["Regular (54-61 cm)"]),
      sizingTitle:      sp.sizingTitle || "Helmet Sizing",
      sizingText:       sp.sizingText || "",
      accessories:      safeJson(sp.accessories, []),
      neckShieldFolder: sp.neckShieldFolder || "",
      neckShieldGallery:safeJson(sp.neckShieldGallery, []),
    });
    setTab("basic");
    setMsg({ text: "", type: "" });
    setView("edit");
  }

  function set(field, value) { setForm(f => ({ ...f, [field]: value })); }

  async function handleMainImgUpload(e) {
    const file = e.target.files?.[0]; if (!file) return;
    e.target.value = "";
    setUploadingImg(true);
    try { const path = await uploadMediaFile(file); set("image", path); set("imageFolder", ""); }
    catch (err) { setMsg({ text: err.message || "Upload failed", type: "error" }); }
    finally { setUploadingImg(false); }
  }

  async function handleGalleryUpload(e) {
    const files = Array.from(e.target.files || []); if (!files.length) return;
    e.target.value = "";
    setUploadingGallery(true);
    try {
      const paths = await Promise.all(files.map(f => uploadMediaFile(f)));
      set("gallery", [...(form.gallery || []), ...paths]);
    } catch (err) { setMsg({ text: err.message || "Upload failed", type: "error" }); }
    finally { setUploadingGallery(false); }
  }

  function toggleFeature(id) {
    const cur = form.featureIds || [];
    set("featureIds", cur.includes(id) ? cur.filter(x => x !== id) : [...cur, id]);
  }

  function addColor() {
    if (!newColorName.trim()) return;
    set("colors", [...(form.colors || []), { name: newColorName.trim(), color: newColorHex }]);
    setNewColorName(""); setNewColorHex("#000000");
  }

  function addPresetColor(c) {
    if ((form.colors || []).find(x => x.name === c.name)) return;
    set("colors", [...(form.colors || []), c]);
  }

  function addSize() { if (newSize.trim()) { set("sizes", [...(form.sizes || []), newSize.trim()]); setNewSize(""); } }
  function addTech() {
    if (newTech.trim()) {
      const newItem = { text: newTech.trim(), image: "" };
      set("techText", [...(form.techText || []), newItem]);
      setNewTech("");
    }
  }
  function addAccessory() { if (newAccessory.trim()) { set("accessories", [...(form.accessories || []), newAccessory.trim()]); setNewAccessory(""); } }

  async function handleSave(e) {
    e.preventDefault();
    if (!form.name || !form.categoryId) { setMsg({ text: "Name and Category are required", type: "error" }); return; }
    setSaving(true); setMsg({ text: "", type: "" });
    try {
      const specs = {
        level: form.level, grilleType: form.grilleType, certification: form.certification,
        imageFolder: form.imageFolder,
        gallery: form.gallery, featureIds: form.featureIds, techText: form.techText, techSectionImage: form.techSectionImage,
        colors: form.colors, sizes: form.sizes,
        sizingTitle: form.sizingTitle, sizingText: form.sizingText,
        accessories: form.accessories,
        neckShieldFolder: form.neckShieldFolder, neckShieldGallery: form.neckShieldGallery,
      };
      const payload = { name: form.name, categoryId: form.categoryId, description: form.description, image: form.image, specs };
      if (editingId) payload.id = editingId;
      const res = await fetch("/api/admin/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const d = await res.json();
      if (d.success) {
        setMsg({ text: editingId ? "Product updated!" : "Product created!", type: "success" });
        fetchData(); setView("list");
      } else { setMsg({ text: d.error || "Save failed", type: "error" }); }
    } catch { setMsg({ text: "An error occurred", type: "error" }); }
    finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product permanently?")) return;
    try {
      const r = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      const d = await r.json();
      if (d.success) { setMsg({ text: "Deleted.", type: "success" }); fetchData(); }
      else setMsg({ text: d.error || "Delete failed", type: "error" });
    } catch { setMsg({ text: "Delete failed", type: "error" }); }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const tabs = [
    { id: "basic",   label: "Basic Info",       icon: "fa-circle-info" },
    { id: "images",  label: "Images & Gallery",  icon: "fa-images" },
    { id: "features",label: "Features & Tech",   icon: "fa-microchip" },
    { id: "colors",  label: "Colors & Sizes",    icon: "fa-palette" },
    { id: "sizing",  label: "Sizing & Info",     icon: "fa-ruler" },
    { id: "accessories", label: "Accessories",   icon: "fa-shield" },
  ];

  // ─── Styles ───────────────────────────────────────────────────────────────
  const S = {
    card: { background:"#fff", borderRadius:"20px", border:"1px solid #f1f5f9", padding:"28px", boxShadow:"0 4px 20px rgba(0,0,0,0.04)" },
    label: { display:"block", fontSize:"13px", fontWeight:700, color:"#475569", marginBottom:"7px" },
    input: { width:"100%", padding:"13px 16px", border:"1.5px solid #e2e8f0", borderRadius:"12px", fontSize:"14px", color:"#1e293b", fontFamily:"inherit", outline:"none", background:"#fafbff", boxSizing:"border-box" },
    btn: { padding:"13px 28px", background:"#3257ff", border:"none", borderRadius:"12px", color:"#fff", fontWeight:700, fontSize:"14px", cursor:"pointer", display:"flex", alignItems:"center", gap:"8px", boxShadow:"0 8px 20px rgba(50,87,255,0.2)" },
    ghost: { padding:"13px 28px", background:"#f1f5f9", border:"none", borderRadius:"12px", color:"#64748b", fontWeight:700, fontSize:"14px", cursor:"pointer" },
    tag: (active) => ({ padding:"7px 14px", borderRadius:"8px", border:`1.5px solid ${active?"#3257ff":"#e2e8f0"}`, background:active?"#eef1ff":"transparent", color:active?"#3257ff":"#64748b", cursor:"pointer", fontSize:"13px", fontWeight:600, transition:"all 0.2s" }),
    pill: { display:"inline-flex", alignItems:"center", gap:"6px", padding:"5px 12px", background:"#f1f5f9", borderRadius:"20px", fontSize:"13px", fontWeight:600, color:"#334155" },
  };

  // ─── Message Banner ───────────────────────────────────────────────────────
  const MsgBanner = () => msg.text ? (
    <div style={{ padding:"14px 20px", borderRadius:"12px", marginBottom:"20px",
      background: msg.type==="success"?"#ecfdf5":"#fef2f2",
      border:`1px solid ${msg.type==="success"?"#bbf7d0":"#fecaca"}`,
      color: msg.type==="success"?"#065f46":"#991b1b", fontWeight:600, fontSize:"14px" }}>
      <i className={`fa-solid ${msg.type==="success"?"fa-circle-check":"fa-circle-exclamation"}`} style={{ marginRight:"8px" }} />
      {msg.text}
    </div>
  ) : null;

  // ─── LIST VIEW ────────────────────────────────────────────────────────────
  if (view === "list") return (
    <div style={{ display:"flex", flexDirection:"column", gap:"24px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <h1 style={{ fontSize:"28px", fontWeight:800, color:"#1e293b", margin:0 }}>Products</h1>
          <p style={{ color:"#64748b", fontSize:"14px", marginTop:"4px" }}>{products.length} products in your catalog</p>
        </div>
        <button onClick={openCreate} style={S.btn}><i className="fa-solid fa-plus" /> Add Product</button>
      </div>

      <MsgBanner />

      <div style={S.card}>
        <input type="text" placeholder="🔍  Search products or categories..." value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ ...S.input, marginBottom:"24px" }} />

        {loading ? (
          <div style={{ textAlign:"center", padding:"60px", color:"#94a3b8" }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize:"28px", marginBottom:"12px", display:"block" }} />
            Loading products...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px", color:"#94a3b8" }}>
            <i className="fa-solid fa-box-open" style={{ fontSize:"40px", marginBottom:"16px", display:"block", opacity:0.3 }} />
            <p style={{ fontSize:"16px", fontWeight:600 }}>{search ? "No products match your search" : "No products yet. Click \"Add Product\" to get started."}</p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"20px" }}>
            {filtered.map(p => {
              const sp = safeJson(p.specs, {});
              const img = p.image || "";
              return (
                <div key={p.id} style={{ border:"1.5px solid #f1f5f9", borderRadius:"16px", overflow:"hidden", background:"#fafbff", transition:"all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow="0 8px 30px rgba(50,87,255,0.1)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow="none"}>
                  {/* Image */}
                  <div style={{ height:"200px", background:"#f8faff", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", position:"relative" }}>
                    {img ? (
                      <img src={getAdminImgSrc(img, p.imageFolder || safeJson(p.specs, {}).imageFolder)} alt={p.name} style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain", padding:"16px" }} />
                    ) : (
                      <i className="fa-solid fa-helmet-safety" style={{ fontSize:"48px", color:"#cbd5e1" }} />
                    )}
                    <span style={{ position:"absolute", top:"12px", left:"12px", background:"#3257ff", color:"#fff", fontSize:"11px", fontWeight:700, padding:"3px 10px", borderRadius:"6px" }}>
                      {p.category?.name || "—"}
                    </span>
                    {sp.level && (
                      <span style={{ position:"absolute", top:"12px", right:"12px", background:"rgba(0,0,0,0.5)", color:"#fff", fontSize:"11px", fontWeight:600, padding:"3px 10px", borderRadius:"6px" }}>
                        {sp.level}
                      </span>
                    )}
                  </div>
                  {/* Info */}
                  <div style={{ padding:"16px" }}>
                    <h3 style={{ fontSize:"16px", fontWeight:800, color:"#1e293b", margin:"0 0 6px" }}>{p.name}</h3>
                    <p style={{ fontSize:"13px", color:"#64748b", margin:"0 0 12px", overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
                      {p.description || "No description"}
                    </p>
                    {/* Colors preview */}
                    {safeJson(sp.colors, []).length > 0 && (
                      <div style={{ display:"flex", gap:"5px", marginBottom:"12px" }}>
                        {safeJson(sp.colors, []).map((c, i) => (
                          <div key={i} title={c.name} style={{ width:"18px", height:"18px", borderRadius:"50%", background:c.color, border:"1.5px solid rgba(0,0,0,0.1)" }} />
                        ))}
                      </div>
                    )}
                    {/* Features count */}
                    <div style={{ display:"flex", gap:"8px", marginBottom:"14px", flexWrap:"wrap" }}>
                      {safeJson(sp.featureIds, []).length > 0 && (
                        <span style={S.pill}><i className="fa-solid fa-microchip" style={{ fontSize:"11px", color:"#3257ff" }} /> {safeJson(sp.featureIds,[]).length} Features</span>
                      )}
                      {sp.grilleType && <span style={S.pill}>{sp.grilleType}</span>}
                    </div>
                    {/* Actions */}
                    <div style={{ display:"flex", gap:"8px" }}>
                      <button onClick={() => openEdit(p)} style={{ flex:1, padding:"10px", background:"#3257ff15", color:"#3257ff", border:"none", borderRadius:"10px", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
                        <i className="fa-solid fa-pen-to-square" /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} style={{ padding:"10px 14px", background:"#fef2f2", color:"#ef4444", border:"none", borderRadius:"10px", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // ─── EDIT VIEW ────────────────────────────────────────────────────────────
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
      <input type="file" ref={mainImgRef} onChange={handleMainImgUpload} style={{ display:"none" }} accept="image/*" />
      <input type="file" ref={galleryRef} onChange={handleGalleryUpload} style={{ display:"none" }} accept="image/*,video/*" multiple />

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
          <button onClick={() => setView("list")} style={{ background:"#f1f5f9", border:"none", borderRadius:"10px", padding:"10px 16px", cursor:"pointer", fontWeight:700, color:"#64748b", fontSize:"14px" }}>
            <i className="fa-solid fa-arrow-left" /> Back
          </button>
          <div>
            <h1 style={{ fontSize:"22px", fontWeight:800, color:"#1e293b", margin:0 }}>{editingId ? `Editing: ${form.name || "Product"}` : "Create New Product"}</h1>
            <p style={{ color:"#94a3b8", fontSize:"13px", margin:0 }}>Fill all tabs for best results</p>
          </div>
        </div>
        <button onClick={handleSave} disabled={saving} style={S.btn}>
          {saving ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-cloud-arrow-up" />}
          {saving ? "Saving..." : "Save Product"}
        </button>
      </div>

      <MsgBanner />

      {/* Tabs */}
      <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding:"10px 18px", border:"none", borderRadius:"10px", fontWeight:700, fontSize:"13px", cursor:"pointer",
            background: tab===t.id ? "#3257ff" : "#f1f5f9",
            color: tab===t.id ? "#fff" : "#64748b",
            boxShadow: tab===t.id ? "0 4px 12px rgba(50,87,255,0.25)" : "none"
          }}>
            <i className={`fa-solid ${t.icon}`} style={{ marginRight:"6px" }} />{t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: Basic Info ─────────────────────────────────────────────── */}
      {tab === "basic" && (
        <div style={S.card}>
          <h2 style={{ fontSize:"18px", fontWeight:800, color:"#1e293b", marginBottom:"24px" }}>Basic Product Information</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"20px" }}>
            <div>
              <label style={S.label}>Product Name *</label>
              <input style={S.input} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. C7 Iso Pro" />
            </div>
            <div>
              <label style={S.label}>Category *</label>
              <select style={S.input} value={form.categoryId} onChange={e => set("categoryId", e.target.value)}>
                <option value="">Select category...</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={S.label}>Product Level</label>
              <select style={S.input} value={form.level} onChange={e => set("level", e.target.value)}>
                <option value="">Select level...</option>
                <option>Pro</option>
                <option>All Class</option>
                <option>Amateur</option>
              </select>
            </div>
            <div>
              <label style={S.label}>Grille / Faceguard Type</label>
              <select style={S.input} value={form.grilleType} onChange={e => set("grilleType", e.target.value)}>
                <option value="">Select type...</option>
                <option>Titanium</option>
                <option>Carbon Steel</option>
                <option>Stainless Steel</option>
              </select>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={S.label}>Certification Standard</label>
              <input style={S.input} value={form.certification} onChange={e => set("certification", e.target.value)} placeholder="e.g. BS 7928:2013 + A1:2019" />
            </div>
          </div>
          <div>
            <label style={S.label}>Product Description *</label>
            <textarea style={{ ...S.input, minHeight:"120px", resize:"vertical" }} value={form.description}
              onChange={e => set("description", e.target.value)} placeholder="Describe the product's key strengths and target audience..." />
          </div>
        </div>
      )}

      {/* ── TAB: Images ─────────────────────────────────────────────────── */}
      {tab === "images" && (
        <div style={S.card}>
          <h2 style={{ fontSize:"18px", fontWeight:800, color:"#1e293b", marginBottom:"24px" }}>Main Image & Gallery</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:"28px" }}>
            {/* Main Image */}
            <div>
              <label style={S.label}>Main Product Image</label>
              <div onClick={() => mainImgRef.current.click()} style={{ height:"220px", borderRadius:"16px", border:"2px dashed #e2e8f0", background:"#f8faff", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", cursor:"pointer", overflow:"hidden", transition:"all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#3257ff"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#e2e8f0"}>
                {uploadingImg ? (
                  <><i className="fa-solid fa-spinner fa-spin" style={{ fontSize:"24px", color:"#3257ff" }} /><p style={{ fontSize:"13px", color:"#3257ff", marginTop:"8px" }}>Uploading...</p></>
                ) : form.image ? (
                  <img src={getAdminImgSrc(form.image, form.imageFolder)} alt="main" style={{ maxWidth:"100%", maxHeight:"100%", objectFit:"contain", padding:"12px" }} />
                ) : (
                  <><i className="fa-solid fa-image" style={{ fontSize:"32px", color:"#cbd5e1" }} /><p style={{ fontSize:"13px", color:"#94a3b8", marginTop:"8px" }}>Click to upload main image</p></>
                )}
              </div>
              {form.image && (
                <button onClick={() => set("image", "")} style={{ marginTop:"8px", width:"100%", padding:"8px", background:"#fef2f2", border:"none", borderRadius:"8px", color:"#ef4444", fontWeight:600, fontSize:"13px", cursor:"pointer" }}>
                  <i className="fa-solid fa-trash" /> Remove Image
                </button>
              )}
            </div>

            {/* Gallery */}
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"8px" }}>
                <label style={{ ...S.label, margin:0 }}>Gallery Images</label>
                <button onClick={() => galleryRef.current.click()} disabled={uploadingGallery} style={{ ...S.btn, padding:"8px 14px", fontSize:"12px" }}>
                  {uploadingGallery ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-plus" />}
                  {uploadingGallery ? "Uploading..." : "Add Images"}
                </button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"10px" }}>
                {(form.gallery || []).map((img, i) => (
                  <div key={i} style={{ position:"relative", aspectRatio:"1/1", borderRadius:"10px", overflow:"hidden", border:"1px solid #e2e8f0" }}>
                    <img src={getAdminImgSrc(img, form.imageFolder)} alt={`gallery ${i}`} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <button onClick={() => set("gallery", form.gallery.filter((_, j) => j !== i))}
                      style={{ position:"absolute", top:"4px", right:"4px", width:"22px", height:"22px", background:"rgba(239,68,68,0.9)", border:"none", borderRadius:"50%", color:"#fff", cursor:"pointer", fontSize:"11px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <i className="fa-solid fa-xmark" />
                    </button>
                  </div>
                ))}
                <div onClick={() => galleryRef.current.click()} style={{ aspectRatio:"1/1", borderRadius:"10px", border:"2px dashed #e2e8f0", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", background:"#f8faff" }}>
                  <i className="fa-solid fa-plus" style={{ color:"#94a3b8", fontSize:"20px" }} />
                </div>
              </div>
              <p style={{ fontSize:"12px", color:"#94a3b8", marginTop:"8px" }}>Tip: First gallery image is used as the main display image on product page.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Features & Tech ────────────────────────────────────────── */}
      {tab === "features" && (
        <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
          <div style={S.card}>
            <h2 style={{ fontSize:"18px", fontWeight:800, color:"#1e293b", marginBottom:"8px" }}>Product Features</h2>
            <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"24px" }}>Click to toggle features included in this product. Selected features appear on the product page.</p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"12px" }}>
              {FEATURES.map(f => {
                const active = (form.featureIds || []).includes(f.id);
                return (
                  <div key={f.id} onClick={() => toggleFeature(f.id)} style={{
                    padding:"14px 16px", borderRadius:"14px", cursor:"pointer", transition:"all 0.2s",
                    border: `2px solid ${active ? "#3257ff" : "#e2e8f0"}`,
                    background: active ? "#eef1ff" : "#fafbff",
                    display:"flex", alignItems:"center", gap:"12px"
                  }}>
                    <div style={{ width:"36px", height:"36px", borderRadius:"10px", background: active?"rgba(50,87,255,0.15)":"#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <img src={`/assets/img/brands/${f.iconImg}`} alt={f.title} style={{ width:"20px", height:"auto", filter: active?"none":"grayscale(1) opacity(0.5)" }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ margin:0, fontSize:"13px", fontWeight:700, color: active?"#3257ff":"#334155" }}>{f.title}</p>
                      <p style={{ margin:0, fontSize:"11px", color:"#94a3b8", lineHeight:1.3 }}>{f.desc}</p>
                    </div>
                    <div style={{ width:"20px", height:"20px", borderRadius:"50%", border:`2px solid ${active?"#3257ff":"#cbd5e1"}`, background: active?"#3257ff":"transparent", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      {active && <i className="fa-solid fa-check" style={{ fontSize:"10px", color:"#fff" }} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={S.card}>
            <h2 style={{ fontSize:"18px", fontWeight:800, color:"#1e293b", marginBottom:"4px" }}>Tech Highlight Points</h2>
            <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"6px" }}>Bullet points in the "What's Inside" section. You can also attach a small icon image per point.</p>
            <p style={{ color:"#94a3b8", fontSize:"12px", marginBottom:"20px", fontStyle:"italic" }}>You can also upload a single section-level image below — it appears at the top of the tech section.</p>

            {/* Section-level tech image */}
            <div style={{ marginBottom:"20px" }}>
              <label style={S.label}>Section Image (shown at top of "What's Inside" area)</label>
              <div style={{ display:"flex", gap:"10px", alignItems:"flex-start", flexWrap:"wrap" }}>
                {form.techSectionImage && (
                  <div style={{ position:"relative", flexShrink:0 }}>
                    <img src={form.techSectionImage} alt="Tech section" style={{ width:"140px", height:"90px", objectFit:"cover", borderRadius:"8px", border:"1px solid #e2e8f0" }} />
                    <button type="button" onClick={() => set("techSectionImage", "")} style={{ position:"absolute", top:"-6px", right:"-6px", width:"20px", height:"20px", background:"#ef4444", color:"#fff", border:"none", borderRadius:"50%", cursor:"pointer", fontSize:"11px", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
                  </div>
                )}
                <label style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"6px", width:"140px", height:"90px", border:"2px dashed #e2e8f0", borderRadius:"8px", cursor:"pointer", background:"#f8fafc", fontSize:"11px", color:"#94a3b8", flexShrink:0 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#3257ff"; e.currentTarget.style.color="#3257ff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.color="#94a3b8"; }}>
                  <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize:"22px" }}></i>
                  Upload Section Image
                  <input type="file" accept="image/*" style={{ display:"none" }}
                    onChange={async (e) => {
                      const file = e.target.files?.[0]; if (!file) return;
                      try {
                        const fd = new FormData(); fd.append("file", file);
                        const res = await fetch("/api/admin/upload", { method:"POST", body:fd });
                        const d = await res.json();
                        if (d.success) set("techSectionImage", d.path);
                        else alert("Upload failed: " + (d.error || "Unknown error"));
                      } catch (err) { alert("Upload error: " + err.message); }
                      finally { e.target.value = ""; }
                    }} />
                </label>
              </div>
            </div>

            {/* Individual points */}
            <div style={{ display:"flex", gap:"10px", marginBottom:"14px" }}>
              <input style={{ ...S.input, flex:1 }} value={newTech} onChange={e => setNewTech(e.target.value)}
                placeholder="e.g. Carbon Composite Reinforced Shell with matte painted finish"
                onKeyDown={e => { if(e.key==="Enter"){ e.preventDefault(); addTech(); }}} />
              <button onClick={addTech} style={{ ...S.btn, padding:"13px 18px", flexShrink:0 }}><i className="fa-solid fa-plus" /></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              {(form.techText || []).map((t, i) => {
                const item = typeof t === "string" ? { text: t, image: "" } : t;
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", background:"#f8faff", borderRadius:"10px", border:"1px solid #f1f5f9" }}>
                    {/* Icon thumbnail or upload */}
                    <label style={{ width:"40px", height:"40px", borderRadius:"8px", border:item.image ? "none" : "2px dashed #e2e8f0", background:item.image ? "transparent" : "#f1f5f9", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", flexShrink:0, overflow:"hidden" }}
                      title={item.image ? "Click to change icon" : "Click to add icon"}>
                      {uploadingTechImg === i ? (
                        <i className="fa-solid fa-spinner fa-spin" style={{ color:"#3257ff", fontSize:"14px" }} />
                      ) : item.image ? (
                        <img src={item.image} alt="icon" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                      ) : (
                        <i className="fa-solid fa-image" style={{ color:"#cbd5e1", fontSize:"16px" }} />
                      )}
                      <input type="file" accept="image/*" style={{ display:"none" }}
                        disabled={uploadingTechImg !== null}
                        onChange={async (e) => {
                          const file = e.target.files?.[0]; if (!file) return;
                          setUploadingTechImg(i);
                          try {
                            const fd = new FormData(); fd.append("file", file);
                            const res = await fetch("/api/admin/upload", { method:"POST", body:fd });
                            const d = await res.json();
                            if (d.success) {
                              const updated = (form.techText || []).map((tt, j) => {
                                const curr = typeof tt === "string" ? { text: tt, image: "" } : tt;
                                return j === i ? { ...curr, image: d.path } : curr;
                              });
                              set("techText", updated);
                            } else { alert("Upload failed: " + (d.error || "Unknown")); }
                          } catch(err) { alert("Upload error: " + err.message); }
                          finally { setUploadingTechImg(null); e.target.value = ""; }
                        }} />
                    </label>
                    <span style={{ flex:1, fontSize:"14px", color:"#334155" }}>{item.text}</span>
                    {item.image && (
                      <button title="Remove icon" onClick={() => {
                        const updated = (form.techText || []).map((tt, j) => {
                          const curr = typeof tt === "string" ? { text: tt, image: "" } : tt;
                          return j === i ? { ...curr, image: "" } : curr;
                        });
                        set("techText", updated);
                      }} style={{ background:"none", border:"none", color:"#94a3b8", cursor:"pointer", padding:"4px", fontSize:"12px" }}>
                        <i className="fa-solid fa-image-slash" />
                      </button>
                    )}
                    <button onClick={() => set("techText", form.techText.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", color:"#ef4444", cursor:"pointer", padding:"4px" }}><i className="fa-solid fa-xmark" /></button>
                  </div>
                );
              })}
              {!(form.techText||[]).length && <p style={{ color:"#94a3b8", fontSize:"13px" }}>No tech points added yet.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Colors & Sizes ─────────────────────────────────────────── */}
      {tab === "colors" && (
        <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
          <div style={S.card}>
            <h2 style={{ fontSize:"18px", fontWeight:800, color:"#1e293b", marginBottom:"8px" }}>Available Colors</h2>
            <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"20px" }}>Colors shown as swatches on the product page.</p>

            {/* Preset colors */}
            <div style={{ marginBottom:"20px" }}>
              <label style={S.label}>Quick Add Preset Colors</label>
              <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" }}>
                {PRESET_COLORS.map(c => {
                  const added = (form.colors||[]).find(x=>x.name===c.name);
                  return (
                    <button key={c.name} onClick={() => addPresetColor(c)} disabled={!!added} style={{
                      display:"flex", alignItems:"center", gap:"6px", padding:"7px 14px", borderRadius:"20px",
                      border:`1.5px solid ${added?"#22c55e":"#e2e8f0"}`, background: added?"#f0fdf4":"#fff",
                      cursor: added?"default":"pointer", fontSize:"13px", fontWeight:600, color: added?"#16a34a":"#334155"
                    }}>
                      <div style={{ width:"14px", height:"14px", borderRadius:"50%", background:c.color, border:"1px solid rgba(0,0,0,0.15)" }} />
                      {c.name} {added && <i className="fa-solid fa-check" style={{ fontSize:"11px" }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom color */}
            <label style={S.label}>Add Custom Color</label>
            <div style={{ display:"flex", gap:"10px", alignItems:"center", marginBottom:"20px" }}>
              <input type="color" value={newColorHex} onChange={e => setNewColorHex(e.target.value)}
                style={{ width:"52px", height:"46px", border:"1.5px solid #e2e8f0", borderRadius:"10px", cursor:"pointer", padding:"2px" }} />
              <input style={{ ...S.input, flex:1 }} value={newColorName} onChange={e => setNewColorName(e.target.value)}
                placeholder="Color name (e.g. Navy Blue)"
                onKeyDown={e => { if(e.key==="Enter"){ e.preventDefault(); addColor(); }}} />
              <button onClick={addColor} style={{ ...S.btn, padding:"13px 18px", flexShrink:0 }}><i className="fa-solid fa-plus" /> Add</button>
            </div>

            {/* Current colors */}
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              {(form.colors||[]).map((c, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"8px 14px", background:"#f8faff", borderRadius:"20px", border:"1px solid #e2e8f0" }}>
                  <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:c.color, border:"1.5px solid rgba(0,0,0,0.15)" }} />
                  <span style={{ fontSize:"14px", fontWeight:600, color:"#334155" }}>{c.name}</span>
                  <button onClick={() => set("colors", form.colors.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", color:"#ef4444", cursor:"pointer", padding:"0 0 0 4px", fontSize:"12px" }}><i className="fa-solid fa-xmark" /></button>
                </div>
              ))}
              {!(form.colors||[]).length && <p style={{ color:"#94a3b8", fontSize:"13px" }}>No colors added yet.</p>}
            </div>
          </div>

          <div style={S.card}>
            <h2 style={{ fontSize:"18px", fontWeight:800, color:"#1e293b", marginBottom:"8px" }}>Available Sizes</h2>
            <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"20px" }}>Size options displayed on the product page.</p>
            <div style={{ display:"flex", gap:"10px", marginBottom:"14px" }}>
              <input style={{ ...S.input, flex:1 }} value={newSize} onChange={e => setNewSize(e.target.value)}
                placeholder="e.g. Regular (54-61 cm)"
                onKeyDown={e => { if(e.key==="Enter"){ e.preventDefault(); addSize(); }}} />
              <button onClick={addSize} style={{ ...S.btn, padding:"13px 18px", flexShrink:0 }}><i className="fa-solid fa-plus" /></button>
            </div>
            <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
              {(form.sizes||[]).map((s, i) => (
                <div key={i} style={S.pill}>
                  {s}
                  <button onClick={() => set("sizes", form.sizes.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", color:"#ef4444", cursor:"pointer", padding:"0", marginLeft:"4px" }}><i className="fa-solid fa-xmark" /></button>
                </div>
              ))}
              {!(form.sizes||[]).length && <p style={{ color:"#94a3b8", fontSize:"13px" }}>No sizes added yet.</p>}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Sizing & Info ──────────────────────────────────────────── */}
      {tab === "sizing" && (
        <div style={S.card}>
          <h2 style={{ fontSize:"18px", fontWeight:800, color:"#1e293b", marginBottom:"24px" }}>Sizing Guide</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:"20px" }}>
            <div>
              <label style={S.label}>Sizing Section Title</label>
              <input style={S.input} value={form.sizingTitle} onChange={e => set("sizingTitle", e.target.value)} placeholder="e.g. Helmet Sizing" />
            </div>
            <div>
              <label style={S.label}>Sizing Guide Text</label>
              <p style={{ fontSize:"12px", color:"#94a3b8", marginBottom:"8px" }}>This appears in the accordion panel on the product page. Use blank lines to create paragraphs.</p>
              <textarea style={{ ...S.input, minHeight:"180px", resize:"vertical", lineHeight:"1.6" }}
                value={form.sizingText} onChange={e => set("sizingText", e.target.value)}
                placeholder={`Our "Iso" range of helmets come fitted with Isofit adjustment system...\n\nTry the helmet out of the box and turn the ratchet to best suit your comfort.`} />
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: Accessories ────────────────────────────────────────────── */}
      {tab === "accessories" && (
        <div style={S.card}>
          <h2 style={{ fontSize:"18px", fontWeight:800, color:"#1e293b", marginBottom:"8px" }}>Accessories & Neck Shield</h2>
          <p style={{ color:"#64748b", fontSize:"14px", marginBottom:"24px" }}>Accessories listed in the product accordion section.</p>
          <div>
            <label style={S.label}>Accessories Included</label>
            <div style={{ display:"flex", gap:"10px", marginBottom:"14px" }}>
              <input style={{ ...S.input, flex:1 }} value={newAccessory} onChange={e => setNewAccessory(e.target.value)}
                placeholder="e.g. Neck Shield Pro (Included in every helmet box)"
                onKeyDown={e => { if(e.key==="Enter"){ e.preventDefault(); addAccessory(); }}} />
              <button onClick={addAccessory} style={{ ...S.btn, padding:"13px 18px", flexShrink:0 }}><i className="fa-solid fa-plus" /></button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"28px" }}>
              {(form.accessories||[]).map((a,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"10px 14px", background:"#f8faff", borderRadius:"10px", border:"1px solid #f1f5f9" }}>
                  <i className="fa-solid fa-shield-halved" style={{ color:"#3257ff", fontSize:"14px" }} />
                  <span style={{ flex:1, fontSize:"14px", color:"#334155" }}>{a}</span>
                  <button onClick={() => set("accessories", form.accessories.filter((_,j)=>j!==i))} style={{ background:"none", border:"none", color:"#ef4444", cursor:"pointer" }}><i className="fa-solid fa-xmark" /></button>
                </div>
              ))}
              {!(form.accessories||[]).length && <p style={{ color:"#94a3b8", fontSize:"13px" }}>No accessories added yet.</p>}
            </div>

            <label style={S.label}>Neck Shield Image Folder</label>
            <p style={{ fontSize:"12px", color:"#94a3b8", marginBottom:"8px" }}>Folder name inside <code>/assets/img/Neck_Shield_Pro/</code> (e.g. <code>Neck_Guard_C7_pro</code>)</p>
            <input style={{ ...S.input, marginBottom:"20px" }} value={form.neckShieldFolder} onChange={e => set("neckShieldFolder", e.target.value)} placeholder="e.g. Neck_Guard_C7_pro" />

            <label style={S.label}>Neck Shield Gallery Files</label>
            <p style={{ fontSize:"12px", color:"#94a3b8", marginBottom:"8px" }}>Filenames inside the folder, one per line (e.g. <code>Main Image.png</code>, <code>1.png</code>)</p>
            <textarea
              style={{ ...S.input, minHeight:"100px", resize:"vertical", fontFamily:"monospace", marginBottom:"14px" }}
              value={(form.neckShieldGallery||[]).join("\n")}
              onChange={e => set("neckShieldGallery", e.target.value.split("\n").map(x=>x.trim()).filter(Boolean))}
              placeholder={"Main Image.png\n1.png\n2.png\n3.png"} />

            {/* Neck Shield Previews */}
            {form.neckShieldFolder && form.neckShieldGallery && form.neckShieldGallery.length > 0 && (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(80px, 1fr))", gap:"10px", marginTop:"10px", padding:"14px", background:"#f8faff", borderRadius:"10px", border:"1px solid #e2e8f0" }}>
                {form.neckShieldGallery.map((img, i) => (
                  <div key={i} style={{ aspectRatio:"1/1", borderRadius:"8px", overflow:"hidden", border:"1px solid #e2e8f0", background:"#fff" }} title={img}>
                    <img src={`/assets/img/Neck_Shield_Pro/${form.neckShieldFolder}/${img}`} alt={`neck shield ${i}`} style={{ width:"100%", height:"100%", objectFit:"contain" }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Save */}
      <div style={{ display:"flex", gap:"12px", justifyContent:"flex-end" }}>
        <button onClick={() => setView("list")} style={S.ghost}>Cancel</button>
        <button onClick={handleSave} disabled={saving} style={S.btn}>
          {saving ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-cloud-arrow-up" />}
          {saving ? "Saving..." : "Save Product"}
        </button>
      </div>
    </div>
  );
}
