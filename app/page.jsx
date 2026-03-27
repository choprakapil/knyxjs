"use client";
import { useEffect, useState } from "react";
import BackToTop from "@/components/layout/BackToTop";
import ClientRuntime from "@/components/layout/ClientRuntime";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LegacyScripts from "@/components/layout/LegacyScripts";
import Loader from "@/components/layout/Loader";
import LoaderInit from "@/components/layout/LoaderInit";
import Offcanvas from "@/components/layout/Offcanvas";
import SnapSliderInit from "@/components/layout/SnapSliderInit";
import AboutSection from "@/components/sections/BrandStorySection";
import HeroSection from "@/components/sections/HeroSection";

export default function HomePage() {
  const [hideLoader, setHideLoader] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      document.body.classList.add("loaded");
      setTimeout(() => {
        setHideLoader(true);
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      <div className="tp-hero-ai-body-overlay"></div>
      <Loader hidden={hideLoader} />
      <BackToTop />
      <Offcanvas />
      <Header />
      {/* Legacy Runtime Disabled for Refactor */}
      {/* <ClientRuntime /> */}
      {/* Legacy Init Disabled for Refactor */}
      {/* <LoaderInit /> */}
      {/* <SnapSliderInit /> */}
      <main>
        <HeroSection startPlay={hideLoader} />
        <AboutSection />
      </main>
      <Footer />
      {/* <LegacyScripts /> */}
    </>
  );
}
