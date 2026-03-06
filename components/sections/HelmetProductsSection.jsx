"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { withBasePath } from "@/lib/asset";

/**
 * Sidebar rendered via portal OUTSIDE #smooth-content so that 
 * position:fixed actually works (CSS transforms on ancestors 
 * break fixed/sticky positioning).
 */
const SidebarPortal = ({ children, sidebarStyle }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div
            className="tp-product-sidebar-portal"
            style={{
                position: "fixed",
                bottom: "10px",
                left: "0",
                width: "350px",
                maxHeight: "calc(100vh - 110px)",
                overflowY: "auto",
                zIndex: 100,
                padding: "0 15px 0 calc((100vw - 1524px) / 2 + 15px)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
                ...sidebarStyle,
            }}
        >
            {children}
        </div>,
        document.body
    );
};

/**
 * Floating category heading portal — stays pinned at the top of the
 * content area while scrolling through products. Switches between
 * "Professional Helmets" and "Amateur Helmets" based on scroll position.
 */
const CategoryHeadingPortal = ({ label, visible }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <div
            className="tp-category-heading-portal"
            style={{
                position: "fixed",
                top: "105px",
                left: "350px",
                right: "0",
                zIndex: 99,
                padding: "14px calc((100vw - 1524px) / 2 + 15px) 14px 80px",
                background: "linear-gradient(180deg, rgba(6, 8, 13, 0.97) 0%, rgba(6, 8, 13, 0.92) 70%, rgba(6, 8, 13, 0) 100%)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(-20px)",
                pointerEvents: "none",
            }}
        >
            <h2
                className="tp-ff-jakarta fw-600 tp-text-common-white m-0"
                style={{ fontSize: "28px", letterSpacing: "-0.5px" }}
            >
                {label}
            </h2>
            <div style={{
                height: "3px",
                width: "60px",
                background: "var(--tp-theme-primary)",
                marginTop: "8px",
                borderRadius: "2px",
                boxShadow: "0 0 8px var(--tp-theme-primary)",
            }}></div>
        </div>,
        document.body
    );
};

