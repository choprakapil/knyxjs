"use client";
import React, { useEffect, useState, useRef } from "react";
import { withBasePath } from "@/lib/asset";
import { homeData } from "@/lib/data/home";

const resolveAsset = (src) => {
  if (!src) return "";
  if (/^(data:|https?:|\/\/)/.test(src)) return src;
  return withBasePath(src);
};

const videoMime = (src) => {
  if (!src) return "video/mp4";
  const lower = src.toLowerCase();
  if (lower.endsWith(".webm")) return "video/webm";
  if (lower.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
};

const HeroSection = ({ startPlay = true }) => {
  const videoRef = useRef(null);
  const [hero, setHero] = useState(homeData.hero);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/admin/settings", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          const homeHero = data.settings?.content?.home?.hero || {};
          setHero({
            videoSrc: homeHero.videoSrc || homeData.hero.videoSrc,
            bgImage:
              homeHero.bgImage ||
              homeHero.posterImg ||
              homeData.hero.bgImage,
            posterImg: homeHero.posterImg || homeData.hero.posterImg,
          });
        }
      } catch (error) {
        console.error("Failed to load hero content:", error);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hero.videoSrc) return;

    video.load();

    if (!startPlay) return;

    const playVideo = async () => {
      try {
        video.muted = false;
        await video.play();
        setIsMuted(false);
      } catch {
        video.muted = true;
        try {
          await video.play();
          setIsMuted(true);
        } catch (autoplayError) {
          console.error("Autoplay failed:", autoplayError);
        }
      }
    };

    const timer = setTimeout(playVideo, 150);
    return () => clearTimeout(timer);
  }, [startPlay, hero.videoSrc]);

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuteState = !videoRef.current.muted;
      videoRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);

      if (!nextMuteState) {
        videoRef.current.play().catch((err) => console.error("Could not play on unmute:", err));
      }
    }
  };

  const videoUrl = resolveAsset(hero.videoSrc);
  const posterUrl = resolveAsset(hero.posterImg || hero.bgImage);

  return (
    <section
      className="hero-section hero-section-ai"
      data-background={resolveAsset(hero.bgImage)}
    >
      <div className="video-container">
        <video
          key={videoUrl}
          ref={videoRef}
          loop
          muted={isMuted}
          playsInline
          poster={posterUrl}
          className="bg_video"
        >
          <source src={videoUrl} type={videoMime(hero.videoSrc)} />
        </video>

        <button
          onClick={toggleMute}
          className="mute-btn"
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
          <i
            className={`fa-solid ${isMuted ? "fa-volume-mute" : "fa-volume-high"}`}
            style={{ fontSize: "18px" }}
          ></i>
        </button>
      </div>

      <div className="scroll-indicator">
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
        .hero-section-ai {
          width: 100%;
          position: relative;
          padding-top: 40px;
          min-height: 80vh;
          line-height: 0;
          background: #030303;
          overflow: hidden;
        }
        .video-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .bg_video {
          width: 100%;
          height: auto;
          display: block;
          position: relative;
          z-index: 1;
        }
        .mute-btn {
          position: absolute;
          bottom: 30px;
          right: 30px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          z-index: 100;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
          padding: 40px 0 20px 0;
          pointer-events: none;
          opacity: 0.6;
          background: transparent;
        }
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
          background-color: #1b3b8a;
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
          align-items: center;
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
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(15px);
            opacity: 0;
          }
        }
        @keyframes chevronBounce {
          0% {
            opacity: 0;
            transform: rotate(45deg) translate(-5px, -5px);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: rotate(45deg) translate(5px, 5px);
          }
        }

        @media (max-width: 767px) {
          .hero-section-ai {
            padding-top: 30px;
            min-height: auto;
          }
          .scroll-indicator {
            padding: 20px 0 10px 0;
            opacity: 0.4;
          }
          .mouse-icon {
            width: 22px;
            height: 38px;
            border-width: 1.5px;
            border-radius: 11px;
          }
          .wheel {
            width: 3px;
            height: 6px;
            top: 6px;
          }
          .chevron-arrows span {
            width: 8px;
            height: 8px;
          }
          .mute-btn {
            width: 40px;
            height: 40px;
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
