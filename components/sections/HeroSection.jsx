"use client";
import { withBasePath } from "@/lib/asset";

const HeroSection = () => (
  <section className="hero-section" style={{ height: "90vh" }} data-background="/assets/img/hero/ai/bg-black.jpg">

    <video autoPlay loop muted playsInline className="bg_video"><source src={withBasePath("/assets/video/hero.mp4")} type="video/mp4" /></video>

  </section >
);

export default HeroSection;
