"use client";
import React from "react";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import Offcanvas from "@/components/layout/Offcanvas";
import TechnologySection from "@/components/sections/TechnologySection";

export default function TechnologyPage() {
    const techSections = [
        {
            title: "The Science Behind KNYX Cricket Helmets",
            content: "At KNYX, technology is the core of our design philosophy. Every helmet is the result of advanced engineering, material science, and relentless testing, created to deliver protection you can trust at every level of the game. We use high performance materials selected for their strength to weight ratio, durability and resilience under pressure. Each layer within a KNYX helmet serves a precise function — from outer shell rigidity to inner cushioning — working together as a unified protection system.",
            image: "/assets/img/products/1.png",
            reverse: false
        },
        {
            title: "Outer Layer",
            content: "The shell of KNYX C7 Cricket Helmets form the cornerstone for Pro Level Players by incorporating layers of Carbon Composite which distribute and dissipate impact energy across the fibre matrix, reducing localized stress and deformation resulting in a lighter shell with higher structural integrity.<br/><br/>Similarly, KNYX C5 and C3 ranges are built with Impact Modified Polymer shell designed to undergo controlled plastic deformation under impact. This absorbs and dissipate energy without cracking or shattering making it a reliable material where accessibility and durability are key.",
            image: "/assets/img/products/2.png",
            reverse: true
        },
        {
            title: "Inner Layer",
            content: "The internal Impact Layer of our C7 and C5 cricket helmets is constructed with Expanded Polypropylene (EPP) which offers superior performance under repeated and variable impact loading conditions. It absorbs energy and returns to its original shape, maintaining protective performance over multiple impacts.<br/><br/>Impact Lining of our C3 and other Cricket Helmets utilise Expanded Polystyrene (EPS) which is effective for a single high impact protection through permanent densification and irreversible cell deformation.",
            image: "/assets/img/products/3.png",
            reverse: false
        },
        {
            title: "Impact Intelligence",
            content: "KNYX C5 and C7 Cricket Helmet are constructed with our in-house Radial Impact Mitigation (RIM) System. RIM employs unique moulding abilities of EPP to create flexible and autonomous pods that absorb, disperse, and reduce the force of high-speed linear and lateral impacts. Through carefully engineered geometry and energy-dissipating material, we minimized shock transfer while maintaining structural integrity resulting in superior protection without unnecessary bulk.<br/><br/>The Inner Layer of all our other helmets is designed with a variable thickness EPS lining that directs impact forces away from the player’s head while progressively absorbing the shock via singular buckling behaviour.",
            image: "/assets/img/products/4.png",
            reverse: true
        },
        {
            title: "Thermal Management",
            content: "The Engineered Ventilation System (EVS) is a designed by-product of the RIM System. This resulted in creation of multiple air pathways in between the Shell and the EPP which increases airflow and reduces heat buildup by generating a cooling wind exchange system in C7 and C5 ranges of helmet.<br/><br/>The C3 and other cricket helmet models take advantage of strategically placed inlets and outlets on the helmet to optimize airflow and regulate temperature allowing players to stay focused under pressure.",
            image: "/assets/img/products/5.png",
            reverse: false
        },
        {
            title: "Precision Fit System",
            content: "All of the KNYX helmets feature ergonomic design principles and variable fit systems that ensure stability, comfort, and secure positioning during play because protection is only efficient when it fits perfectly.<br/><br/>KNYX C7 and C5 Cricket Helmets are equipped with patented ISOFIT micro adjustment system. IsoFit adapts to the unique shape of each wearer’s head, delivering a truly personalized fit without ever needing to 3D scan your head. IsoFit evenly distributes helmet weight around the head, keeping the helmet stable, balanced and centred during use.<br/><br/>Fit systems on our C3 and other cricket helmets are designed to tighten around the lower head with either the use of our unique 360 fit system or achieve stability with conforming comfort liner for easy and quick adjustments for a perfect fit.",
            image: "/assets/img/products/6.png",
            reverse: true
        },
        {
            title: "Facial Protection",
            content: "Every KNYX Helmet Is equipped with our proprietary Tactical Faceguard engineered for optimal protection. The unique lightweight design expands the frontal as well as peripheral vision for better tracking of the incoming ball. The compact and optimized structure contours to the face while reducing gaps to hinder any possible penetration of the ball and evading facial contact.",
            image: "/assets/img/products/7.png",
            reverse: false
        }
    ];

    return (
        <div style={{ backgroundColor: "#030303" }}>
            <div className="tp-hero-ai-body-overlay"></div>
            <BackToTop />
            <Offcanvas />
            <Header />
            <ClientRuntime />
            <main>
                {techSections.map((section, index) => (
                    <TechnologySection 
                        key={index}
                        title={section.title}
                        content={section.content}
                        image={section.image}
                        reverse={section.reverse}
                        isHero={index === 0}
                    />
                ))}
            </main>
            <Footer />
            <LegacyScripts />
        </div>
    );
}
