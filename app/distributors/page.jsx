"use client";
import React from "react";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import Offcanvas from "@/components/layout/Offcanvas";
import DistributorsSection from "@/components/sections/DistributorsSection";

export default function DistributorsPage() {
    return (
        <div style={{ backgroundColor: "#030303" }}>
            <div className="tp-hero-ai-body-overlay"></div>
            <BackToTop />
            <Offcanvas />
            <Header />
            <ClientRuntime />
            <main>
                <DistributorsSection />
            </main>
            <Footer />
            <LegacyScripts />
        </div>
    );
}
