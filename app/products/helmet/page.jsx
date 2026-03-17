"use client";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import MagicCursor from "@/components/layout/MagicCursor";
import Offcanvas from "@/components/layout/Offcanvas";
import HelmetProductsSection from "@/components/sections/HelmetProductsSection";

export default function HelmetProductsPage() {
    const categorySlugFilter = "professional";
    const allowedProductSlugs = ["c7-iso-pro", "c7", "c5", "c7-iso-pro"];

    return (
        <>
            <div className="tp-hero-ai-body-overlay"></div>
            <MagicCursor />
            <BackToTop />
            <Offcanvas />
            <Header />
            {/* Legacy Runtime Disabled for Refactor */}
            {/* <ClientRuntime /> */}
            <main>
                <HelmetProductsSection
                    categorySlugFilter={categorySlugFilter}
                    allowedProductSlugs={allowedProductSlugs}
                />
            </main>
            <Footer />
            {/* <LegacyScripts /> */}
        </>
    );
}
