"use client";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import Loader from "@/components/layout/Loader";
import LoaderInit from "@/components/layout/LoaderInit";
import MagicCursor from "@/components/layout/MagicCursor";
import Offcanvas from "@/components/layout/Offcanvas";
import SnapSliderInit from "@/components/layout/SnapSliderInit";
import AboutSection from "@/components/sections/AboutSection";
import BannerSection from "@/components/sections/BannerSection";
import BlogSection from "@/components/sections/BlogSection";
import CtaSection from "@/components/sections/CtaSection";
import FaqSection from "@/components/sections/FaqSection";
import HeroSection from "@/components/sections/HeroSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import PricingSection from "@/components/sections/PricingSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import TextSliderSection from "@/components/sections/TextSliderSection";
import StickyProductsSection from "@/components/sections/StickyProductsSection";

export default function HomePage() {
  return (
    <>
      <div className="tp-hero-ai-body-overlay"></div>
      <Loader />
      <MagicCursor />
      <BackToTop />
      <Offcanvas />
      <Header />
      <ClientRuntime />
      <LoaderInit />
      <SnapSliderInit />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <HeroSection />
            <AboutSection />
            <BannerSection />
            <ServicesSection />
            <StickyProductsSection />
            <TextSliderSection />
            {/* <PortfolioSection /> */}
            {/* <PricingSection /> */}
            <TestimonialSection />
            <FaqSection />
            <CtaSection />
            <BlogSection />
          </main>
          <Footer />
        </div>
      </div>
      <LegacyScripts />
    </>
  );
}
