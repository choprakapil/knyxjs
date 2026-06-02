"use client";
import React, { useEffect, useState } from "react";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import Offcanvas from "@/components/layout/Offcanvas";
import TechnologySection from "@/components/sections/TechnologySection";
import { technologyContent } from "@/lib/data/technology";

export default function TechnologyPage() {
    const [hero, setHero] = useState(technologyContent.hero);
    const [sections, setSections] = useState(technologyContent.sections);

    useEffect(() => {
        const loadTechnology = async () => {
            try {
                const res = await fetch("/api/admin/settings");
                const data = await res.json();
                if (data.success) {
                    const tech = data.settings?.content?.technology;
                    if (tech) {
                        setHero({ ...technologyContent.hero, ...tech.hero });
                        setSections(tech.sections || technologyContent.sections);
                    }
                }
            } catch (error) {
                console.error("Failed to load technology content:", error);
            }
        };

        loadTechnology();
    }, []);

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
