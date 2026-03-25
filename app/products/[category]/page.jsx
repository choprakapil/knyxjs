"use client";
import React, { use } from "react";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import Offcanvas from "@/components/layout/Offcanvas";
import CategoryProductsSection from "@/components/sections/CategoryProductsSection";

export default function CategoryProductsPage({ params }) {
    // Next 15+ unwraps params using React.use()
    const { category } = use(params);
    const categorySlugFilter = "professional";

    return (
        <>
            <div className="tp-hero-ai-body-overlay"></div>
            <BackToTop />
            <Offcanvas />
            <Header />
            <ClientRuntime />
            <CategoryProductsSection
                category={category}
                categorySlugFilter={categorySlugFilter}
            />
            <Footer />
            <LegacyScripts />
        </>
    );
}
