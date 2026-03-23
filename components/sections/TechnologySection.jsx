"use client";
import React, { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/asset";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechnologySection = ({ title, content, image, reverse, isHero = false }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined" || !sectionRef.current) return;

        const elements = sectionRef.current.querySelectorAll(".tech-reveal");
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top center+=200",
                toggleActions: "play none none none"
            }
        });

        tl.fromTo(elements, 
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            }
        );

        return () => {
            if (ScrollTrigger.getById(sectionRef.current.id)) {
                ScrollTrigger.getById(sectionRef.current.id).kill();
            }
            tl.kill();
        };
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className={`tp-tech-section ${isHero ? "pt-150 pb-80" : "pt-80 pb-80"} p-relative z-index-1`}
        >
            <div className="container-fluid container-1524">
                <div className={`row align-items-center ${reverse ? "flex-row-reverse" : ""}`}>
                    
                    {/* Image Area */}
                    <div className="col-lg-6 mb-40 mb-lg-0 tech-reveal">
                        <div className="tech-image-wrapper p-relative overflow-hidden tp-round-24">
                            <img 
                                src={withBasePath(image)} 
                                alt={title} 
                                className="img-fluid" 
                            />
                        </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="col-lg-6 tech-reveal">
                        <div className={`tech-content ${reverse ? "pl-50" : "pr-50"}`}>
                            {isHero && (
                                <span className="tp-ff-jakarta fw-600 fs-14 tp-text-theme-primary mb-15 d-inline-block text-uppercase ls-1">
                                    CORE ENGINEERING
                                </span>
                            )}
                            <h2 className="tp-ff-jakarta fw-600 fs-42 fs-md-36 mb-25 tp-text-common-white">
                                {title}
                            </h2>
                            <div 
                                className="tp-ff-dm fw-400 fs-18 lh-160-per tp-text-grey-2"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .tech-image-wrapper {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 480px;
                    backdrop-filter: blur(20px);
                    transition: border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease;
                }
                .tech-image-wrapper:hover {
                    border-color: rgba(25, 135, 84, 0.3);
                    box-shadow: 0 0 40px rgba(25, 135, 84, 0.15);
                    transform: translateY(-8px);
                }
                .tech-image-wrapper img {
                    max-height: 100%;
                    object-fit: contain;
                    transition: transform 0.8s ease;
                    mix-blend-mode: screen;
                }
                .tech-image-wrapper:hover img {
                    transform: scale(1.05);
                }
                .tech-content {
                    max-width: 550px;
                }
                @media (max-width: 1200px) {
                    .tech-content { padding: 0 !important; }
                }
                @media (max-width: 991px) {
                    .tech-image-wrapper { height: 380px; margin-bottom: 40px; }
                }
            `}</style>
        </section>
    );
};

export default TechnologySection;
