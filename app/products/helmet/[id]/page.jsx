"use client";
import React, { useState } from "react";
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
    { id: "product-1", name: "KNYX Pro Elite V1", image: "1.png", category: "Professional" },
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

    const tabs = [
        { id: "features", label: "Features" },
        { id: "sizing", label: "Sizing" },
        { id: "colors", label: "Colors" },
        { id: "accessories", label: "Accessories" },
        { id: "certificate", label: "Certificate" },
    ];

    return (
        <>
            <div className="tp-hero-ai-body-overlay"></div>
            <MagicCursor />
            <BackToTop />
            <Offcanvas />
            <Header />
            <ClientRuntime />
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
                        <section className="product-details-area pt-120 pb-120" style={{ backgroundColor: "#06080D", minHeight: "100vh" }}>
                            <div className="container">
                                <div className="row">
                                    {/* Left Sidebar - Tabs */}
                                    <div className="col-lg-3 col-md-4 mb-50 mb-md-0">
                                        <div className="product-sidebar p-30 tp-round-10" style={{ background: "linear-gradient(145deg, #1A1F2B 0%, #0F1218 100%)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}>
                                            <h4 className="tp-ff-jakarta fw-600 fs-20 tp-text-common-white mb-30 border-bottom border-secondary pb-3">Product Menu</h4>
                                            <ul className="list-unstyled m-0 p-0">
                                                {tabs.map((tab) => (
                                                    <li key={tab.id} className="mb-15">
                                                        <button
                                                            onClick={() => tab.id === "certificate" ? setIsCertificateOpen(true) : setActiveTab(tab.id)}
                                                            className={`w-100 text-start border-0 p-3 tp-round-10 transition-3 tp-ff-inter fw-500 fs-16 d-flex align-items-center justify-content-between ${activeTab === tab.id && tab.id !== "certificate" ? "tp-text-common-white" : "tp-text-grey-2"}`}
                                                            style={{
                                                                backgroundColor: activeTab === tab.id && tab.id !== "certificate" ? "rgba(25, 135, 84, 0.15)" : "transparent",
                                                                borderLeft: activeTab === tab.id && tab.id !== "certificate" ? "3px solid var(--tp-theme-primary)" : "3px solid transparent",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            <span>{tab.label}</span>
                                                            {tab.id === "certificate" && <i className="fa-solid fa-expand fs-14"></i>}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Right Content - Details & Image */}
                                    <div className="col-lg-9 col-md-8">
                                        <div className="product-main-content">
                                            <div className="row align-items-center mb-60">
                                                {/* Product Image */}
                                                <div className="col-lg-6 mb-4 mb-lg-0">
                                                    <div className="product-image-wrapper p-relative tp-round-10 p-4" style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "450px" }}>
                                                        <div className="glow-effect" style={{ position: "absolute", width: "80%", height: "80%", background: "radial-gradient(circle, rgba(25,135,84,0.2) 0%, rgba(0,0,0,0) 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0 }}></div>
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
                                                        <span className="d-inline-block px-3 py-1 tp-round-10 tp-ff-inter fw-600 fs-12 text-uppercase mb-20" style={{ backgroundColor: "rgba(25,135,84,0.1)", color: "var(--tp-theme-primary)" }}>{product.category}</span>
                                                        <h2 className="tp-ff-jakarta fw-700 fs-40 tp-text-common-white mb-20">{product.name}</h2>
                                                        <p className="tp-ff-dm fw-400 fs-18 lh-150-per tp-text-grey-2 mb-30">
                                                            Experience the pinnacle of protective sports gear. This helmet is precisely engineered using advanced aerodynamic casing and reinforced multi-layer shock absorption to guarantee maximum safety seamlessly blended with elite performance and undeniable aesthetic appeal.
                                                        </p>

                                                        <div className="tech-specs mb-40 p-4 tp-round-10" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                            <h5 className="tp-ff-jakarta fw-600 fs-20 tp-text-common-white mb-15">Core Technology</h5>
                                                            <ul className="list-unstyled tp-text-common-white tp-ff-dm m-0 p-0 fs-16">
                                                                <li className="d-flex align-items-center mb-10"><i className="fa-solid fa-microchip tp-text-theme-primary me-2"></i> Titanium-Steel Hybrid Grille</li>
                                                                <li className="d-flex align-items-center mb-10"><i className="fa-solid fa-shield-halved tp-text-theme-primary me-2"></i> Polycarbonate Outer Shell</li>
                                                                <li className="d-flex align-items-center"><i className="fa-solid fa-wind tp-text-theme-primary me-2"></i> Omni-Directional Airflow Channels</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Dynamic Tab Content */}
                                            <div className="tab-content-area p-5 tp-round-10" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                {activeTab === "features" && (
                                                    <div className="animate__animated animate__fadeIn">
                                                        <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-20">Key Features</h3>
                                                        <p className="tp-ff-dm tp-text-common-white fs-18 lh-lg" style={{ opacity: 0.85 }}>From its expertly sculpted aerodynamic shell to its impact-resistant core structure, every line and contour is designed to deflect force rather than absorb it completely. Enjoy unparalleled visibility with strategically placed eye ports, and unparalleled comfort with sweat-wicking padding that adapts to the shape of your head over time.</p>
                                                    </div>
                                                )}
                                                {activeTab === "sizing" && (
                                                    <div className="animate__animated animate__fadeIn">
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
                                                                    <tr><td>Small (S)</td><td>54 - 56 cm</td><td>21.2 - 22.0"</td></tr>
                                                                    <tr><td>Medium (M)</td><td>57 - 59 cm</td><td>22.4 - 23.2"</td></tr>
                                                                    <tr><td>Large (L)</td><td>60 - 62 cm</td><td>23.6 - 24.4"</td></tr>
                                                                    <tr><td>X-Large (XL)</td><td>63 - 64 cm</td><td>24.8 - 25.2"</td></tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "colors" && (
                                                    <div className="animate__animated animate__fadeIn">
                                                        <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-20">Available Colors</h3>
                                                        <div className="d-flex flex-wrap gap-4 mt-3">
                                                            <div className="color-option text-center">
                                                                <div className="color-circle mb-2" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#000", border: "2px solid rgba(255,255,255,0.2)", margin: "0 auto" }}></div>
                                                                <span className="tp-ff-dm tp-text-grey-2">Matte Black</span>
                                                            </div>
                                                            <div className="color-option text-center">
                                                                <div className="color-circle mb-2" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#1A2E44", border: "2px solid rgba(255,255,255,0.2)", margin: "0 auto" }}></div>
                                                                <span className="tp-ff-dm tp-text-grey-2">Navy Blue</span>
                                                            </div>
                                                            <div className="color-option text-center">
                                                                <div className="color-circle mb-2" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#820A0A", border: "2px solid rgba(255,255,255,0.2)", margin: "0 auto" }}></div>
                                                                <span className="tp-ff-dm tp-text-grey-2">Crimson Red</span>
                                                            </div>
                                                            <div className="color-option text-center">
                                                                <div className="color-circle mb-2" style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#EBEBEB", border: "2px solid rgba(255,255,255,0.2)", margin: "0 auto" }}></div>
                                                                <span className="tp-ff-dm tp-text-grey-2">Pearl White</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {activeTab === "accessories" && (
                                                    <div className="animate__animated animate__fadeIn">
                                                        <h3 className="tp-ff-jakarta fw-600 tp-text-common-white fs-28 mb-20">Compatible Accessories</h3>
                                                        <ul className="list-unstyled tp-text-grey-2 tp-ff-dm fs-18 lh-lg">
                                                            <li className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus tp-text-theme-primary me-2"></i> Quick-Release Neck Guard</li>
                                                            <li className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus tp-text-theme-primary me-2"></i> Replacement Inner Padding Set (Sweat-wicking)</li>
                                                            <li className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus tp-text-theme-primary me-2"></i> Anti-Fog Visor Extenders</li>
                                                            <li className="mb-2 border-bottom border-secondary pb-2"><i className="fa-solid fa-plus tp-text-theme-primary me-2"></i> Carrying Case (Hard shell)</li>
                                                        </ul>
                                                    </div>
                                                )}
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
            `}</style>

            {/* Certificate Modal - Moved outside smooth-wrapper to prevent z-index clipping by header */}
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
                        <div className="tp-round-10 overflow-hidden" style={{ border: "2px solid var(--tp-theme-primary)", boxShadow: "0 0 50px rgba(25, 135, 84, 0.3)" }}>
                            <div className="bg-white p-5 tp-ff-jakarta" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}>
                                <h1 style={{ color: '#1A1F2B', fontWeight: 800, fontSize: '48px', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '20px' }}>Certificate of Authenticity</h1>
                                <div style={{ height: '2px', width: '100px', backgroundColor: 'var(--tp-theme-primary)', margin: '0 auto 40px auto' }}></div>
                                <h3 style={{ color: '#555', fontSize: '24px', marginBottom: '10px' }}>This certifies that</h3>
                                <h2 style={{ color: 'var(--tp-theme-primary)', fontSize: '36px', fontWeight: 700, margin: '20px 0' }}>{product.name}</h2>
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

            <LegacyScripts />
        </>
    );
}
