"use client";

import Script from "next/script";
import { useState } from "react";
import { withBasePath } from "@/lib/asset";

const externalScripts = [
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollSmoother.min.js",
];

const localScripts = [
  "/assets/js/vendor/jquery.js",
  "/assets/js/bootstrap-bundle.js",
  "/assets/js/plugin.js",
  "/assets/js/three.js",
  "/assets/js/hover-effect.umd.js",
  "/assets/js/split-type.js",
  "/assets/js/swiper-bundle.js",
  "/assets/js/swiper-gl.js",
  "/assets/js/effect-slicer.js",
  "/assets/js/magnific-popup.js",
  "/assets/js/nice-select.js",
  "/assets/js/purecounter.js",
  "/assets/js/isotope-pkgd.js",
  "/assets/js/imagesloaded-pkgd.js",
  "/assets/js/backtop.js",
  "/assets/js/ajax-form.js",
  "/assets/js/slider-init.js",
  "/assets/js/main.js",
  "/assets/js/tp-cursor.js",
];

const LegacyScripts = () => {
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [scrollTriggerLoaded, setScrollTriggerLoaded] = useState(false);

  return (
    <>
      <Script src={externalScripts[0]} strategy="afterInteractive" onLoad={() => setGsapLoaded(true)} />

      {gsapLoaded && (
        <Script src={externalScripts[1]} strategy="afterInteractive" onLoad={() => setScrollTriggerLoaded(true)} />
      )}

      <Script src={externalScripts[2]} strategy="afterInteractive" />
      <Script src={externalScripts[3]} strategy="afterInteractive" />

      <Script src={withBasePath(localScripts[0])} strategy="afterInteractive" />

      {localScripts.slice(1).map((src) => (
        <Script key={src} src={withBasePath(src)} strategy="afterInteractive" />
      ))}

      <Script src={withBasePath("/assets/js/distortion-img.js")} strategy="afterInteractive" type="module" />
    </>
  );
};

export default LegacyScripts;
