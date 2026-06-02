"use client";
import React, { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/asset";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { slugify } from "@/lib/utils";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { mergeCatalogForCategory } from "@/lib/catalog";
import { getProductImageSrc } from "@/lib/mapProduct";

gsap.registerPlugin(ScrollTrigger);

const CategoryProductsSection = ({ category, categorySlugFilter }) => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [categoryProducts, setCategoryProducts] = useState([]);
    const { site: siteData } = useSiteSettings();

    const getProductSlug = (product) => slugify(product?.slug ?? product?.name);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                if (data.success) {
                    setCategoryProducts(mergeCatalogForCategory(data.data, category));
                    return;
                }
            } catch (err) {
                console.error("Failed to load products:", err);
            }
            setCategoryProducts(mergeCatalogForCategory([], category));
        };
        load();
    }, [category]);

    // Group products dynamically (e.g., "Professional", "Amateur")
    const groupedProducts = categoryProducts.reduce((acc, product) => {
        const cat = product.category || "General";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(product);
        return acc;
    }, {});

    const groups = Object.keys(groupedProducts);
    const allFilteredProducts = categoryProducts;

    useEffect(() => {
        if (typeof window === "undefined" || !sectionRef.current) return;

        const cards = gsap.utils.toArray(".helmet-product-card");
        if (cards.length === 0) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top+=120", // Header-safe start
                end: "bottom bottom",
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const index = Math.min(
                        Math.floor(progress * cards.length),
                        cards.length - 1
                    );
                    setActiveIndex(index);
                },
            },
        });

        const step = 1 / cards.length;

        cards.forEach((card, i) => {
            const start = i * step;
            const mid = start + step / 2;

            const productItem = card.querySelector(".product-item");
            const isFirst = i === 0;

            // Entrance and highlight
            tl.fromTo(
                card,
                { 
                    y: isFirst ? 0 : 300, 
                    scale: isFirst ? 1.05 : 0.85, 
                    opacity: isFirst ? 1 : 0 
                },
                {
                    y: 0,
                    scale: 1.05,
                    opacity: 1,
                    ease: "power2.out",
                    duration: step / 2,
                },
                start
            );

            if (productItem) {
                tl.fromTo(
                    productItem,
                    { 
                        borderColor: isFirst ? "var(--tp-theme-primary)" : "rgba(255,255,255,0.05)", 
                        boxShadow: isFirst ? "0 0 30px rgba(50, 87, 255, 0.3)" : "0 0 0px rgba(50, 87, 255, 0)" 
                    },
                    {
                        borderColor: "var(--tp-theme-primary)",
                        boxShadow: "0 0 30px rgba(50, 87, 255, 0.3)",
                        ease: "power2.out",
                        duration: step / 2,
                    },
                    start
                );
            }

            // Exit
            tl.to(
                card,
                {
                    y: -300,
                    scale: 0.85,
                    opacity: 0,
                    ease: "power2.in",
                    duration: step / 2,
                },
                mid
            );

            if (productItem) {
                tl.to(
                    productItem,
                    {
                        borderColor: "rgba(255,255,255,0.05)",
                        boxShadow: "0 0 0px rgba(50, 87, 255, 0)",
                        ease: "power2.in",
                        duration: step / 2,
                    },
                    mid
                );
            }
        });

        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
            tl.kill();
        };
    }, [allFilteredProducts.length]);

    const scrollToProduct = (e, id, index) => {
        e.preventDefault();

        if (typeof window !== "undefined" && window.ScrollTrigger) {
            // Find the master ScrollTrigger we created for this section bounds
            const st = window.ScrollTrigger.getAll().find(
                st => st.trigger === sectionRef.current
            );

            if (st) {
                const totalCards = allFilteredProducts.length;
                // Add a tiny fractional offset (+0.01) to ensure we cross the threshold into the active index
                const progress = (index / totalCards) + 0.005;
                const targetY = st.start + (st.end - st.start) * progress;
                
                window.scrollTo({
                    top: targetY,
                    behavior: "smooth"
                });
            }
        }
    };

    const renderNavList = (products, startIndex) => (
        <ul className="list-unstyled position-relative m-0 mt-10" style={{ paddingLeft: "0" }}>
            {products.map((product, idx) => {
                const globalIdx = startIndex + idx;
                const isActive = activeIndex === globalIdx;
                return (
                    <li key={`${product.id}-${globalIdx}`} className="position-relative" style={{ paddingTop: "6px", paddingBottom: "6px" }}>
                        <a
                            href="#"
                            onClick={(e) => scrollToProduct(e, product.id, globalIdx)}
                            className={`tp-ff-jakarta fw-600 fs-20 transition-3 d-inline-block position-relative ${isActive ? "tp-text-common-white" : "tp-text-grey-2 hover-text-primary"}`}
                            style={{
                                transform: isActive ? "translateX(10px)" : "translateX(0)",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                opacity: isActive ? 1 : 0.6,
                                letterSpacing: "-0.02em"
                            }}
                        >
                            {product.name}
                        </a>
                    </li>
                );
            })}
        </ul>
    );

    const renderProductCard = (product, isAlternate = false) => (
        <div className="product-item p-4 tp-round-10" style={{ padding: "30px", width: "100%", display: "flex", alignItems: "center", backgroundColor: "rgba(255, 255, 255, 0.04)", backdropFilter: "blur(20px)", borderRadius: "24px", position: "relative", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="row align-items-center w-100 m-0">
                <div className={`col-lg-6 mb-4 mb-lg-0 ${isAlternate ? "order-lg-2" : ""}`}>
                    <div className="product-image p-relative overflow-hidden tp-round-10" style={{ backgroundColor: "rgba(0,0,0,0.5)", mixBlendMode: "screen", height: "350px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <img
                            src={getProductImageSrc(product, withBasePath)}
                            alt={product.name}
                            className="img-fluid"
                            style={{ maxHeight: "100%", objectFit: "contain" }}
                        />
                    </div>
                </div>
                <div className={`col-lg-6 ${isAlternate ? "order-lg-1" : ""}`}>
                    <div className={`product-content ${isAlternate ? "pr-30" : "pl-30"}`}>
                        <h3 className="tp-ff-jakarta fw-600 fs-36 mb-20 tp-text-common-white">{product.name}</h3>
                        <p className="tp-ff-dm fw-400 fs-18 lh-150-per tp-text-grey-2 mb-30">
                            {product.description}
                        </p>
                        <a href={`/products/${category}/${getProductSlug(product)}`} className="tp-btn-ai tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm">
                            <span className="d-flex align-items-center justify-content-center">
                                <span className="btn-text">{siteData.ui.viewProductBtn}</span>
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
    );

    return (
        <section id="category-products-section" className="products-section-root" ref={sectionRef} style={{ background: "#030303" }}>
            <div className="products-wrapper">
                <div className="container-fluid container-1524 h-100">
                    <div className="products-inner">
                        <aside className="products-sidebar">
                            <div className="sidebar-group">
                                {groups.map((group, idx) => {
                                    const groupProducts = groupedProducts[group];
                                    const startIndex = allFilteredProducts.indexOf(groupProducts[0]);
                                    return (
                                        <div key={group} className={`category-group ${idx > 0 ? "mt-30" : ""}`}>
                                            <h5 className="tp-ff-jakarta fw-700 fs-28 tp-text-common-white d-flex align-items-center mb-15">{group}</h5>
                                            {renderNavList(groupProducts, startIndex)}
                                        </div>
                                    );
                                })}
                            </div>
                        </aside>

                        <div className="products-stage">
                            {allFilteredProducts.map((product, i) => (
                                <div key={`${product.id}-${i}`} className="helmet-product-card">
                                    {renderProductCard(product, i % 2 !== 0)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                #category-products-section {
                    position: relative;
                    height: 500vh;
                    min-height: 500vh;
                }

                /* Fix for clicked text turning black */
                .products-sidebar a:focus,
                .products-sidebar a:active {
                    outline: none;
                }
                .products-sidebar a.tp-text-common-white:focus,
                .products-sidebar a.tp-text-common-white:active {
                    color: #ffffff !important;
                }
                .products-sidebar a.hover-text-primary:focus,
                .products-sidebar a.hover-text-primary:active {
                    color: var(--tp-grey-2) !important;
                }
                .products-sidebar a.hover-text-primary:hover {
                    color: var(--tp-theme-primary) !important;
                }

                .products-wrapper {
                    position: sticky;
                    top: 120px;
                    height: calc(100vh - 120px);
                    min-height: 80vh;
                    overflow: hidden;
                    width: 100%;
                }

                .products-inner {
                    display: flex;
                    height: 100%;
                    padding: 40px 0;
                }

                .products-sidebar {
                    width: 280px;
                    position: relative;
                    padding-right: 40px;
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                }

                .products-stage {
                    flex: 1;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                }

                .helmet-product-card {
                    position: absolute;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%) scale(0.85);
                    width: 90%;
                    max-width: 1000px;
                    opacity: 0;
                    z-index: 1;
                    pointer-events: none;
                }

                .helmet-product-card :global(.tp-btn-ai) {
                    pointer-events: auto; /* enable buttons on inactive but rendering cards if needed, though they fade in/out */
                }

                @media (max-width: 1199px) {
                    .products-sidebar { width: 220px; }
                    .product-image { height: 300px !important; }
                    .fs-36 { font-size: 28px !important; }
                }

                @media (max-width: 991px) {
                    #category-products-section { height: auto !important; min-height: auto !important; }
                    .products-wrapper { position: relative !important; top: 0 !important; height: auto !important; overflow: visible !important; }
                    .products-inner { flex-direction: column !important; padding: 20px 0 !important; }
                    
                    .products-sidebar { 
                        width: 100% !important; 
                        border-right: none !important; 
                        border-bottom: 1px solid rgba(255,255,255,0.05) !important; 
                        padding-bottom: 30px !important; 
                        margin-bottom: 30px !important; 
                        padding-right: 0 !important;
                        text-align: center !important;
                    }

                    .sidebar-group .category-group {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .sidebar-group ul {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 15px;
                    }

                    .sidebar-group li {
                        padding: 0 !important;
                    }

                    .products-stage { display: block !important; overflow: visible !important; }
                    .helmet-product-card { 
                        position: relative !important; 
                        top: 0 !important; 
                        left: 0 !important; 
                        transform: none !important; 
                        width: 100% !important; 
                        opacity: 1 !important; 
                        margin-bottom: 40px !important; 
                        pointer-events: auto !important; 
                    }

                    .product-item {
                        flex-direction: column !important;
                        padding: 20px !important;
                        text-align: center !important;
                    }

                    .product-item .row {
                        flex-direction: column !important;
                    }

                    .product-item .col-lg-6 {
                        width: 100% !important;
                        order: 0 !important;
                        padding: 0 !important;
                        margin-bottom: 25px !important;
                    }

                    .product-content {
                        padding: 0 !important;
                    }

                    .product-image {
                        height: 250px !important;
                    }

                    .fs-36 {
                        font-size: 24px !important;
                    }

                    .fs-18 {
                        font-size: 16px !important;
                    }
                }

                @media (max-width: 767px) {
                    .fs-28 {
                        font-size: 22px !important;
                    }
                    .sidebar-group ul {
                        gap: 10px;
                    }
                    .sidebar-group a {
                        font-size: 16px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default CategoryProductsSection;