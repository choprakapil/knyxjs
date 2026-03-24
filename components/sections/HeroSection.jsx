"use client";
import { withBasePath } from "@/lib/asset";

const HeroSection = () => (
  <section className="hero-section"
    style={{ width: "100%", position: "relative" }}
    data-background="/assets/img/hero/ai/bg-black.jpg">

    <video
      autoPlay
      loop
      muted
      playsInline
      className="bg_video"
      style={{
        width: "100%",
        height: "auto",
        display: "block"
      }}
    >
      <source src={withBasePath("/assets/video/hero.mp4")} type="video/mp4" />
    </video>

  </section>
);

export default HeroSection;
