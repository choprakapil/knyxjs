"use client";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import MagicCursor from "@/components/layout/MagicCursor";
import Offcanvas from "@/components/layout/Offcanvas";
import Breadcrumb from "@/components/common/Breadcrumb";
import HelmetProductsSection from "@/components/sections/HelmetProductsSection";

export default function HelmetProductsPage() {
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
                <Breadcrumb
                    title="Cricket Helmets"
                    eyebrow="Products"
                    description="Explore our premium range of professional and amateur cricket helmets."
                />
                <HelmetProductsSection />
            </main>
            <Footer />
            {/* <LegacyScripts /> */}
        </>
    );
}
