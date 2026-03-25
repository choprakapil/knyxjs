"use client";
import React from "react";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import Offcanvas from "@/components/layout/Offcanvas";
import TechnologySection from "@/components/sections/TechnologySection";
import { technologyContent } from "@/lib/data/technology";

export default function TechnologyPage() {
    const { hero, sections } = technologyContent;

    return (
        <div style={{ backgroundColor: "#030303" }}>
            <div className="tp-hero-ai-body-overlay"></div>
            <BackToTop />
            <Offcanvas />
            <Header />
            <ClientRuntime />
            <main>
                {/* Hero Section */}
                <TechnologySection 
                    title={hero.title}
                    content={hero.content}
                    image={hero.image}
                    imageAlt={hero.imageAlt}
                    reverse={hero.reverse}
                    badge={hero.badge}
                    isHero={true}
                />
                
                {/* Other Sections */}
                {(sections || []).map((section, index) => (
                    <TechnologySection 
                        key={index}
                        title={section.title}
                        content={section.content}
                        image={section.image}
                        video={section.video}
                        imageAlt={section.imageAlt}
                        reverse={section.reverse}
                        isHero={false}
                    />
                ))}
            </main>
            <Footer />
            <LegacyScripts />
        </div>
    );
}
