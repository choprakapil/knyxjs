"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import MagicCursor from "@/components/layout/MagicCursor";
import Offcanvas from "@/components/layout/Offcanvas";
import Breadcrumb from "@/components/common/Breadcrumb";
import Link from "next/link";
import { withBasePath } from "@/lib/asset";

const allProducts = [
    { id: "product-1", name: "C7 Iso Pro", image: "1.png", category: "Professional" },
    { id: "product-2", name: "KNYX Pro Elite V2", image: "2.png", category: "Professional" },
    { id: "product-3", name: "KNYX Pro Master", image: "3.png", category: "Professional" },
    { id: "product-4", name: "KNYX Pro Titanium", image: "4.png", category: "Professional" },
    { id: "product-5", name: "KNYX Pro Signature", image: "5.png", category: "Professional" },
    { id: "product-6", name: "KNYX Classic Lite", image: "6.png", category: "Amateur" },
    { id: "product-7", name: "KNYX Club Essential", image: "7.png", category: "Amateur" },
    { id: "product-8", name: "KNYX Practice Series", image: "8.png", category: "Amateur" },
    { id: "product-9", name: "KNYX Academy Edition", image: "9.png", category: "Amateur" },
    { id: "product-10", name: "KNYX Starter Pro", image: "10.png", category: "Amateur" },
];

/**
 * Sidebar Portal - renders outside #smooth-content so position:fixed works
 * Same approach as the helmet listing page
 */
const SidebarPortal = ({ children, visible }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div
            className="product-detail-sidebar-portal"
            style={{
                position: "fixed",
                top: "120px",
                left: "0",
                width: "320px",
                maxHeight: "calc(100vh - 150px)",
                overflowY: "auto",
                zIndex: 100,
                padding: "0 15px 0 calc((100vw - 1524px) / 2 + 15px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-30px)",
                pointerEvents: visible ? "auto" : "none",
            }}
        >
            {children}
        </div>,
        document.body
    );
};

