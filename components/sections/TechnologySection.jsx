"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { withBasePath } from "@/lib/asset";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechnologySection = ({ title, content, image, imageAlt, reverse, badge, isHero = false, video = null }) => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isVideoModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isVideoModalOpen]);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    useEffect(() => {
        if (isVideoModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isVideoModalOpen]);

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
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill();
            }
            tl.kill();
        };
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className={`tp-tech-section ${isHero ? "pt-100 pb-80" : "pt-80 pb-80"} p-relative z-index-1`}
            style={{ maxHeight: "90vh" }}
        >
            <div className="container-fluid container-1524 h-100">
                <div className={`row align-items-stretch ${reverse ? "flex-row-reverse" : ""}`}>
                    
                    {/* Image/Video Area */}
                    <div className="col-lg-6 mb-40 mb-lg-0 tech-reveal d-flex">
                        <div 
                            className="tech-image-wrapper p-relative overflow-hidden tp-round-24 w-100"
                            style={{ 
                                padding: video ? 0 : "30px", 
                                height: "100%", 
                                minHeight: "360px",
                                maxHeight: "calc(90vh - 200px)",
                                maxWidth: video ? "600px" : "100%",
                                margin: "0 auto",
                                boxShadow: video ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
                                border: video ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.05)"
                            }}
                        >
                            {video ? (
                                <>
                                    <video 
                                        ref={videoRef}
                                        src={withBasePath(video)} 
                                        autoPlay 
                                        loop 
                                        muted={isMuted} 
                                        playsInline 
                                        className="cursor-pointer"
                                        style={{ 
                                            width: "100%", 
                                            height: "100%",
                                            objectFit: "cover",
                                            display: "block", 
                                            borderRadius: "24px",
                                            boxShadow: "inset 0 0 100px rgba(0,0,0,0.5)",
                                            cursor: "pointer"
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsVideoModalOpen(true);
                                            if (videoRef.current) videoRef.current.pause();
                                        }}
                                    />
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleMute();
                                        }}
                                        style={{
                                            position: "absolute",
                                            bottom: "20px",
                                            right: "20px",
                                            background: "rgba(0,0,0,0.5)",
                                            border: "1px solid rgba(255,255,255,0.2)",
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#fff",
                                            zIndex: 20,
                                            cursor: "pointer"
                                        }}
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                    >
                                        <i className={`fa-solid ${isMuted ? "fa-volume-mute" : "fa-volume-high"}`}></i>
                                    </button>
                                </>
                            ) : (
                                <img 
                                    src={withBasePath(image)} 
                                    alt={imageAlt} 
                                    className="img-fluid" 
                                />
                            )}
                        </div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="col-lg-6 tech-reveal d-flex align-items-center">
                        <div className={`tech-content ${reverse ? "pl-50" : "pr-50"}`}>
                            {isHero && (
                                <span className="tp-ff-jakarta fw-600 fs-14 tp-text-common-white mb-15 d-inline-block text-uppercase ls-1 title-slide-gradient">
                                    {badge}
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

            {/* Full Screen Video Modal */}
            {isVideoModalOpen && mounted && createPortal(
                <div 
                    className="video-modal-overlay"
                    style={{
                        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                        background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)",
                        zIndex: 10000000, display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "20px"
                    }}
                    onClick={() => {
                        setIsVideoModalOpen(false);
                        if (videoRef.current) videoRef.current.play();
                    }}
                >
                    <button 
                        style={{
                            position: "absolute", top: "30px", right: "30px",
                            background: "transparent", border: "none", color: "#fff",
                            fontSize: "40px", cursor: "pointer", zIndex: 10000001
                        }}
                        onClick={() => {
                            setIsVideoModalOpen(false);
                            if (videoRef.current) videoRef.current.play();
                        }}
                    >
                        &times;
                    </button>
                    <div style={{ maxWidth: "1200px", width: "100%", maxHeight: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <video 
                            src={withBasePath(video)}
                            autoPlay
                            loop
                            // controls
                            style={{ 
                                maxWidth: "100%", 
                                maxHeight: "90vh", 
                                objectFit: "contain", 
                                borderRadius: "8px", 
                                boxShadow: "0 0 50px rgba(27, 59, 138, 0.3)" 
                            }}
                            onMouseEnter={(e) => e.target.controls = true}
                            onMouseLeave={(e) => e.target.controls = false}
                        />
                    </div>
                </div>,
                document.body
            )}

            <style jsx>{`
                .tech-image-wrapper {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    backdrop-filter: blur(20px);
                    transition: border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s ease;
                }
                .tech-image-wrapper:hover {
                    border-color: rgba(27, 59, 138, 0.3);
                    box-shadow: 0 0 40px rgba(27, 59, 138, 0.15);
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
