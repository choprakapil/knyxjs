"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // Re-enable document scrolling natively in case any loader or script locked it
    if (typeof document !== "undefined" && document.body) {
      document.body.style.overflow = "auto";
    }
    
    // Cleanup any lingering GSAP ScrollTriggers from previous Next.js route
    if (typeof window !== "undefined" && window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
      });
      // Small delay specifically for ScrollSmoother if it attached to body attributes
      setTimeout(() => {
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 100);
    }
    
    // Enforce native scroll top
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
