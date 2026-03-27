"use client";
import React, { useRef, useState } from "react";
import { withBasePath } from "@/lib/asset";
import { homeData } from "@/lib/data/home";

const HeroSection = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="hero-section"
      style={{ width: "100%", position: "relative", paddingTop: "95px", minHeight: "80vh", lineHeight: 0, background: "#030303", overflow: "hidden" }}
      data-background={homeData.hero.bgImage}>

      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="bg_video"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      >
        <source src={withBasePath(homeData.hero.videoSrc)} type="video/mp4" />
      </video>

      {/* Mute/Unmute Toggle Button */}
      <button 
        onClick={toggleMute}
        style={{
          position: "absolute",
          bottom: "30px",
          right: "30px",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%",
          width: "46px",
          height: "46px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          zIndex: 100,
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(50, 87, 255, 0.4)";
          e.currentTarget.style.borderColor = "rgba(50, 87, 255, 0.6)";
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(0,0,0,0.4)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          e.currentTarget.style.transform = "scale(1)";
        }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <i className={`fa-solid ${isMuted ? "fa-volume-mute" : "fa-volume-high"}`} style={{ fontSize: "18px" }}></i>
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          padding: "40px 0 20px 0",
          pointerEvents: "none",
          opacity: 0.6,
          background: "transparent"
        }}
        className="scroll-indicator"
      >
        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
        <div className="chevron-arrows">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <style jsx>{`
        .scroll-indicator:hover {
          opacity: 1 !important;
        }
        .mouse-icon {
          width: 30px;
          height: 50px;
          border: 2px solid #fff;
          border-radius: 15px;
          position: relative;
          margin-bottom: 5px;
        }
        .wheel {
          width: 4px;
          height: 8px;
          background-color: #1B3B8A;
          border-radius: 2px;
          position: absolute;
          top: 8px;
          left: 50%;
          margin-left: -2px;
          animation: scrollWheel 2s infinite ease-out;
        }
        .chevron-arrows {
          display: flex;
          flex-direction: column;
          alignItems: "center";
          margin-top: -8px;
        }
        .chevron-arrows span {
          display: block;
          width: 10px;
          height: 10px;
          border-bottom: 2px solid #fff;
          border-right: 2px solid #fff;
          transform: rotate(45deg);
          margin: -3px auto;
          animation: chevronBounce 2s infinite;
        }
        .chevron-arrows span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .chevron-arrows span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes scrollWheel {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }
        @keyframes chevronBounce {
          0% { opacity: 0; transform: rotate(45deg) translate(-5px, -5px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: rotate(45deg) translate(5px, 5px); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
