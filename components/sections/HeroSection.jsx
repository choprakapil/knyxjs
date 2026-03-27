"use client";
import { withBasePath } from "@/lib/asset";
import { homeData } from "@/lib/data/home";

const HeroSection = () => (
  <section className="hero-section"
    style={{ width: "100%", position: "relative", paddingTop: "95px", minHeight: "80vh", lineHeight: 0, background: "#030303", overflow: "hidden" }}
    data-background={homeData.hero.bgImage}>

    <video
      autoPlay
      loop
      muted
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

export default HeroSection;
