"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { withBasePath } from "@/lib/asset";
import { getFeature } from "@/lib/data/products";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { findProductBySlug } from "@/lib/catalog";
import { getProductAssetSrc } from "@/lib/mapProduct";

export default function ProductDetailsClient({ id }) {
    const { site: siteData } = useSiteSettings();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isCertificateOpen, setIsCertificateOpen] = useState(false);
    const [isSizingOpen, setIsSizingOpen] = useState(false);
    const [isAccessoriesOpen, setIsAccessoriesOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [activeIdx, setActiveIdx] = useState(0);
    const [activeFeature, setActiveFeature] = useState(null);
    const [activeNeckShieldIdx, setActiveNeckShieldIdx] = useState(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data.success) {
                    const found = findProductBySlug(data.data, id);
                    setProduct(
                        found || {
                            id,
                            slug: id,
                            name: "Custom KNYX Product",
                            image: "1.png",
                            category: "Custom Edition",
                        }
                    );
                    return;
                }
            } catch (err) {
                console.error("Failed to load product:", err);
            }
            setProduct(
                findProductBySlug([], id) || {
                    id,
                    slug: id,
                    name: "Custom KNYX Product",
                    image: "1.png",
                    category: "Custom Edition",
                }
            );
        };
        load().finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (!product) return;
        setActiveIdx(0);
        setSelectedSize(product.sizes ? product.sizes[0] : "");
    }, [product?.id]);

    if (loading || !product) {
        return (
            <section className="product-details-area pt-120 pb-120" style={{ backgroundColor: "#06080D", minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p className="tp-text-grey-2">Loading product...</p>
            </section>
        );
    }

    const galleryImages = product.gallery || [product.image];
    const resolvedFeatures = (product.featureIds || []).map((fid) => {
        const staticF = getFeature(fid);
        const dynamicF = siteData.features?.[fid];
        if (!staticF) return null;
        if (!dynamicF) return staticF;
        return {
            ...staticF,
            title: dynamicF.title || staticF.title,
            desc: dynamicF.desc || staticF.desc,
            disablePopup: dynamicF.disablePopup === true,
            detail: {
                ...staticF.detail,
                headline: dynamicF.detail?.headline || staticF.detail?.headline || "",
                intro: dynamicF.detail?.intro || staticF.detail?.intro || "",
                highlights: dynamicF.detail?.highlights || staticF.detail?.highlights || [],
                specs: dynamicF.detail?.specs || staticF.detail?.specs || {},
                image: dynamicF.detail?.image || staticF.detail?.image || "",
            }
        };
    }).filter(Boolean);

    return (
        <section ref={contentRef} className="product-details-area pt-120 pb-120" style={{ backgroundColor: "#06080D", minHeight: "100vh" }}>
            <style jsx>{`
                .feature-card-item:hover {
                    background: linear-gradient(145deg, rgba(50, 87, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%) !important;
                    border-color: rgba(50, 87, 255, 0.3) !important;
                    transform: translateY(-2px);
                }
                .feature-card-item:hover .feature-details-link {
                    color: #4D9FFF !important;
                }
                .sticky-column {
                    position: relative;
                }
                @media (min-width: 992px) {
                    .thumbnails {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        width: 100px;
                        height: 100%;
                        overflow-y: auto;
                        padding-top: 30px;
                        padding-bottom: 30px;
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }
                    .thumbnail-wrapper {
                        width: 100px;
                        height: 100px;
                        flex-shrink: 0;
                    }
                    .sticky-column {
                        position: sticky;
                        top: 100px;
                    }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(50, 87, 255, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                #thumbnails-container::-webkit-scrollbar {
                    display: none;
                }
                @keyframes featureSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes modalZoomIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                @media (max-width: 991px) {
                    .product-details-area { padding-top: 60px !important; padding-bottom: 40px !important; }
                    .tab-section.mb-60 { margin-bottom: 30px !important; }
                    .row.mb-60 { margin-bottom: 30px !important; }
                    .mb-60 { margin-bottom: 30px !important; }
                    .mb-40 { margin-bottom: 25px !important; }
                    .mb-30 { margin-bottom: 20px !important; }
                    
                    .product-gallery { height: auto !important; flex-direction: column !important; gap: 20px !important; }
                    .thumbnails-slider-wrapper { 
                        width: 100% !important; 
                        height: auto !important; 
                        order: 2 !important; 
                        position: relative !important;
                    }
                    #thumbnails-container { 
                        display: flex !important;
                        flex-direction: row !important; 
                        flex-wrap: nowrap !important;
                        justify-content: flex-start !important;
                        width: 100% !important; 
                        height: auto !important; 
                        overflow-x: auto !important; 
                        overflow-y: hidden !important; 
                        padding: 10px 0 !important;
                        -webkit-overflow-scrolling: touch;
                        gap: 12px !important;
                        scrollbar-width: none;
                    }
                    #thumbnails-container::-webkit-scrollbar {
                        display: none !important;
                    }
                    .thumbnail-wrapper { 
                        width: 80px !important; 
                        height: 80px !important; 
                        flex-shrink: 0 !important; 
                    }
                    .product-image-wrapper { 
                        height: 350px !important; 
                        padding: 20px !important; 
                        border-radius: 16px !important;
                        order: 1 !important;
                    }
                    .nav-btn-v { display: none !important; }
                    
                    /* Mobile H-Arrows */
                    .mobile-nav-arrow {
                        display: flex !important;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 30px;
                        height: 30px;
                        background: rgba(50, 87, 255, 0.4);
                        border: none;
                        color: #fff;
                        border-radius: 50%;
                        align-items: center;
                        justify-content: center;
                        z-index: 10;
                    }
                    .mobile-nav-arrow.left { left: -5px; }
                    .mobile-nav-arrow.right { right: -5px; }
                    
                    .product-info { padding-left: 0 !important; margin-top: 40px; }
                    .fs-40 { font-size: 30px !important; }
                    .fs-28 { font-size: 20px !important; }
                    .fs-24 { font-size: 18px !important; }
                    .tab-section { padding: 25px 20px !important; }
                    
                    .features-grid { grid-template-columns: 1fr !important; }
                    .feature-card-item { padding: 20px !important; }
                    .feature-title-wrapper { padding-right: 0 !important; }
                }

                @media (min-width: 992px) {
                    .mobile-nav-arrow { display: none !important; }
                }

                @media (max-width: 767px) {
                    .product-image-wrapper { height: 300px !important; }
                    .fs-40 { font-size: 24px !important; }
                    .d-flex.flex-wrap.gap-4 { gap: 15px !important; flex-direction: column; align-items: flex-start !important; }
                    .ms-auto.text-end { text-align: left !important; margin-left: 0 !important; width: 100%; }
                    .justify-content-end { justify-content: flex-start !important; }
                    .feature-card-item { padding: 15px !important; }
                    .feature-card-item div[style*="paddingRight: 80px"] { padding-right: 0 !important; }
                    
                    /* Cert & Grille section */
                    .d-flex.flex-wrap.gap-3.mb-40 { 
                        flex-direction: column !important; 
                        gap: 0 !important; 
                        padding: 15px !important;
                    }
                    .d-flex.align-items-center.flex-grow-1.justify-content-between { 
                        width: 100% !important; 
                        border-left: none !important; 
                        padding: 12px 0 !important;
                        border-bottom: 1px solid rgba(255,255,255,0.05) !important;
                        display: flex !important;
                        flex-direction: row !important;
                        align-items: center !important;
                        justify-content: space-between !important;
                    }
                    .d-flex.align-items-center.flex-grow-1.justify-content-between:last-child {
                        border-bottom: none !important;
                    }
                    .cert-text { 
                        font-size: 14px !important; 
                        text-align: right !important;
                        white-space: nowrap !important;
                    }
                    .tp-ff-jakarta.fw-600.fs-14 {
                        font-size: 11px !important;
                        text-transform: uppercase !important;
                        letter-spacing: 1px !important;
                    }
                }
            `}</style>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="product-main-content">
                            <div className="mb-40">
                                <Link 
                                    href={`/products/${product.categorySlug}`} 
                                    className="tp-ff-inter fw-600 fs-14 tp-text-common-white d-inline-block" 
                                    style={{ textDecoration: 'none', opacity: 0.8, transition: 'all 0.2s' }}
                                    onMouseEnter={(e) => { e.target.style.opacity = 1; e.target.style.color = '#3257ff'; }}
                                    onMouseLeave={(e) => { e.target.style.opacity = 0.8; e.target.style.color = '#ffffff'; }}
                                >
                                    <i className="fa-solid fa-arrow-left me-2"></i> Back to {product.categorySlug.charAt(0).toUpperCase() + product.categorySlug.slice(1)}s
                                </Link>
                            </div>
                            <div className="row mb-60">
                                {/* Left column: Gallery + Accordions */}
                                <div className="col-lg-6 mb-4 mb-lg-0">
                                    <div className="sticky-column">
                                        <div className="product-gallery d-flex gap-3 mb-4" style={{ height: "550px" }}>
                                            {/* Thumbnails Slider Container */}
                                            <div className="thumbnails-slider-wrapper p-relative">
                                                 {/* Nav Up (Desktop) */}
                                                 {(galleryImages?.length > 4) && (
                                                     <button 
                                                         className="nav-btn-v up d-none d-lg-flex" 
                                                         onClick={(e) => {
                                                             e.stopPropagation();
                                                             const el = document.getElementById("thumbnails-container");
                                                             if (el) el.scrollTop -= 120;
                                                         }}
                                                         style={{ 
                                                             position: 'absolute', top: '0', left: '0', right: '0', 
                                                             height: '30px', background: 'linear-gradient(to bottom, rgba(6,8,13,1) 0%, rgba(6,8,13,0) 100%)', 
                                                             border: 'none', color: '#fff', cursor: 'pointer', zIndex: 100,
                                                             display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                         }}
                                                     >
                                                         <i className="fa-solid fa-chevron-up fs-12"></i>
                                                     </button>
                                                 )}

                                                 {/* Mobile Arrows (Visible only on mobile via CSS) */}
                                                 <button 
                                                     className="mobile-nav-arrow left"
                                                     onClick={(e) => {
                                                         e.stopPropagation();
                                                         const el = document.getElementById("thumbnails-container");
                                                         if (el) el.scrollLeft -= 100;
                                                     }}
                                                 >
                                                     <i className="fa-solid fa-chevron-left"></i>
                                                 </button>
                                                 <button 
                                                     className="mobile-nav-arrow right"
                                                     onClick={(e) => {
                                                         e.stopPropagation();
                                                         const el = document.getElementById("thumbnails-container");
                                                         if (el) el.scrollLeft += 100;
                                                     }}
                                                 >
                                                     <i className="fa-solid fa-chevron-right"></i>
                                                 </button>

                                                 {/* Thumbnails Container */}
                                                 <div 
                                                     id="thumbnails-container"
                                                     className="thumbnails custom-scrollbar" 
                                                 >
                                                     {(galleryImages || []).map((img, idx) => (
                                                         <div
                                                             key={idx}
                                                             onClick={() => setActiveIdx(idx)}
                                                             className="thumbnail-wrapper p-relative tp-round-10"
                                                             style={{
                                                                 backgroundColor: "rgba(255,255,255,0.02)",
                                                                 border: activeIdx === idx ? "2px solid #3257ff" : "1px solid rgba(255,255,255,0.05)",
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
                                                                 src={getProductAssetSrc(product, withBasePath, img)}
                                                                 alt={`${product.name} thumbnail ${idx + 1}`}
                                                                 className="img-fluid p-relative z-index-1"
                                                                 style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain", filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.5))" }}
                                                             />
                                                         </div>
                                                     ))}
                                                 </div>

                                                 {/* Nav Down (Desktop) */}
                                                 {(galleryImages?.length > 4) && (
                                                     <button 
                                                         className="nav-btn-v down d-none d-lg-flex" 
                                                         onClick={(e) => {
                                                             e.stopPropagation();
                                                             const el = document.getElementById("thumbnails-container");
                                                             if (el) el.scrollTop += 120;
                                                         }}
                                                         style={{ 
                                                             position: 'absolute', bottom: '0', left: '0', right: '0', 
                                                             height: '30px', background: 'linear-gradient(to top, rgba(6,8,13,1) 0%, rgba(6,8,13,0) 100%)', 
                                                             border: 'none', color: '#fff', cursor: 'pointer', zIndex: 100,
                                                             display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                         }}
                                                     >
                                                         <i className="fa-solid fa-chevron-down fs-12"></i>
                                                     </button>
                                                 )}
                                             </div>

                                            {/* Main image */}
                                            <div className="product-image-wrapper p-relative tp-round-10 p-4 mb-0 flex-grow-1" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", alignItems: "center", transition: "all 0.3s ease", height: "100%" }}>
                                                <div className="glow-effect" style={{ position: "absolute", width: "80%", height: "80%", background: "radial-gradient(circle, rgba(27,59,138,0.1) 0%, rgba(0,0,0,0) 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0 }}></div>
                                                <img
                                                    src={getProductAssetSrc(product, withBasePath, galleryImages[activeIdx])}
                                                    alt={product.name}
                                                    className="img-fluid p-relative z-index-1"
                                                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))", transition: "opacity 0.3s ease" }}
                                                />
                                            </div>
                                        </div>

                                        {/* Neck Shield & Sizing Unified Box */}
                                        <div className="tab-section mb-60 p-5 tp-round-10" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                            {/* Neck Shield Accordion */}
                                            <div className="mb-30 pb-30 border-bottom border-secondary" style={{ borderColor: "rgba(255,255,255,0.05) !important" }}>
                                                <div
                                                    className="d-flex align-items-center justify-content-between cursor-pointer"
                                                    onClick={() => setIsAccessoriesOpen(!isAccessoriesOpen)}
                                                >
                                                    <div className="d-flex align-items-center" style={{ gap: "12px" }}>
                                                        <img src="/assets/img/brands/logo-2.png" alt="Neck Shield" style={{ width: "32px", height: "auto", filter: "invert(1)" }} />
                                                        <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-24 m-0">{siteData.ui.accessoriesHeading}</h3>
                                                    </div>
                                                    <i className={`fa-solid ${isAccessoriesOpen ? "fa-minus" : "fa-plus"}`} style={{ color: "#3257ff", fontSize: "18px", transition: "transform 0.3s ease" }}></i>
                                                </div>
                                                <div className="overflow-hidden" style={{ maxHeight: isAccessoriesOpen ? "700px" : "0", transition: "all 0.4s ease-in-out", opacity: isAccessoriesOpen ? 1 : 0 }}>
                                                    <ul className="tp-ff-dm tp-text-grey-2 fs-16 mt-20 mb-30 ps-3">
                                                        <li className="mb-2">Lightweight Profiled Fit</li>
                                                        <li className="mb-2">Built with Impact Modified Polymer and High Density EPP</li>
                                                        <li>Included with Each Helmet Box</li>
                                                    </ul>

                                                    {/* Neck Shield Image Grid */}
                                                    {product.neckShieldFolder && product.neckShieldGallery && (
                                                        <div className="row g-3">
                                                            {product.neckShieldGallery.map((imgFile, i) => (
                                                                <div key={i} className="col-6 col-sm-3">
                                                                    <div
                                                                        className="tp-round-10 overflow-hidden cursor-pointer p-relative"
                                                                        style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center" }}
                                                                        onClick={() => setActiveNeckShieldIdx(i)}
                                                                    >
                                                                        <img
                                                                            src={`/assets/img/Neck_Shield_Pro/${product.neckShieldFolder}/${imgFile}`}
                                                                            alt={`Neck Shield Detail ${i + 1}`}
                                                                            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", transition: "transform 0.3s ease" }}
                                                                            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
                                                                            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Sizing Accordion */}
                                            <div>
                                                <div
                                                    className="d-flex align-items-center justify-content-between cursor-pointer"
                                                    onClick={() => setIsSizingOpen(!isSizingOpen)}
                                                >
                                                    <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-24 m-0">{product.sizingTitle || siteData.ui.sizingHeading}</h3>
                                                    <i className={`fa-solid ${isSizingOpen ? "fa-minus" : "fa-plus"}`} style={{ color: "#3257ff", fontSize: "18px", transition: "transform 0.3s ease" }}></i>
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
                                        <div className="mb-30">
                                            <span className="tp-ff-jakarta fw-600 fs-16 tp-text-common-white d-inline-block text-uppercase ls-1 title-slide-gradient">{product.category}</span>
                                        </div>
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
                                                            style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: c.color, border: "2px solid rgba(255,255,255,0.2)", cursor: "default", transition: "all 0.2s" }}
                                                        ></div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="ms-auto text-end">
                                                <h5 className="tp-ff-jakarta fw-600 fs-16 tp-text-common-white mb-15">{siteData.ui.sizeHeading}</h5>
                                                <div className="d-flex flex-wrap gap-3 justify-content-end">
                                                    {(product.sizes || []).map((s) => (
                                                        <button
                                                            key={s}
                                                            onClick={() => setSelectedSize(s)}
                                                            className="size-btn tp-ff-inter fw-600"
                                                            style={{
                                                                background: "transparent",
                                                                border: "none",
                                                                color: selectedSize === s ? "#4D9FFF" : "rgba(255,255,255,0.4)",
                                                                textShadow: selectedSize === s ? "0 0 15px rgba(77, 159, 255, 0.6)" : "none",
                                                                letterSpacing: selectedSize === s ? "0.5px" : "normal",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "flex-start",
                                                                cursor: "default",
                                                                transition: "all 0.3s",
                                                                padding: "0",
                                                                marginRight: "0",
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
                                            <div className="d-flex align-items-center flex-grow-1 justify-content-between" style={{ minWidth: "180px", padding: "5px 10px" }}>
                                                <h5 className="tp-ff-jakarta fw-600 fs-14 tp-text-common-white m-0" style={{ opacity: 0.6 }}>{siteData.ui.grilleLabel}</h5>
                                                <span className="tp-ff-dm fs-15 tp-text-grey-2 fw-600">{product.grilleType}</span>
                                            </div>
                                            <div
                                                className="d-flex align-items-center flex-grow-1 border-left border-secondary justify-content-between pl-3"
                                                onClick={() => {}}
                                                style={{ cursor: "default", borderLeft: "1px solid rgba(255,255,255,0.1)", minWidth: "180px", padding: "5px 10px" }}
                                            >
                                                <h5 className="tp-ff-jakarta fw-600 fs-14 tp-text-common-white m-0" style={{ opacity: 0.6 }}>{siteData.ui.certLabel}</h5>
                                                <span className="tp-ff-dm fs-17 cert-text fw-800" style={{ color: "#4D9FFF", textShadow: "0 0 15px rgba(77, 159, 255, 0.6)", letterSpacing: "0.5px" }}>{product.certification}</span>
                                            </div>
                                        </div>

                                        <div id="tab-features" className="tab-section mb-60">
                                            <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-10">{siteData.ui.keyFeaturesHeading}</h3>
                                            <p className="tp-ff-dm tp-text-grey-2 fs-15 mb-30" style={{ maxWidth: "600px" }}>Every component of the {product.name} is designed for professional-level performance, protection, and comfort.</p>

                                            <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
                                                {resolvedFeatures.map((feature, idx) => {
                                                    const canOpenPopup = siteData.featurePopupGlobal !== false && feature.disablePopup !== true;
                                                    return (
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
                                                            cursor: canOpenPopup ? "pointer" : "default",
                                                        }}
                                                        onClick={() => { if(canOpenPopup) setActiveFeature(feature); }}
                                                    >
                                                        <div style={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            width: "3px",
                                                            height: "100%",
                                                            background: "linear-gradient(180deg, #3257ff 0%, transparent 100%)",
                                                            opacity: 0.6,
                                                            borderRadius: "3px 0 0 3px",
                                                        }}></div>

                                                        <div className="d-flex align-items-start" style={{ gap: "10px" }}>
                                                            <div style={{
                                                                width: "44px",
                                                                height: "44px",
                                                                borderRadius: "12px",
                                                                background: "rgba(50, 87, 255, 0.08)",
                                                                border: "1px solid rgba(50, 87, 255, 0.15)",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                flexShrink: 0,
                                                            }}>
                                                                <img src={`/assets/img/brands/${feature.iconImg}`} alt={feature.title} style={{ maxWidth: "24px", height: "auto", display: "block", margin: "0 auto", filter: "invert(1)" }} />
                                                            </div>
                                                            <div className="feature-title-wrapper" style={{ flex: 1, paddingRight: canOpenPopup ? "80px" : "10px" }}>
                                                                <h5 className="tp-ff-jakarta fw-600 tp-text-common-white" style={{ fontSize: "16px", letterSpacing: "-0.2px", margin: canOpenPopup ? "0 0 4px 0" : "0 0 4px 0" }}>{feature.title}</h5>
                                                                <p className="tp-ff-dm" style={{ fontSize: "14px", lineHeight: 1.4, color: "rgba(255,255,255,0.6)", marginBottom: "0" }}>{feature.desc}</p>
                                                            </div>
                                                            {canOpenPopup && (
                                                              <span className="tp-ff-inter fw-600 feature-details-link" style={{ position: "absolute", top: "22px", right: "20px", fontSize: "12px", color: "#3257ff" }}>
                                                                  Details <i className="fa-solid fa-arrow-right" style={{ fontSize: "10px" }}></i>
                                                              </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    );
                                                })}
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
                        <div className="tp-round-10 overflow-hidden" style={{ border: "2px solid #3257ff", boxShadow: "0 0 50px rgba(50, 87, 255, 0.2)" }}>
                            <div className="bg-white p-5 tp-ff-jakarta" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h1 style={{ color: '#1A1F2B', fontWeight: 800, fontSize: '48px', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px' }}>{siteData.ui.certificate.title}</h1>
                                <div style={{ height: '2px', width: '100px', backgroundColor: '#3257ff', margin: '0 auto 40px auto' }}></div>
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
                                background: "rgba(50, 87, 255, 0.1)",
                                border: "1px solid rgba(50, 87, 255, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <img src={`/assets/img/brands/${activeFeature.iconImg}`} alt={activeFeature.title} style={{ maxWidth: "28px", height: "auto", filter: "invert(1)" }} />
                            </div>
                            <div>
                                <span style={{ fontSize: "11px", color: "#3257ff", textTransform: "uppercase", letterSpacing: "2px" }}>{siteData.ui.featureDetailBadge}</span>
                                <h3 className="tp-ff-jakarta fw-700 tp-text-common-white m-0" style={{ fontSize: "24px" }}>{activeFeature.detail.headline}</h3>
                            </div>
                        </div>

                        <p className="tp-ff-dm" style={{ fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", marginBottom: activeFeature.detail.image ? "20px" : "30px" }}>
                            {activeFeature.detail.intro}
                        </p>

                        {activeFeature.detail.image && (
                            <div style={{ marginBottom: "30px", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                                <img
                                    src={activeFeature.detail.image}
                                    alt={activeFeature.detail.headline}
                                    style={{
                                        width: "100%",
                                        maxHeight: "280px",
                                        objectFit: "cover",
                                        display: "block"
                                    }}
                                />
                            </div>
                        )}

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "30px" }}>
                            {activeFeature.detail.highlights.map((h, i) => (
                                <div key={i} className="d-flex align-items-start gap-2" style={{ padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.04)" }}>
                                    <i className="fa-solid fa-circle-check" style={{ color: "#3257ff", fontSize: "14px", marginTop: "3px" }}></i>
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

            {/* Neck Shield Lightbox Modal / Gallery */}
            {activeNeckShieldIdx !== null && product.neckShieldGallery && (
                <div
                    style={{
                        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                        background: "rgba(0,0,0,0.92)", backdropFilter: "blur(15px)",
                        zIndex: 100000, display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "40px", transition: "all 0.3s ease"
                    }}
                    onClick={() => setActiveNeckShieldIdx(null)}
                >
                    <button
                        style={{
                            position: "absolute", top: "30px", right: "40px",
                            background: "transparent", border: "none", color: "#fff",
                            fontSize: "50px", fontWeight: "200", cursor: "pointer", zIndex: 100001,
                            lineHeight: "1", opacity: 0.7
                        }}
                        onMouseEnter={(e) => e.target.style.opacity = 1}
                        onMouseLeave={(e) => e.target.style.opacity = 0.7}
                        onClick={() => setActiveNeckShieldIdx(null)}
                    >
                        &times;
                    </button>

                    {/* Navigation Buttons */}
                    <button 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveNeckShieldIdx((prev) => (prev > 0 ? prev - 1 : product.neckShieldGallery.length - 1));
                        }}
                        style={{ position: 'absolute', left: '40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', zIndex: 100002 }}
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>

                    <button 
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveNeckShieldIdx((prev) => (prev < product.neckShieldGallery.length - 1 ? prev + 1 : 0));
                        }}
                        style={{ position: 'absolute', right: '40px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', zIndex: 100002 }}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>

                    <div
                        style={{
                            maxWidth: "1000px", width: "100%", height: "auto",
                            display: "flex", flexDirection: 'column', alignItems: "center", justifyContent: "center",
                            animation: "modalZoomIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                        }}
                    >
                        <img
                            src={`/assets/img/Neck_Shield_Pro/${product.neckShieldFolder}/${product.neckShieldGallery[activeNeckShieldIdx]}`}
                            alt="Neck Shield Detail View"
                            style={{
                                maxWidth: "100%", maxHeight: "75vh",
                                objectFit: "contain",
                                filter: "drop-shadow(0 0 30px rgba(0,0,0,0.5))",
                                borderRadius: "8px"
                            }}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="mt-20 tp-ff-inter text-white fs-14 opacity-50">
                            Image {activeNeckShieldIdx + 1} of {product.neckShieldGallery.length}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
