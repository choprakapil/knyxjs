"use client";
import React, { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/asset";
import {
    allProducts,
    getFeature,
} from "@/lib/data/products";
import { siteData } from "@/lib/data/site";

export default function ProductDetailsClient({ id }) {
    const product = allProducts.find((p) => p.slug === id) || {
        id: id,
        name: "Custom KNYX Product",
        image: "1.png",
        category: "Custom Edition",
    };

    const [isCertificateOpen, setIsCertificateOpen] = useState(false);
    const [isSizingOpen, setIsSizingOpen] = useState(false);
    const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "");

    const galleryImages = product.gallery || [product.image];
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        setActiveIdx(0);
        setSelectedSize(product.sizes ? product.sizes[0] : "");
    }, [product.id]);

    const [activeFeature, setActiveFeature] = useState(null);
    const contentRef = useRef(null);

    // Safely resolve features from featureIds
    const resolvedFeatures = (product.featureIds || []).map((fid) => getFeature(fid)).filter(Boolean);

    return (
        <section ref={contentRef} className="product-details-area pt-120 pb-120" style={{ backgroundColor: "#06080D", minHeight: "100vh" }}>
            <style jsx>{`
                .sticky-column {
                    position: relative;
                }
                @media (min-width: 768px) {
                    .sticky-column {
                        position: sticky;
                        top: 100px;
                    }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(200, 255, 0, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                @keyframes featureSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="product-main-content">
                            <div className="row mb-60">
                                {/* Left column: Gallery + Accordions */}
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <div className="sticky-column">
                                        <div className="product-gallery d-flex gap-3 mb-4" style={{ height: "450px" }}>
                                            {/* Thumbnails */}
                                            <div className="thumbnails d-flex flex-column gap-3 overflow-y-auto pr-2 custom-scrollbar" style={{ width: "100px", flexShrink: 0 }}>
                                                {(galleryImages || []).map((img, idx) => (
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
                                                            flexShrink: 0
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
                                            <div className="product-image-wrapper p-relative tp-round-10 p-4 mb-0 flex-grow-1" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", alignItems: "center", transition: "all 0.3s ease", height: "100%" }}>
                                                <div className="glow-effect" style={{ position: "absolute", width: "80%", height: "80%", background: "radial-gradient(circle, rgba(200,255,0,0.1) 0%, rgba(0,0,0,0) 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0 }}></div>
                                                <img
                                                    src={`/assets/img/products/${galleryImages[activeIdx]}`}
                                                    alt={product.name}
                                                    className="img-fluid p-relative z-index-1"
                                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))", transition: "opacity 0.3s ease" }}
                                                />
                                            </div>
                                        </div>

                                        {/* Accessories & Sizing Unified Box */}
                                        <div className="tab-section mb-60 p-5 tp-round-10" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                            {/* Accessories Accordion */}
                                            <div className="mb-30 pb-30 border-bottom border-secondary" style={{ borderColor: "rgba(255,255,255,0.05) !important" }}>
                                                <div 
                                                    className="d-flex align-items-center justify-content-between cursor-pointer" 
                                                    onClick={() => setIsAccessoriesOpen(!isAccessoriesOpen)}
                                                >
                                                    <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-24 m-0">{siteData.ui.accessoriesHeading}</h3>
                                                    <i className={`fa-solid ${isAccessoriesOpen ? "fa-minus" : "fa-plus"}`} style={{ color: "#c8ff00", fontSize: "18px", transition: "transform 0.3s ease" }}></i>
                                                </div>
                                                <div className="overflow-hidden" style={{ maxHeight: isAccessoriesOpen ? "200px" : "0", transition: "all 0.4s ease-in-out", opacity: isAccessoriesOpen ? 1 : 0 }}>
                                                    <p className="tp-ff-dm tp-text-grey-2 fs-16 mt-20 mb-0">
                                                        {(product.accessories || []).join(", ")}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Sizing Accordion */}
                                            <div>
                                                <div 
                                                    className="d-flex align-items-center justify-content-between cursor-pointer" 
                                                    onClick={() => setIsSizingOpen(!isSizingOpen)}
                                                >
                                                    <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-24 m-0">{product.sizingTitle || siteData.ui.sizingHeading}</h3>
                                                    <i className={`fa-solid ${isSizingOpen ? "fa-minus" : "fa-plus"}`} style={{ color: "#c8ff00", fontSize: "18px", transition: "transform 0.3s ease" }}></i>
                                                </div>
                                                <div className="overflow-hidden" style={{ maxHeight: isSizingOpen ? "500px" : "0", transition: "all 0.4s ease-in-out", opacity: isSizingOpen ? 1 : 0 }}>
                                                    <p className="tp-ff-dm tp-text-grey-2 fs-16 mt-20 mb-0" style={{ whiteSpace: "pre-line" }}>
                                                        {product.sizingText}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
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
                                                <h5 className="tp-ff-jakarta fw-600 fs-16 tp-text-common-white mb-15">{siteData.ui.colorsHeading}</h5>
                                                <div className="d-flex gap-3">
                                                    {(product.colors || []).map((c) => (
                                                        <div
                                                            key={c.name}
                                                            className="color-circle"
                                                            title={c.name}
                                                            style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: c.color, border: "2px solid rgba(255,255,255,0.2)", cursor: "pointer", transition: "all 0.2s" }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="ms-lg-4">
                                                <h5 className="tp-ff-jakarta fw-600 fs-16 tp-text-common-white mb-15">{siteData.ui.sizeHeading}</h5>
                                                <div className="d-flex flex-wrap gap-3">
                                                    {(product.sizes || []).map((s) => (
                                                        <button
                                                            key={s}
                                                            onClick={() => setSelectedSize(s)}
                                                            className="size-btn tp-ff-inter fw-600"
                                                            style={{ 
                                                                background: "transparent", 
                                                                border: "none", 
                                                                color: selectedSize === s ? "#fff" : "rgba(255,255,255,0.4)", 
                                                                display: "flex", 
                                                                alignItems: "center", 
                                                                justifyContent: "flex-start", 
                                                                cursor: "pointer", 
                                                                transition: "all 0.3s",
                                                                padding: "0",
                                                                marginRight: "20px",
                                                                fontSize: "16px",
                                                                textDecoration: "none"
                                                            }}
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-wrap gap-3 mb-40 tp-round-10 p-3" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                            <div className="d-flex align-items-center flex-grow-1" style={{ minWidth: "180px", padding: "5px 10px" }}>
                                                <h5 className="tp-ff-jakarta fw-600 fs-14 tp-text-common-white m-0" style={{ opacity: 0.6 }}>{siteData.ui.grilleLabel}</h5>
                                                <span className="tp-ff-dm fs-15 tp-text-grey-2 fw-600">{product.grilleType}</span>
                                            </div>
                                            <div 
                                                className="d-flex align-items-center flex-grow-1 border-left border-secondary pl-3" 
                                                onClick={() => setIsCertificateOpen(true)}
                                                style={{ cursor: "pointer", borderLeft: "1px solid rgba(255,255,255,0.1)", minWidth: "180px", padding: "5px 10px" }}
                                            >
                                                <h5 className="tp-ff-jakarta fw-600 fs-14 tp-text-common-white m-0" style={{ opacity: 0.6 }}>{siteData.ui.certLabel}</h5>
                                                <span className="tp-ff-dm fs-15 cert-text fw-600" style={{ color: "#c8ff00" }}>{product.certification}</span>
                                            </div>
                                        </div>

                                        <div id="tab-features" className="tab-section mb-60">
                                            <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-10">{siteData.ui.keyFeaturesHeading}</h3>
                                            <p className="tp-ff-dm tp-text-grey-2 fs-15 mb-30" style={{ maxWidth: "600px" }}>Every component of the {product.name} is designed for professional-level performance, protection, and comfort.</p>

                                            <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
                                                {resolvedFeatures.map((feature, idx) => (
                                                    <div
                                                        key={feature.id}
                                                        className="feature-card-item"
                                                        style={{
                                                            background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                                                            border: "1px solid rgba(255,255,255,0.06)",
                                                            borderRadius: "16px",
                                                            padding: "22px 20px 20px 20px",
                                                            position: "relative",
                                                            overflow: "hidden",
                                                            animation: `featureSlideIn 0.5s ease ${idx * 0.08}s both`,
                                                            transition: "all 0.35s ease",
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
                                                            <div style={{ flex: 1, paddingRight: "80px" }}>
                                                                <h5 className="tp-ff-jakarta fw-600 tp-text-common-white" style={{ fontSize: "16px", letterSpacing: "-0.2px", marginBottom: "4px" }}>{feature.title}</h5>
                                                                <p className="tp-ff-dm" style={{ fontSize: "14px", lineHeight: 1.4, color: "rgba(255,255,255,0.6)", marginBottom: "0" }}>{feature.desc}</p>
                                                            </div>
                                                            <span className="tp-ff-inter fw-600 feature-details-link" style={{ position: "absolute", top: "22px", right: "20px", fontSize: "12px", color: "#c8ff00" }}>
                                                                Details <i className="fa-solid fa-arrow-right" style={{ fontSize: "10px" }}></i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                            animation: 'modalZoomIn 0.3s'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="tp-round-10 overflow-hidden" style={{ border: "2px solid #c8ff00", boxShadow: "0 0 50px rgba(200, 255, 0, 0.2)" }}>
                            <div className="bg-white p-5 tp-ff-jakarta" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h1 style={{ color: '#1A1F2B', fontWeight: 800, fontSize: '48px', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px' }}>{siteData.ui.certificate.title}</h1>
                                <div style={{ height: '2px', width: '100px', backgroundColor: '#c8ff00', margin: '0 auto 40px auto' }}></div>
                                <h3 style={{ color: '#555', fontSize: '24px', marginBottom: '10px' }}>{siteData.ui.certificate.certifiesText}</h3>
                                <h2 style={{ color: '#6B8E23', fontSize: '36px', fontWeight: 700, margin: '20px 0' }}>{product.name}</h2>
                                <h3 style={{ color: '#555', fontSize: '20px', lineHeight: 1.6, maxWidth: '600px', margin: '20px auto' }}>{siteData.ui.certificate.complianceText}</h3>
                                <div className="mt-5 d-flex justify-content-center align-items-center gap-5">
                                    <div className="text-center">
                                        <div style={{ borderBottom: "1px solid #111", width: "150px", marginBottom: "10px" }}></div>
                                        <span style={{ fontSize: "14px", color: "#666" }}>{siteData.ui.certificate.qaLeadLabel}</span>
                                    </div>
                                    <div>
                                        <img src={withBasePath(siteData.logo.dark)} alt={siteData.logo.alt} style={{ maxWidth: '120px' }} />
                                    </div>
                                    <div className="text-center">
                                        <div style={{ borderBottom: "1px solid #111", width: "150px", marginBottom: "10px" }}></div>
                                        <span style={{ fontSize: "14px", color: "#666" }}>{siteData.ui.certificate.issuanceDateLabel}</span>
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
                        zIndex: 999999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "30px",
                    }}
                    onClick={() => setActiveFeature(null)}
                >
                    <button
                        style={{
                            position: "absolute",
                            top: "24px",
                            right: "32px",
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            color: "#fff",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 10,
                        }}
                        onClick={(e) => { e.stopPropagation(); setActiveFeature(null); }}
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
                            padding: "40px",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="d-flex align-items-center gap-3 mb-20">
                            <div style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "16px",
                                background: "rgba(200, 255, 0, 0.1)",
                                border: "1px solid rgba(200, 255, 0, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <img src={`/assets/img/brands/${activeFeature.iconImg}`} alt={activeFeature.title} style={{ maxWidth: "28px", height: "auto", filter: "invert(1)" }} />
                            </div>
                            <div>
                                <span style={{ fontSize: "11px", color: "#c8ff00", textTransform: "uppercase", letterSpacing: "2px" }}>{siteData.ui.featureDetailBadge}</span>
                                <h3 className="tp-ff-jakarta fw-700 tp-text-common-white m-0" style={{ fontSize: "24px" }}>{activeFeature.detail.headline}</h3>
                            </div>
                        </div>

                        <p className="tp-ff-dm" style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: "30px" }}>
                            {activeFeature.detail.intro}
                        </p>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "30px" }}>
                            {activeFeature.detail.highlights.map((h, i) => (
                                <div key={i} className="d-flex align-items-start gap-2" style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
                                    <i className="fa-solid fa-circle-check" style={{ color: "#c8ff00", fontSize: "14px", marginTop: "3px" }}></i>
                                    <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>{h}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                            {Object.entries(activeFeature.detail.specs).map(([key, val], i) => (
                                <div key={key} className="d-flex" style={{ borderBottom: i < Object.entries(activeFeature.detail.specs).length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                                    <div style={{ width: "200px", padding: "14px 18px", fontSize: "13px", color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.02)", textTransform: "uppercase" }}>{key}</div>
                                    <div style={{ padding: "14px 18px", fontSize: "14px", color: "rgba(255,255,255,0.7)" }}>{val}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
