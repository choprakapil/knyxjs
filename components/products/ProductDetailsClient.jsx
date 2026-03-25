"use client";
import React, { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/asset";
import { slugify } from "@/lib/utils";
import {
    allProducts,
} from "@/lib/data/products";

export default function ProductDetailsClient({ id }) {
    const getProductSlug = (p) => p.slug || slugify(p.name);
    
    const product = allProducts.find((p) => getProductSlug(p) === id) || {
        id: id,
        name: "Custom KNYX Product",
        image: "1.png",
        category: "Custom Edition",
    };

    const [isCertificateOpen, setIsCertificateOpen] = useState(false);

    const galleryImages = product.gallery || [
        product.image,
        product.image === "4.png" ? "8.png" : "11.png",
        product.image === "4.png" ? "5.png" : "12.png",
        product.image === "4.png" ? "3.png" : "9.png",
    ];
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        setActiveIdx(0);
    }, [product.id]);

    const [activeFeature, setActiveFeature] = useState(null);
    const contentRef = useRef(null);


    return (
        <section ref={contentRef} className="product-details-area pt-120 pb-120" style={{ backgroundColor: "#06080D", minHeight: "100vh" }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="product-main-content">
                            <div className="row mb-60" style={{ alignItems: "flex-start" }}>
                                {/* Left column: Thumbnails (left on desktop) + Image + Accessories */}
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <div className="d-flex flex-column flex-lg-row gap-4">
                                        {/* Thumbnails */}
                                        <div className="d-flex flex-row flex-lg-column gap-3 justify-content-center">
                                            {galleryImages.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={() => setActiveIdx(idx)}
                                                    className="thumbnail-wrapper p-relative tp-round-10"
                                                    style={{
                                                        width: "100px",
                                                        height: "100px",
                                                        backgroundColor: "rgba(255,255,255,0.02)",
                                                        border: activeIdx === idx ? "2px solid #c8ff00" : "1px solid rgba(255,255,255,0.05)",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        cursor: "pointer",
                                                        transition: "all 0.2s ease",
                                                        opacity: activeIdx === idx ? 1 : 0.6,
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.opacity = 1;
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (activeIdx !== idx) e.currentTarget.style.opacity = 0.6;
                                                    }}
                                                >
                                                    <img
                                                        src={`/assets/img/products/${img}`}
                                                        alt={`${product.name} thumbnail ${idx + 1}`}
                                                        className="img-fluid p-relative z-index-1"
                                                        style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain", filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.5))" }}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        {/* Main image */}
                                        <div className="product-image-wrapper p-relative tp-round-10 p-4 mb-0 flex-grow-1" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "550px", transition: "all 0.3s ease" }}>
                                            <div className="glow-effect" style={{ position: "absolute", width: "80%", height: "80%", background: "radial-gradient(circle, rgba(200,255,0,0.1) 0%, rgba(0,0,0,0) 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0 }}></div>
                                            <img
                                                src={`/assets/img/products/${galleryImages[activeIdx]}`}
                                                alt={product.name}
                                                className="img-fluid p-relative z-index-1"
                                                style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))", transition: "opacity 0.3s ease" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Compatible Accessories */}
                                    <div id="tab-accessories" className="tab-section mb-60 p-5 tp-round-10 mt-4" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                        <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-20">Compatible Accessories</h3>
                                        <ul className="list-unstyled tp-text-grey-2 tp-ff-dm fs-18 lh-lg">
                                            {(product.accessories || []).map((acc) => (
                                                <li key={acc} className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus me-2" style={{ color: "#c8ff00" }}></i> {acc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Right column: main info + features + CTA */}
                                <div className="col-lg-6">
                                    <div className="product-info pl-lg-30">
                                        <span className="d-inline-block px-3 py-1 tp-round-10 tp-ff-inter fw-600 fs-12 text-uppercase mb-20" style={{ backgroundColor: "rgba(200,255,0,0.08)", color: "#c8ff00" }}>{product.category}</span>
                                        <h2 className="tp-ff-jakarta fw-700 fs-40 tp-text-common-white mb-20">{product.name}</h2>
                                        <p className="tp-ff-dm fw-400 fs-18 lh-150-per tp-text-grey-2 mb-30">
                                            {product.description}
                                        </p>

                                        <div className="d-flex flex-wrap gap-4 mb-40">
                                            <div>
                                                <h5 className="tp-ff-jakarta fw-600 fs-16 tp-text-common-white mb-15">Available Colors</h5>
                                                <div className="d-flex gap-3">
                                                    {(product.colors || []).map((c) => (
                                                        <div
                                                            key={c.name}
                                                            className="color-circle"
                                                            title={c.name}
                                                            style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: c.color, border: "2px solid rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.2s" }}
                                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c8ff00"; e.currentTarget.style.transform = "scale(1.1)"; }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.transform = "scale(1)"; }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="ms-lg-4">
                                                <h5 className="tp-ff-jakarta fw-600 fs-16 tp-text-common-white mb-15">Select Size</h5>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {(product.sizes || []).map((s) => (
                                                        <button
                                                            key={s}
                                                            className="size-btn tp-ff-inter fw-600"
                                                            style={{ width: "40px", height: "40px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c8ff00"; e.currentTarget.style.color = "#c8ff00"; }}
                                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-column gap-3 mb-40 tp-round-10 p-4" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                            <div className="d-flex align-items-center">
                                                <h5 className="tp-ff-jakarta fw-600 fs-16 tp-text-common-white m-0" style={{ width: "120px" }}>Grille Type:</h5>
                                                <span className="tp-ff-dm fs-16 tp-text-grey-2">{product.grilleType}</span>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <h5 className="tp-ff-jakarta fw-600 fs-16 tp-text-common-white m-0" style={{ width: "120px" }}>Certification:</h5>
                                                <span className="tp-ff-dm fs-16" style={{ color: "#c8ff00" }}>{product.certification}</span>
                                            </div>
                                        </div>

                                        <div className="mb-50">
                                            <h5 className="tp-ff-jakarta fw-600 fs-18 tp-text-common-white mb-15">Helmet Sizing</h5>
                                            <p className="tp-ff-dm tp-text-grey-2 fs-16" style={{ whiteSpace: "pre-line" }}>
                                                {product.sizingText}
                                            </p>
                                        </div>

                                        <div id="tab-features" className="tab-section mb-60">
                                            <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-15">Key Features</h3>
                                            <p className="tp-ff-dm tp-text-grey-2 fs-16 mb-40" style={{ maxWidth: "650px" }}>Every component of the {product.name} is designed for professional-level performance, protection, and comfort.</p>

                                            <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "18px" }}>
                                                {(product.features || []).map((feature, index) => (
                                                    <div
                                                        key={feature.title}
                                                        className="feature-card-item"
                                                        style={{
                                                            background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                                                            border: "1px solid rgba(255,255,255,0.06)",
                                                            borderRadius: "16px",
                                                            padding: "22px 20px 20px 20px",
                                                            position: "relative",
                                                            overflow: "hidden",
                                                            animation: `featureSlideIn 0.5s ease ${index * 0.08}s both`,
                                                            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => setActiveFeature(feature)}
                                                    >
                                                        <div style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "3px",
                                                            height: "100%",
                                                            background: "linear-gradient(180deg, #c8ff00 0%, transparent 100%)",
                                                            opacity: 0.6,
                                                            borderRadius: "3px 0 0 3px",
                                                        }}></div>

                                                        <div className="d-flex align-items-start" style={{ gap: "10px" }}>
                                                                    <div style={{
                                                                        width: "44px",
                                                                        height: "44px",
                                                                        borderRadius: "12px",
                                                                        background: "rgba(200, 255, 0, 0.08)",
                                                                        border: "1px solid rgba(200, 255, 0, 0.15)",
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        justifyContent: "center",
                                                                        flexShrink: 0,
                                                                    }}>
                                                                        <img src={`/assets/img/brands/${feature.iconImg}`} alt={feature.title} style={{ maxWidth: "24px", height: "auto", display: "block", margin: "0 auto", filter: "invert(1)" }} />
                                                                    </div>
                                                                    <div style={{ flex: 1 }}>
                                                                        <h5 className="tp-ff-jakarta fw-600 tp-text-common-white" style={{ fontSize: "16px", letterSpacing: "-0.2px", marginBottom: "6px" }}>{feature.title}</h5>
                                                                        <p className="tp-ff-dm" style={{ fontSize: "14px", lineHeight: 1.5, color: "rgba(255,255,255,0.6)", marginBottom: "10px" }}>{feature.desc}</p>
                                                                <span
                                                                    className="tp-ff-inter fw-600 feature-details-link"
                                                                    style={{
                                                                        fontSize: "12px",
                                                                        color: "#c8ff00",
                                                                        textTransform: "uppercase",
                                                                        letterSpacing: "1px",
                                                                        display: "inline-flex",
                                                                        alignItems: "center",
                                                                        gap: "6px",
                                                                        transition: "all 0.3s ease",
                                                                    }}
                                                                >
                                                                    Details <i className="fa-solid fa-arrow-right" style={{ fontSize: "10px", transition: "transform 0.3s ease" }}></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="product-certificate text-center" style={{ marginTop: "60px" }}>
                                            <button
                                                onClick={() => setIsCertificateOpen(true)}
                                                style={{
                                                    display: "inline-flex",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    padding: "18px 40px",
                                                    background: "linear-gradient(135deg, rgba(200, 255, 0, 0.1) 0%, rgba(200, 255, 0, 0.05) 100%)",
                                                    border: "1px solid rgba(200, 255, 0, 0.25)",
                                                    borderRadius: "12px",
                                                    color: "#c8ff00",
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                    cursor: "pointer",
                                                    transition: "all 0.3s ease",
                                                    letterSpacing: "0.5px",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(200, 255, 0, 0.2) 0%, rgba(200, 255, 0, 0.1) 100%)";
                                                    e.currentTarget.style.borderColor = "rgba(200, 255, 0, 0.4)";
                                                    e.currentTarget.style.transform = "translateY(-2px)";
                                                    e.currentTarget.style.boxShadow = "0 8px 30px rgba(200, 255, 0, 0.15)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(200, 255, 0, 0.1) 0%, rgba(200, 255, 0, 0.05) 100%)";
                                                    e.currentTarget.style.borderColor = "rgba(200, 255, 0, 0.25)";
                                                    e.currentTarget.style.transform = "translateY(0)";
                                                    e.currentTarget.style.boxShadow = "none";
                                                }}
                                            >
                                                <i className="fa-solid fa-certificate" style={{ fontSize: "20px" }}></i>
                                                View Certificate of Authenticity
                                                <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: "14px", opacity: 0.6 }}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Modal + Feature Modal are still rendered by this component */}
            {isCertificateOpen && (
                <div
                    className="certificate-modal d-flex justify-content-center align-items-center"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        backdropFilter: 'blur(10px)',
                        zIndex: 999999,
                        padding: '20px'
                    }}
                    onClick={() => setIsCertificateOpen(false)}
                >
                    <button
                        className="btn-close-modal"
                        style={{
                            position: 'absolute',
                            top: '30px',
                            right: '40px',
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            fontSize: '40px',
                            cursor: 'pointer',
                            zIndex: 9999999
                        }}
                        onClick={(e) => { e.stopPropagation(); setIsCertificateOpen(false); }}
                    >
                        &times;
                    </button>
                    <div
                        className="certificate-content text-center p-relative"
                        style={{
                            maxWidth: '900px',
                            width: '100%',
                            maxHeight: '90vh',
                            animation: 'modalZoomIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="tp-round-10 overflow-hidden" style={{ border: "2px solid #c8ff00", boxShadow: "0 0 50px rgba(200, 255, 0, 0.2)" }}>
                            <div className="bg-white p-5 tp-ff-jakarta" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}>
                                <h1 style={{ color: '#1A1F2B', fontWeight: 800, fontSize: '48px', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px' }}>Certificate of Authenticity</h1>
                                <div style={{ height: '2px', width: '100px', backgroundColor: '#c8ff00', margin: '0 auto 40px auto' }}></div>
                                <h3 style={{ color: '#555', fontSize: '24px', marginBottom: '10px' }}>This certifies that</h3>
                                <h2 style={{ color: '#6B8E23', fontSize: '36px', fontWeight: 700, margin: '20px 0' }}>{product.name}</h2>
                                <h3 style={{ color: '#555', fontSize: '20px', lineHeight: 1.6, maxWidth: '600px', margin: '20px auto' }}>Has undergone rigorous safety testing and meets or exceeds all international sporting safety compliance standards (ISO 9001, CE, BSI).</h3>
                                <div className="mt-5 d-flex justify-content-center align-items-center gap-5">
                                    <div className="text-center">
                                        <div style={{ borderBottom: "1px solid #111", width: "150px", marginBottom: "10px" }}></div>
                                        <span style={{ fontSize: "14px", color: "#666" }}>Quality Assurance Lead</span>
                                    </div>
                                    <div>
                                        <img src={withBasePath('/assets/img/logo/logo.png')} alt="KNYX Logo" style={{ maxWidth: '120px', filter: 'invert(1)' }} />
                                    </div>
                                    <div className="text-center">
                                        <div style={{ borderBottom: "1px solid #111", width: "150px", marginBottom: "10px" }}></div>
                                        <span style={{ fontSize: "14px", color: "#666" }}>Date of Issuance</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeFeature && (
                <div
                    className="feature-detail-overlay"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(0, 0, 0, 0.85)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        zIndex: 999999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "30px",
                        animation: "featureModalOverlayIn 0.25s ease both",
                    }}
                    onClick={() => setActiveFeature(null)}
                    onKeyDown={(e) => { if (e.key === "Escape") setActiveFeature(null); }}
                >
                    <button
                        style={{
                            position: "absolute",
                            top: "24px",
                            right: "32px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff",
                            fontSize: "20px",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.3s ease",
                            zIndex: 10,
                        }}
                        onClick={(e) => { e.stopPropagation(); setActiveFeature(null); }}
                        onMouseEnter={(e) => { e.target.style.background = "rgba(200, 255, 0, 0.15)"; e.target.style.borderColor = "rgba(200, 255, 0, 0.3)"; }}
                        onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.06)"; e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <div
                        style={{
                            maxWidth: "720px",
                            width: "100%",
                            maxHeight: "85vh",
                            overflowY: "auto",
                            background: "linear-gradient(165deg, rgba(20, 24, 35, 0.98) 0%, rgba(10, 12, 18, 0.99) 100%)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "24px",
                            padding: "0",
                            animation: "featureModalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
                            boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(200, 255, 0, 0.04)",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with Icon */}
                        <div style={{
                            padding: "40px 40px 0 40px",
                            position: "relative",
                        }}>
                            <div style={{
                                position: "absolute",
                                top: "20px",
                                left: "30px",
                                width: "100px",
                                height: "100px",
                                background: "radial-gradient(circle, rgba(200, 255, 0, 0.08) 0%, transparent 70%)",
                                borderRadius: "50%",
                                filter: "blur(20px)",
                            }}></div>

                            <div className="d-flex align-items-center gap-3 mb-20" style={{ position: "relative" }}>
                                <div style={{
                                    width: "56px",
                                    height: "56px",
                                    borderRadius: "16px",
                                    background: "rgba(200, 255, 0, 0.1)",
                                    border: "1px solid rgba(200, 255, 0, 0.2)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    <img src={`/assets/img/brands/${activeFeature.iconImg}`} alt={activeFeature.title} style={{ maxWidth: "28px", height: "auto", display: "block", margin: "0 auto", filter: "invert(1)" }} />
                                </div>
                                <div>
                                    <span className="tp-ff-inter fw-600" style={{
                                        fontSize: "11px",
                                        color: "#c8ff00",
                                        textTransform: "uppercase",
                                        letterSpacing: "2px",
                                    }}>Feature Detail</span>
                                    <h3 className="tp-ff-jakarta fw-700 tp-text-common-white m-0" style={{ fontSize: "24px", letterSpacing: "-0.5px", lineHeight: 1.3 }}>
                                        {activeFeature.detail.headline}
                                    </h3>
                                </div>
                            </div>

                            <div style={{
                                height: "1px",
                                background: "linear-gradient(90deg, rgba(200, 255, 0, 0.3) 0%, rgba(255,255,255,0.05) 100%)",
                            }}></div>
                        </div>

                        <div style={{ padding: "28px 40px 40px 40px" }}>
                            <p className="tp-ff-dm" style={{
                                fontSize: "15px",
                                lineHeight: 1.8,
                                color: "rgba(255,255,255,0.65)",
                                marginBottom: "30px",
                            }}>
                                {activeFeature.detail.intro}
                            </p>

                            <h5 className="tp-ff-jakarta fw-600 tp-text-common-white mb-15" style={{ fontSize: "16px", letterSpacing: "-0.2px" }}>
                                <i className="fa-solid fa-check-double" style={{ color: "#c8ff00", marginRight: "8px", fontSize: "14px" }}></i>
                                Key Highlights
                            </h5>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "10px",
                                marginBottom: "30px",
                            }}>
                                {activeFeature.detail.highlights.map((h, i) => (
                                    <div key={i} className="d-flex align-items-start gap-2" style={{
                                        padding: "12px 14px",
                                        background: "rgba(255,255,255,0.02)",
                                        borderRadius: "10px",
                                        border: "1px solid rgba(255,255,255,0.04)",
                                    }}>
                                        <i className="fa-solid fa-circle-check" style={{
                                            color: "#c8ff00",
                                            fontSize: "14px",
                                            marginTop: "3px",
                                            flexShrink: 0,
                                        }}></i>
                                        <span className="tp-ff-dm" style={{
                                            fontSize: "13px",
                                            lineHeight: 1.6,
                                            color: "rgba(255,255,255,0.55)",
                                        }}>{h}</span>
                                    </div>
                                ))}
                            </div>

                            <h5 className="tp-ff-jakarta fw-600 tp-text-common-white mb-15" style={{ fontSize: "16px", letterSpacing: "-0.2px" }}>
                                <i className="fa-solid fa-list-check" style={{ color: "#c8ff00", marginRight: "8px", fontSize: "14px" }}></i>
                                Technical Specifications
                            </h5>
                            <div style={{
                                borderRadius: "12px",
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}>
                                {Object.entries(activeFeature.detail.specs).map(([key, val], i) => (
                                    <div key={key} className="d-flex" style={{
                                        borderBottom: i < Object.entries(activeFeature.detail.specs).length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                                    }}>
                                        <div className="tp-ff-inter fw-600" style={{
                                            width: "200px",
                                            flexShrink: 0,
                                            padding: "14px 18px",
                                            fontSize: "13px",
                                            color: "rgba(255,255,255,0.45)",
                                            background: "rgba(255,255,255,0.02)",
                                            textTransform: "uppercase",
                                            letterSpacing: "0.5px",
                                        }}>{key}</div>
                                        <div className="tp-ff-dm" style={{
                                            flex: 1,
                                            padding: "14px 18px",
                                            fontSize: "14px",
                                            color: "rgba(255,255,255,0.7)",
                                        }}>{val}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