export default function HelmetProductDetails({ params }) {
    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;
    const product = allProducts.find((p) => p.id === id) || {
        id: id,
        name: "Custom KNYX Helmet",
        image: "1.png",
        category: "Custom Edition"
    };

    const [activeTab, setActiveTab] = useState("features");
    const [isCertificateOpen, setIsCertificateOpen] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(null);
    const contentRef = React.useRef(null);

    const featureDetails = [
        {
            icon: "fa-diamond",
            title: "Carbon Composite Shell",
            desc: "Reinforced shell with premium matte painted finish for maximum structural integrity",
            detail: {
                headline: "Carbon Composite Reinforced Shell",
                intro: "The C7 Iso Pro features a state-of-the-art carbon composite reinforced shell that offers an unmatched balance of lightweight design and extreme durability. The exterior is finished with a premium matte paint for a sleek, professional look.",
                highlights: [
                    "Carbon fibre-reinforced polymer construction for superior strength-to-weight ratio",
                    "Matte painted finish resists scratches, scuffs, and UV degradation",
                    "Aerodynamic shell profile reduces drag and wind noise",
                    "Impact-tested to exceed international safety standards",
                ],
                specs: { "Material": "Carbon Composite Polymer", "Finish": "Premium Matte Paint", "Weight Savings": "Up to 20% lighter than traditional shells", "Standard": "Exceeds BS 7928:2013" },
            },
        },
        {
            icon: "fa-helmet-safety",
            title: "High Density EPP Liner",
            desc: "Shock absorbing liner engineered to dissipate impact energy across a wider surface area",
            detail: {
                headline: "High Density EPP Shock Absorbing Liner",
                intro: "Expanded Polypropylene (EPP) is a high-performance foam used in the most demanding safety applications. Our high-density EPP liner is precision-molded to the inner contour of the shell, providing consistent, reliable energy absorption on every impact.",
                highlights: [
                    "Multi-impact capable — retains protective properties after repeated strikes",
                    "Uniform energy dissipation across the entire liner surface area",
                    "Lightweight closed-cell foam structure won't absorb sweat or moisture",
                    "Precision-molded for a seamless fit against the inner shell",
                ],
                specs: { "Material": "Expanded Polypropylene (EPP)", "Density": "High-density, multi-impact grade", "Moisture Resistance": "Closed-cell, non-absorbent", "Coverage": "Full cranial coverage" },
            },
        },
        {
            icon: "fa-burst",
            title: "RIM System",
            desc: "Radial Impact Mitigation system provides elastic shock absorption for multi-directional hits",
            detail: {
                headline: "RIM — Radial Impact Mitigation System",
                intro: "The proprietary RIM (Radial Impact Mitigation) system is an advanced elastic shock absorption technology designed to handle impacts from every direction. It works in concert with the EPP liner to dramatically reduce the transfer of rotational and linear forces to the head.",
                highlights: [
                    "Elastic polymer network absorbs and redirects radial impact energy",
                    "Multi-directional protection against linear and rotational forces",
                    "Integrates seamlessly between the shell and EPP liner",
                    "Designed to significantly reduce peak G-force on impact",
                ],
                specs: { "Technology": "Elastic Polymer Network", "Protection": "Multi-directional (radial + linear)", "Integration": "Shell-liner interface", "Performance": "Reduces peak G-force significantly" },
            },
        },
        {
            icon: "fa-wind",
            title: "IVS Ventilation",
            desc: "Improved Ventilation System strategically channels airflow to keep you cool under pressure",
            detail: {
                headline: "IVS — Improved Ventilation System",
                intro: "The IVS (Improved Ventilation System) uses a network of strategically placed intake and exhaust vents to create a continuous, cooling airflow across the head. This ensures maximum comfort and concentration even during the most intense sessions under the sun.",
                highlights: [
                    "Strategically placed intake vents at the front draw in cool air",
                    "Internal channeling system directs airflow across the scalp",
                    "Rear exhaust ports expel warm, humid air efficiently",
                    "Designed to reduce internal temperature by up to 15%",
                ],
                specs: { "System": "Multi-channel intake & exhaust", "Vent Count": "12+ precision-placed vents", "Airflow": "Continuous front-to-back circulation", "Cooling": "Up to 15% internal temperature reduction" },
            },
        },
        {
            icon: "fa-sliders",
            title: "ISOFIT Comfort System",
            desc: "Precision comfort liner fit system that adapts and conforms to your unique head shape",
            detail: {
                headline: "ISOFIT Comfort Liner Fit System",
                intro: "The ISOFIT system is a precision-engineered internal fit mechanism that allows the helmet to be adjusted for a personalized, secure fit. It adapts to the unique contours of your head, eliminating pressure points and ensuring the helmet stays locked in place during play.",
                highlights: [
                    "Micro-adjustable dial system for a personalized, secure fit",
                    "Conforms to unique head contours to eliminate pressure points",
                    "Easy one-handed adjustment even while wearing gloves",
                    "Ensures zero helmet shift or wobble during fast play",
                ],
                specs: { "Adjustment": "Micro-dial precision system", "Fit": "Adaptive contouring", "Operation": "One-handed, glove-compatible", "Stability": "Zero-shift lock" },
            },
        },
        {
            icon: "fa-snowflake",
            title: "KoolForm Padding",
            desc: "Advanced liner comfort padding with moisture-wicking technology for extended wear",
            detail: {
                headline: "KoolForm Liner Comfort Padding",
                intro: "KoolForm padding uses advanced moisture-wicking fabrics and memory foam inserts to deliver exceptional comfort for prolonged use. The pads are removable and washable, making it easy to keep your helmet fresh and hygienic.",
                highlights: [
                    "Moisture-wicking fabric draws sweat away from the skin",
                    "Memory foam inserts provide a plush, custom fit over time",
                    "Anti-microbial treated to prevent odor and bacteria build-up",
                    "Fully removable and machine-washable for easy hygiene",
                ],
                specs: { "Fabric": "Moisture-wicking, anti-microbial", "Foam": "Memory foam inserts", "Maintenance": "Removable & machine-washable", "Comfort": "Long-session rated" },
            },
        },
        {
            icon: "fa-shield-halved",
            title: "Titanium Tactical Faceguard",
            desc: "Lightweight yet incredibly strong titanium grille offering superior facial protection",
            detail: {
                headline: "Titanium Tactical Faceguard",
                intro: "The titanium tactical faceguard provides unparalleled facial protection without compromising on weight or visibility. Titanium's exceptional strength-to-weight ratio means the grille can be thinner, lighter, and stronger than traditional steel alternatives.",
                highlights: [
                    "Aerospace-grade titanium construction for extreme durability",
                    "Up to 40% lighter than comparable steel faceguards",
                    "Optimized bar spacing for maximum visibility and ball tracking",
                    "Corrosion-resistant finish for longevity in all conditions",
                ],
                specs: { "Material": "Aerospace-grade Titanium", "Weight": "Up to 40% lighter than steel", "Visibility": "Optimized bar spacing", "Finish": "Corrosion-resistant coating" },
            },
        },
        {
            icon: "fa-lock",
            title: "Maglock Buckle System",
            desc: "Quick fastening and release magnetic buckle system for effortless one-handed operation",
            detail: {
                headline: "Maglock Quick Fastening & Release Buckle System",
                intro: "The Maglock buckle system uses powerful, self-aligning magnets for instant fastening and release. No more fumbling with traditional clips — just snap to secure, and pull to release. Designed for one-handed operation even with batting gloves.",
                highlights: [
                    "Self-aligning magnetic closure snaps securely into place",
                    "Instant one-pull release for quick helmet removal",
                    "Operable with one hand, even while wearing batting gloves",
                    "Reinforced strap rated for high-tension loads",
                ],
                specs: { "Mechanism": "Self-aligning magnetic closure", "Operation": "One-handed, glove-compatible", "Release": "Instant one-pull release", "Strap": "Reinforced high-tension rated" },
            },
        },
    ];

    const tabs = [
        { id: "features", label: "Features", icon: "fa-star" },
        { id: "sizing", label: "Sizing", icon: "fa-ruler" },
        { id: "colors", label: "Colors", icon: "fa-palette" },
        { id: "accessories", label: "Accessories", icon: "fa-puzzle-piece" },
        { id: "certificate", label: "Certificate", icon: "fa-certificate" },
    ];

    const professionalProducts = allProducts.filter(p => p.category === "Professional");
    const amateurProducts = allProducts.filter(p => p.category === "Amateur");

    // Track sidebar visibility based on content position
    useEffect(() => {
        let animFrame;
        const contentEl = contentRef.current;

        const updateSidebarVisibility = () => {
            if (!contentEl) return;
            const rect = contentEl.getBoundingClientRect();
            const isVisible = rect.top < 200 && rect.bottom > 500;
            setSidebarVisible(isVisible);
            animFrame = requestAnimationFrame(updateSidebarVisibility);
        };
        animFrame = requestAnimationFrame(updateSidebarVisibility);

        return () => cancelAnimationFrame(animFrame);
    }, []);

    const scrollToSection = (tabId) => {
        if (tabId === "certificate") {
            setIsCertificateOpen(true);
            return;
        }
        setActiveTab(tabId);
        const el = document.getElementById(`tab-${tabId}`);
        if (el) {
            const headerOffset = 150;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="tp-hero-ai-body-overlay"></div>
            <MagicCursor />
            <BackToTop />
            <Offcanvas />
            <Header />
            <ClientRuntime />

            {/* Sidebar Portal - rendered outside smooth-content */}
            <SidebarPortal visible={sidebarVisible}>
                <div style={{
                    background: "linear-gradient(180deg, rgba(15, 18, 25, 0.95) 0%, rgba(10, 12, 18, 0.98) 100%)",
                    backdropFilter: "blur(20px)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "0 16px 16px 0",
                    padding: "25px 20px",
                }}>
                    {/* Scroll Progress Bar */}
                    <div style={{
                        position: "absolute",
                        left: "0",
                        top: "0",
                        width: "3px",
                        height: "100%",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "3px",
                    }}>
                        <div className="sidebar-detail-progress" style={{
                            width: "100%",
                            height: "0%",
                            background: "linear-gradient(180deg, #c8ff00, #a3d900)",
                            borderRadius: "3px",
                            transition: "height 0.3s ease",
                        }}></div>
                    </div>

                    {/* Product Menu Tabs */}
                    <h4 style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        color: "rgba(255,255,255,0.35)",
                        marginBottom: "18px",
                        paddingLeft: "5px",
                    }}>Product Menu</h4>

                    <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "25px" }}>
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id && tab.id !== "certificate";
                            return (
                                <li key={tab.id} style={{ marginBottom: "4px" }}>
                                    <button
                                        onClick={() => scrollToSection(tab.id)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            width: "100%",
                                            background: "none",
                                            border: "none",
                                            padding: "10px 12px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                                            fontSize: "14px",
                                            fontWeight: isActive ? 600 : 400,
                                            transition: "all 0.3s ease",
                                            backgroundColor: isActive ? "rgba(200, 255, 0, 0.08)" : "transparent",
                                            borderLeft: isActive ? "3px solid #c8ff00" : "3px solid transparent",
                                            textAlign: "left",
                                        }}
                                    >
                                        <i className={`fa-solid ${tab.icon}`} style={{
                                            fontSize: "12px",
                                            color: isActive ? "#c8ff00" : "rgba(255,255,255,0.3)",
                                            width: "16px",
                                            textAlign: "center",
                                        }}></i>
                                        <span>{tab.label}</span>
                                        {tab.id === "certificate" && (
                                            <i className="fa-solid fa-expand" style={{ fontSize: "10px", marginLeft: "auto", opacity: 0.4 }}></i>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Divider */}
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 0 20px 0" }}></div>

                    {/* All Products Navigation */}
                    <h4 style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        color: "rgba(255,255,255,0.35)",
                        marginBottom: "14px",
                        paddingLeft: "5px",
                    }}>Professional</h4>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0, marginBottom: "20px" }}>
                        {professionalProducts.map((p) => {
                            const isCurrent = p.id === product.id;
                            return (
                                <li key={p.id}>
                                    <a
                                        href={`/products/helmet/${p.id}`}
                                        style={{
                                            display: "block",
                                            padding: "8px 12px",
                                            fontSize: "13px",
                                            fontWeight: isCurrent ? 600 : 400,
                                            color: isCurrent ? "#fff" : "rgba(255,255,255,0.4)",
                                            textDecoration: "none",
                                            borderRadius: "6px",
                                            transition: "all 0.3s ease",
                                            borderLeft: isCurrent ? "3px solid #c8ff00" : "3px solid transparent",
                                            backgroundColor: isCurrent ? "rgba(200, 255, 0, 0.06)" : "transparent",
                                        }}
                                    >
                                        {isCurrent && <span style={{ color: "#c8ff00", marginRight: "6px", fontSize: "8px" }}>●</span>}
                                        {p.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <h4 style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "3px",
                        color: "rgba(255,255,255,0.35)",
                        marginBottom: "14px",
                        paddingLeft: "5px",
                    }}>Amateurs</h4>
                    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                        {amateurProducts.map((p) => {
                            const isCurrent = p.id === product.id;
                            return (
                                <li key={p.id}>
                                    <a
                                        href={`/products/helmet/${p.id}`}
                                        style={{
                                            display: "block",
                                            padding: "8px 12px",
                                            fontSize: "13px",
                                            fontWeight: isCurrent ? 600 : 400,
                                            color: isCurrent ? "#fff" : "rgba(255,255,255,0.4)",
                                            textDecoration: "none",
                                            borderRadius: "6px",
                                            transition: "all 0.3s ease",
                                            borderLeft: isCurrent ? "3px solid #c8ff00" : "3px solid transparent",
                                            backgroundColor: isCurrent ? "rgba(200, 255, 0, 0.06)" : "transparent",
                                        }}
                                    >
                                        {isCurrent && <span style={{ color: "#c8ff00", marginRight: "6px", fontSize: "8px" }}>●</span>}
                                        {p.name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </SidebarPortal>

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        {/* Breadcrumb Area */}
                        <Breadcrumb
                            title={product.name}
                            eyebrow="Helmet"
                            description={`${product.category} Edition`}
                        />

                        {/* Product Details Area */}
                        <section ref={contentRef} className="product-details-area pt-120 pb-120" style={{ backgroundColor: "#06080D", minHeight: "100vh" }}>
                            <div className="container">
                                <div className="row">
                                    {/* Left Spacer Column - space for portal sidebar */}
                                    <div className="col-lg-3 d-none d-lg-block"></div>

                                    {/* Right Content - Details & Image */}
                                    <div className="col-lg-9">
                                        <div className="product-main-content">
                                            <div className="row align-items-center mb-60">
                                                {/* Product Image */}
                                                <div className="col-lg-6 mb-4 mb-lg-0">
                                                    <div className="product-image-wrapper p-relative tp-round-10 p-4" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "450px" }}>
                                                        <div className="glow-effect" style={{ position: "absolute", width: "80%", height: "80%", background: "radial-gradient(circle, rgba(200,255,0,0.1) 0%, rgba(0,0,0,0) 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0 }}></div>
                                                        <img
                                                            src={`/assets/img/products/${product.image}`}
                                                            alt={product.name}
                                                            className="img-fluid p-relative z-index-1"
                                                            style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain", filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Main Info */}
                                                <div className="col-lg-6">
                                                    <div className="product-info pl-lg-30">
                                                        <span className="d-inline-block px-3 py-1 tp-round-10 tp-ff-inter fw-600 fs-12 text-uppercase mb-20" style={{ backgroundColor: "rgba(200,255,0,0.08)", color: "#c8ff00" }}>{product.category}</span>
                                                        <h2 className="tp-ff-jakarta fw-700 fs-40 tp-text-common-white mb-20">{product.name}</h2>
                                                        <p className="tp-ff-dm fw-400 fs-18 lh-150-per tp-text-grey-2 mb-30">
                                                            Carbon Composite Reinforced Shell with matte painted finish. Precision-engineered for elite professional cricketers who demand uncompromising protection, superior ventilation, and an advanced fit system.
                                                        </p>

                                                        <div className="tech-specs mb-40 p-4 tp-round-10" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                            <h5 className="tp-ff-jakarta fw-600 fs-20 tp-text-common-white mb-15">Core Technology</h5>
                                                            <ul className="list-unstyled tp-text-common-white tp-ff-dm m-0 p-0 fs-16">
                                                                <li className="d-flex align-items-center mb-10"><i className="fa-solid fa-shield-halved me-2" style={{ color: "#c8ff00" }}></i> Carbon Composite Shell</li>
                                                                <li className="d-flex align-items-center mb-10"><i className="fa-solid fa-burst me-2" style={{ color: "#c8ff00" }}></i> RIM Elastic Shock Absorption</li>
                                                                <li className="d-flex align-items-center"><i className="fa-solid fa-wind me-2" style={{ color: "#c8ff00" }}></i> IVS Enhanced Air Flow</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Tab Content Sections - All rendered inline for scroll-based navigation */}
                                            <div id="tab-features" className="tab-section mb-60">
                                                <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-15">Key Features</h3>
                                                <p className="tp-ff-dm tp-text-grey-2 fs-16 mb-40" style={{ maxWidth: "650px" }}>Every component of the C7 Iso Pro is designed for professional-level performance, protection, and comfort.</p>

                                                <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
                                                    {featureDetails.map((feature, index) => (
                                                        <div
                                                            key={feature.title}
                                                            className="feature-card-item"
                                                            style={{
                                                                background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                                                                border: "1px solid rgba(255,255,255,0.06)",
                                                                borderRadius: "16px",
                                                                padding: "28px 24px",
                                                                position: "relative",
                                                                overflow: "hidden",
                                                                animation: `featureSlideIn 0.5s ease ${index * 0.08}s both`,
                                                                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => setActiveFeature(feature)}
                                                        >
                                                            {/* Glow accent */}
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

                                                            <div className="d-flex align-items-start gap-3">
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
                                                                    <i className={`fa-solid ${feature.icon}`} style={{ color: "#c8ff00", fontSize: "18px" }}></i>
                                                                </div>
                                                                <div style={{ flex: 1 }}>
                                                                    <h5 className="tp-ff-jakarta fw-600 tp-text-common-white mb-8" style={{ fontSize: "16px", letterSpacing: "-0.2px" }}>{feature.title}</h5>
                                                                    <p className="tp-ff-dm mb-10" style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)" }}>{feature.desc}</p>
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

                                            <div id="tab-sizing" className="tab-section mb-60 p-5 tp-round-10" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-20">Sizing Guide</h3>
                                                <p className="tp-ff-dm tp-text-grey-2 fs-18 lh-lg mb-20">To find your perfect fit, measure the circumference of your head approximately one inch above your eyebrows.</p>
                                                <div className="table-responsive">
                                                    <table className="table table-dark table-striped table-bordered tp-ff-inter" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Size</th>
                                                                <th>Circumference (cm)</th>
                                                                <th>Circumference (inches)</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr><td>Small (S)</td><td>54 - 56 cm</td><td>21.2 - 22.0&quot;</td></tr>
                                                            <tr><td>Medium (M)</td><td>57 - 59 cm</td><td>22.4 - 23.2&quot;</td></tr>
                                                            <tr><td>Large (L)</td><td>60 - 62 cm</td><td>23.6 - 24.4&quot;</td></tr>
                                                            <tr><td>X-Large (XL)</td><td>63 - 64 cm</td><td>24.8 - 25.2&quot;</td></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <div id="tab-colors" className="tab-section mb-60 p-5 tp-round-10" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-20">Available Colors</h3>
                                                <div className="d-flex flex-wrap gap-4 mt-3">
                                                    {[
                                                        { name: "Matte Black", color: "#000" },
                                                        { name: "Navy Blue", color: "#1A2E44" },
                                                        { name: "Crimson Red", color: "#820A0A" },
                                                        { name: "Pearl White", color: "#EBEBEB" },
                                                    ].map((c) => (
                                                        <div key={c.name} className="color-option text-center">
                                                            <div className="color-circle mb-2" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: c.color, border: "2px solid rgba(255,255,255,0.2)", margin: "0 auto" }}></div>
                                                            <span className="tp-ff-dm tp-text-grey-2">{c.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div id="tab-accessories" className="tab-section mb-60 p-5 tp-round-10" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-20">Compatible Accessories</h3>
                                                <ul className="list-unstyled tp-text-grey-2 tp-ff-dm fs-18 lh-lg">
                                                    <li className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus me-2" style={{ color: "#c8ff00" }}></i> Quick-Release Neck Guard</li>
                                                    <li className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus me-2" style={{ color: "#c8ff00" }}></i> Replacement Inner Padding Set (Sweat-wicking)</li>
                                                    <li className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus me-2" style={{ color: "#c8ff00" }}></i> Anti-Fog Visor Extenders</li>
                                                    <li className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus me-2" style={{ color: "#c8ff00" }}></i> Carrying Case (Hard shell)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>

            <style jsx global>{`
                @keyframes modalZoomIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes featureSlideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes featureModalIn {
                    from { opacity: 0; transform: scale(0.92) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes featureModalOverlayIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .feature-card-item .feature-details-link:hover i {
                    transform: translateX(4px);
                }
                .feature-card-item:hover .feature-details-link {
                    gap: 8px;
                }
                .feature-card-item:hover {
                    transform: translateY(-4px) !important;
                    border-color: rgba(200, 255, 0, 0.2) !important;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(200, 255, 0, 0.06);
                    background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%) !important;
                }
                .product-detail-sidebar-portal::-webkit-scrollbar {
                    width: 3px;
                }
                .product-detail-sidebar-portal::-webkit-scrollbar-track {
                    background: transparent;
                }
                .product-detail-sidebar-portal::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 3px;
                }
                .product-detail-sidebar-portal a:hover {
                    color: #fff !important;
                    background-color: rgba(200, 255, 0, 0.04) !important;
                }
                .product-detail-sidebar-portal button:hover {
                    color: #fff !important;
                    background-color: rgba(200, 255, 0, 0.04) !important;
                }
            `}</style>

            {/* Certificate Modal */}
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

            {/* Feature Detail Modal */}
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
                    {/* Close Button */}
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

                    {/* Modal Content */}
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
                            {/* Glow background behind icon */}
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
                                    <i className={`fa-solid ${activeFeature.icon}`} style={{ color: "#c8ff00", fontSize: "24px" }}></i>
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

                            {/* Divider */}
                            <div style={{
                                height: "1px",
                                background: "linear-gradient(90deg, rgba(200, 255, 0, 0.3) 0%, rgba(255,255,255,0.05) 100%)",
                            }}></div>
                        </div>

                        {/* Body */}
                        <div style={{ padding: "28px 40px 40px 40px" }}>
                            {/* Intro Paragraph */}
                            <p className="tp-ff-dm" style={{
                                fontSize: "15px",
                                lineHeight: 1.8,
                                color: "rgba(255,255,255,0.65)",
                                marginBottom: "30px",
                            }}>
                                {activeFeature.detail.intro}
                            </p>

                            {/* Highlights */}
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

                            {/* Specs Table */}
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

            <LegacyScripts />
        </>
    );
}
