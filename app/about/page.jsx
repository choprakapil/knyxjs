"use client";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import MagicCursor from "@/components/layout/MagicCursor";
import Offcanvas from "@/components/layout/Offcanvas";
import BrandStorySection from "@/components/sections/BrandStorySection";
import Breadcrumb from "@/components/common/Breadcrumb";

export default function AboutPage() {
  return (
    <>
      <div className="tp-hero-ai-body-overlay"></div>
      <MagicCursor />
      <BackToTop />
      <Offcanvas />
      <Header />
      <ClientRuntime />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Breadcrumb
              title="Brand Story"
              eyebrow="Who We Are"
              description="Our journey, our values, and our commitment to excellence."
            />
            <BrandStorySection />
          </main>
          <Footer />
        </div>
      </div>
      <LegacyScripts />
    </>
  );
}
