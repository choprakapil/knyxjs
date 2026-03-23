"use client";
import React, { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/asset";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slugify = (value) =>
    String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const HelmetProductsSection = ({ categorySlugFilter, allowedProductSlugs }) => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const professionalProducts = [
        { id: "product-1", name: "C7 Iso Pro", image: "1.png", slug: "c7-iso-pro" },
        { id: "product-1b", name: "C7", image: "2.png", slug: "c7" },
        { id: "product-1c", name: "C5 Iso Pro", image: "3.png", slug: "c5-iso-pro" },
        { id: "product-1d", name: "C5", image: "4.png", slug: "c5" },
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

    const normalizedCategorySlugFilter = categorySlugFilter ? slugify(categorySlugFilter) : null;
    const allowProfessional = !normalizedCategorySlugFilter || normalizedCategorySlugFilter === "professional";
    const allowAmateurs = !normalizedCategorySlugFilter || normalizedCategorySlugFilter === "amateurs";

    const normalizedAllowedProductSlugs = Array.isArray(allowedProductSlugs)
        ? allowedProductSlugs.map((s) => slugify(s)).filter(Boolean)
        : null;

    const getProductSlug = (product) => slugify(product?.slug ?? product?.name);

    const buildFilteredProducts = (products) => {
        if (!normalizedAllowedProductSlugs) return products;
        const bySlug = new Map();
        products.forEach((p) => {
            const s = getProductSlug(p);
            if (s && !bySlug.has(s)) bySlug.set(s, p);
        });
        return normalizedAllowedProductSlugs
            .map((slug, idx) => {
                const p = bySlug.get(slug);
                if (!p) return null;
                return { ...p, routeId: p.id };
            })
            .filter(Boolean);
    };

    const filteredProfessionalProducts = allowProfessional ? buildFilteredProducts(professionalProducts) : [];
    const filteredAmateurProducts = allowAmateurs ? buildFilteredProducts(amateurProducts) : [];
    const allProducts = [...filteredProfessionalProducts, ...filteredAmateurProducts];

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
                        boxShadow: isFirst ? "0 0 30px rgba(25, 135, 84, 0.3)" : "0 0 0px rgba(25, 135, 84, 0)" 
                    },
                    {
                        borderColor: "var(--tp-theme-primary)",
                        boxShadow: "0 0 30px rgba(25, 135, 84, 0.3)",
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
                        boxShadow: "0 0 0px rgba(25, 135, 84, 0)",
                        ease: "power2.in",
                        duration: step / 2,
                    },
                    mid
                );
            }
        });

        return () => {
            if (ScrollTrigger.getById(sectionRef.current.id)) {
                ScrollTrigger.getById(sectionRef.current.id).kill();
            }
            tl.kill();
        };
    }, [allProducts.length]);

    const scrollToProduct = (e, id, index) => {
        e.preventDefault();

        if (typeof window !== "undefined" && window.ScrollTrigger) {
            const triggers = window.ScrollTrigger.getAll().filter(
                st => st.trigger && st.trigger.classList.contains("helmet-product-card")
            );

            if (triggers[index]) {
                window.scrollTo({
                    top: triggers[index].start + 5,
                    behavior: "smooth"
                });
                return;
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
                            className={`tp-ff-inter fw-500 fs-14 transition-3 d-inline-block position-relative ${isActive ? "tp-text-common-white" : "tp-text-grey-2 hover-text-primary"}`}
                            style={{
                                transform: isActive ? "translateX(10px)" : "translateX(0)",
                                transition: "all 0.3s ease",
                                opacity: isActive ? 1 : 0.5,
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
                            src={withBasePath(`/assets/img/products/${product.image}`)}
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
                            {isAlternate
                                ? "The perfect starting point for new and aspiring cricketers. Designed giving priority to essential safety without compromising on visibility and airflow."
                                : "Engineered for maximum protection and undeniable style. Features advanced impact absorption and an ultra-lightweight titanium/steel blend grille."}
                        </p>
                        <a href={`/products/helmet/${getProductSlug(product)}`} className="tp-btn-ai tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm">
                            <span className="d-flex align-items-center justify-content-center">
                                <span className="btn-text">View Product</span>
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
        <section id="helmet-products-section" ref={sectionRef}>
            <div className="products-wrapper">
                <div className="container-fluid container-1524 h-100">
                    <div className="products-inner">
                        <aside className="products-sidebar">
                            <div className="sidebar-group">
                                {allowProfessional && (
                                    <div className="category-group">
                                        <h5 className="tp-ff-jakarta fw-700 fs-28 tp-text-common-white d-flex align-items-center mb-15">Professional</h5>
                                        {renderNavList(filteredProfessionalProducts, 0)}
                                    </div>
                                )}
                                {allowAmateurs && (
                                    <div className="category-group mt-30">
                                        <h5 className="tp-ff-jakarta fw-700 fs-28 tp-text-common-white d-flex align-items-center mb-15">Amateurs</h5>
                                        {renderNavList(filteredAmateurProducts, filteredProfessionalProducts.length)}
                                    </div>
                                )}
                            </div>
                        </aside>

                        <div className="products-stage">
                            {allProducts.map((product, i) => (
                                <div key={`${product.id}-${i}`} className="helmet-product-card">
                                    {renderProductCard(product, i >= filteredProfessionalProducts.length)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                #helmet-products-section {
                    position: relative;
                    height: 500vh; /* Increased for smoother control over more cards */
                    background: #030303;
                }

                .products-wrapper {
                    position: sticky;
                    top: 120px;
                    height: calc(100vh - 120px);
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
                    align-items: center;
                    justify-content: center;
                }

                .helmet-product-card {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.85);
                    width: 90%;
                    max-width: 1000px;
                    opacity: 0;
                    z-index: 1;
                    pointer-events: none;
                }

                .helmet-product-card :global(.tp-btn-ai) {
                    pointer-events: auto; /* enable buttons on inactive but rendering cards if needed, though they fade in/out */
                }

                @media (max-width: 1200px) {
                    .products-sidebar { width: 220px; }
                }

                @media (max-width: 991px) {
                    #helmet-products-section { height: auto; }
                    .products-wrapper { position: relative; top: 0; height: auto; overflow: visible; }
                    .products-inner { flex-direction: column; }
                    .products-sidebar { width: 100%; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 30px; margin-bottom: 30px; }
                    .products-stage { display: block; overflow: visible; }
                    .helmet-product-card { position: relative; top: 0; left: 0; transform: none !important; width: 100%; opacity: 1 !important; margin-bottom: 30px; pointer-events: auto; }
                }
            `}</style>
        </section>
    );
};

export default HelmetProductsSection;