const HelmetProductsSection = () => {
    const [activeProductId, setActiveProductId] = useState("");
    const contentRef = useRef(null);
    const sectionRef = useRef(null);
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [activeCategoryLabel, setActiveCategoryLabel] = useState("Professional Helmets");
    const [categoryHeadingVisible, setCategoryHeadingVisible] = useState(false);
    const proSectionRef = useRef(null);
    const amateurSectionRef = useRef(null);

    const scrollToProduct = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 150;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        let timeout;
        const localTriggers = [];
        let animFrame;

        const contentEl = contentRef.current;

        const proSection = proSectionRef.current;
        const amateurSection = amateurSectionRef.current;

        // Track sidebar visibility AND active category heading
        const updateVisibility = () => {
            if (!contentEl) return;
            const rect = contentEl.getBoundingClientRect();
            const isVisible = rect.top < 200 && rect.bottom > 200;
            setSidebarVisible(isVisible);

            // Determine active category heading based on which section is in view
            if (proSection && amateurSection) {
                const proRect = proSection.getBoundingClientRect();
                const amateurRect = amateurSection.getBoundingClientRect();
                // The heading that has scrolled past the top gets "pinned"
                const headingPinLine = 140; // just below header

                if (amateurRect.top < headingPinLine) {
                    setActiveCategoryLabel("Amateur Helmets");
                } else if (proRect.top < headingPinLine) {
                    setActiveCategoryLabel("Professional Helmets");
                }

                // Show the floating heading only when content is in the product zone
                // AND the original inline heading has scrolled above the pin line
                const showHeading = isVisible && proRect.top < headingPinLine;
                setCategoryHeadingVisible(showHeading);
            }

            animFrame = requestAnimationFrame(updateVisibility);
        };
        animFrame = requestAnimationFrame(updateVisibility);

        // ScrollTrigger for progress bar only
        const initAnimations = () => {
            if (window.gsap && window.ScrollTrigger) {
                const progressBar = document.querySelector(".sidebar-scroll-progress");
                if (progressBar && contentEl) {
                    const stProgress = window.ScrollTrigger.create({
                        trigger: contentEl,
                        start: "top 40%",
                        end: "bottom 60%",
                        scrub: 1,
                        animation: window.gsap.to(progressBar, {
                            height: "100%",
                            ease: "none"
                        }),
                    });
                    localTriggers.push(stProgress);
                }
            } else {
                timeout = setTimeout(initAnimations, 100);
            }
        };

        timeout = setTimeout(initAnimations, 100);

        // Intersection Observer for active product tracking
        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveProductId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0,
        });

        document.querySelectorAll(".product-item-container").forEach((item) => {
            observer.observe(item);
        });

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(animFrame);
            observer.disconnect();
            if (window.ScrollTrigger) {
                localTriggers.forEach((st) => {
                    if (st) st.kill();
                });
            }
        };
    }, []);

    const professionalProducts = [
        { id: "product-1", name: "C7 Iso Pro", image: "1.png" },
        { id: "product-2", name: "KNYX Pro Elite V2", image: "2.png" },
        { id: "product-3", name: "KNYX Pro Master", image: "3.png" },
        { id: "product-4", name: "KNYX Pro Titanium", image: "4.png" },
        { id: "product-5", name: "KNYX Pro Signature", image: "5.png" },
    ];

    const amateurProducts = [
        { id: "product-6", name: "KNYX Classic Lite", image: "6.png" },
        { id: "product-7", name: "KNYX Club Essential", image: "7.png" },
        { id: "product-8", name: "KNYX Practice Series", image: "8.png" },
        { id: "product-9", name: "KNYX Academy Edition", image: "9.png" },
        { id: "product-10", name: "KNYX Starter Pro", image: "10.png" },
    ];

    const renderNavList = (products) => {
        return (
            <ul className="list-unstyled position-relative m-0 mt-10" style={{ paddingLeft: "0" }}>
                {products.map((product) => {
                    const isActive = activeProductId === product.id;

                    return (
                        <li key={product.id} className="position-relative" style={{ paddingTop: "6px", paddingBottom: "6px" }}>
                            <a
                                href={`#${product.id}`}
                                onClick={(e) => scrollToProduct(e, product.id)}
                                className={`tp-ff-inter fw-500 fs-14 transition-3 d-inline-block position-relative ${isActive ? 'tp-text-common-white' : 'tp-text-grey-2 hover-text-primary'}`}
                                style={{
                                    transform: isActive ? 'translateX(10px)' : 'translateX(0)',
                                    transition: 'all 0.3s ease',
                                    textShadow: isActive ? '0 0 10px rgba(255,255,255,0.2)' : 'none',
                                    opacity: isActive ? 1 : 0.5
                                }}
                            >
                                {product.name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderProductCard = (product, isAlternate = false) => (
        <div id={product.id} key={product.id} className="product-item-container w-100" style={{ height: "70vh", display: "flex", alignItems: "flex-end" }}>
            <div className={`product-item p-4 tp-round-10 transition-3 ${activeProductId === product.id ? 'active-product-card' : ''}`} style={{ height: "60vh", minHeight: "450px", width: "100%", display: "flex", alignItems: "center", backgroundColor: activeProductId === product.id ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.01)", backdropFilter: activeProductId === product.id ? "blur(20px)" : "none", border: activeProductId === product.id ? "1px solid var(--tp-theme-primary)" : "1px solid transparent", boxShadow: activeProductId === product.id ? "0 20px 60px rgba(0,0,0,0.6), inset 0 0 20px rgba(25, 135, 84, 0.1)" : "none", transform: activeProductId === product.id ? "scale(1) translateY(0)" : "scale(0.85) translateY(100px)", opacity: activeProductId === product.id ? 1 : 0, borderRadius: "24px", transition: "all 0.8s cubic-bezier(0.25, 1, 0.5, 1)", position: "relative" }}>
                <div className="row align-items-center w-100 m-0">
                    <div className={`col-lg-6 mb-4 mb-lg-0 ${isAlternate ? 'order-lg-2' : ''}`}>
                        <div className="product-image p-relative overflow-hidden tp-round-10" style={{ backgroundColor: "rgba(0,0,0,0.5)", mixBlendMode: 'screen', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src={withBasePath(`/assets/img/products/${product.image}`)}
                                alt={product.name}
                                className="img-fluid transition-3"
                                style={{ maxHeight: '100%', objectFit: 'contain', transform: activeProductId === product.id ? 'scale(1.05)' : 'scale(1)' }}
                            />
                        </div>
                    </div>
                    <div className={`col-lg-6 ${isAlternate ? 'order-lg-1' : ''}`}>
                        <div className={`product-content ${isAlternate ? 'pr-30' : 'pl-30'}`}>
                            <h3 className="tp-ff-jakarta fw-600 fs-36 mb-20 tp-text-common-white">{product.name}</h3>
                            <p className="tp-ff-dm fw-400 fs-18 lh-150-per tp-text-grey-2 mb-30">
                                {isAlternate
                                    ? "The perfect starting point for new and aspiring cricketers. Designed giving priority to essential safety without compromising on visibility and airflow, crafted for long practice sessions."
                                    : "Engineered for maximum protection and undeniable style. Features advanced impact absorption, an ultra-lightweight titanium/steel blend grille, and a multi-layer inner foam system for unmatched comfort."
                                }
                            </p>
                            <div className="product-features mb-40">
                                <ul className="list-unstyled tp-text-grey-2 tp-ff-dm fs-18">
                                    {isAlternate ? (
                                        <>
                                            <li className="mb-10 d-flex align-items-center"><i className="fas fa-check-circle" style={{ color: "var(--tp-theme-primary)", marginRight: "10px" }}></i> Basic Impact Guard</li>
                                            <li className="mb-10 d-flex align-items-center"><i className="fas fa-check-circle" style={{ color: "var(--tp-theme-primary)", marginRight: "10px" }}></i> Lightweight Frame</li>
                                            <li className="d-flex align-items-center"><i className="fas fa-check-circle" style={{ color: "var(--tp-theme-primary)", marginRight: "10px" }}></i> Adjustable Sizing</li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="mb-10 d-flex align-items-center"><i className="fas fa-check-circle" style={{ color: "var(--tp-theme-primary)", marginRight: "10px" }}></i> Impact Resistance</li>
                                            <li className="mb-10 d-flex align-items-center"><i className="fas fa-check-circle" style={{ color: "var(--tp-theme-primary)", marginRight: "10px" }}></i> Optimal Ventilation</li>
                                            <li className="d-flex align-items-center"><i className="fas fa-check-circle" style={{ color: "var(--tp-theme-primary)", marginRight: "10px" }}></i> Sweat-wicking Padding</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <a href={`/products/helmet/${product.id}`} className="tp-btn-ai tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm">
                                <span className="d-flex align-items-center justify-content-center">
                                    <span className="btn-text">View Product</span>
                                    <span className="btn-icon">
                                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                    <span className="btn-icon">
                                        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const sidebarPortalStyle = sidebarVisible
        ? { opacity: 1, transform: "translateX(0)" }
        : { opacity: 0, transform: "translateX(-20px)", pointerEvents: "none" };

    return (
        <>
            {/* Floating category heading — pinned at top via portal */}
            <CategoryHeadingPortal label={activeCategoryLabel} visible={categoryHeadingVisible} />

            {/* Sidebar rendered via portal — outside #smooth-content to avoid transform */}
            <SidebarPortal sidebarStyle={sidebarPortalStyle}>
                <div className="category-widget position-relative" style={{ padding: '40px 30px', borderRadius: '24px', background: 'linear-gradient(145deg, #1A1F2B 0%, #0F1218 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
                    {/* Continuous Background Track */}
                    <div style={{ position: 'absolute', left: '30px', top: '100px', bottom: '60px', width: '3px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
                        <div
                            className="sidebar-scroll-progress"
                            style={{
                                width: '100%',
                                height: '0%',
                                background: 'var(--tp-theme-primary)',
                                boxShadow: '0 0 20px var(--tp-theme-primary)',
                                borderRadius: '3px',
                                position: 'relative'
                            }}
                        >
                            <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#fff', boxShadow: '0 0 15px 5px var(--tp-theme-primary)' }}></div>
                        </div>
                    </div>
                    <div style={{ paddingLeft: '24px' }}>
                        <div className="category-group">
                            <h5 className="tp-ff-jakarta fw-700 fs-28 tp-text-common-white d-flex align-items-center mb-15" style={{ letterSpacing: '-0.5px' }}>
                                Professional
                            </h5>
                            {renderNavList(professionalProducts)}
                        </div>
                        <div className="category-group mt-30">
                            <h5 className="tp-ff-jakarta fw-700 fs-28 tp-text-common-white d-flex align-items-center mb-15" style={{ letterSpacing: '-0.5px' }}>
                                Amateurs
                            </h5>
                            {renderNavList(amateurProducts)}
                        </div>
                    </div>
                </div>
            </SidebarPortal>

            {/* Main content area (stays inside #smooth-content) */}
            <div ref={sectionRef} className="tp-product-area pt-120 pb-120 p-relative z-index-1">
                <div className="container-fluid container-1524">
                    <div className="row">
                        {/* Left spacer for sidebar width */}
                        <div className="col-lg-3 d-none d-lg-block" />

                        {/* Right Content - Products List */}
                        <div className="col-lg-8 offset-lg-1">
                            <div ref={contentRef} className="tp-product-list-content">

                                {/* Professional Category Section */}
                                <div ref={proSectionRef} className="pin-category position-relative" style={{ paddingTop: "10px" }}>
                                    {professionalProducts.map((product) => renderProductCard(product, false))}
                                </div>

                                {/* Amateur Category Section */}
                                <div ref={amateurSectionRef} className="pin-category position-relative" style={{ paddingTop: "20px" }}>
                                    {amateurProducts.map((product) => renderProductCard(product, true))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HelmetProductsSection;
