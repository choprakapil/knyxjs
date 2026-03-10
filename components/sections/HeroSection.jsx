"use client";
import { withBasePath } from "@/lib/asset";

const HeroSection = () => (
  <section className="hero-section"
    style={{ height: "70vh", width: "100vw", overflow: "hidden", position: "relative" }}
    data-background="/assets/img/hero/ai/bg-black.jpg">

    <video autoPlay loop muted playsInline className="bg_video" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }}>
      <source src={withBasePath("/assets/video/hero.mp4")} type="video/mp4" />
    </video>

  </section>
);

export default HeroSection;
