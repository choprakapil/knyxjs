"use client";

import { useEffect } from "react";

const LoaderInit = () => {
  useEffect(() => {
    const initLoader = () => {
      if (
        typeof window === "undefined" ||
        typeof window.jQuery === "undefined" ||
        typeof window.gsap === "undefined"
      ) {
        setTimeout(initLoader, 100);
        return;
      }

      const $ = window.jQuery;
      const gsap = window.gsap;

      const handleDOMContentLoaded = () => {
        const svg = document.getElementById("svg");
        if (!svg) {
          setTimeout(handleDOMContentLoaded, 100);
          return;
        }

        const tls = gsap.timeline();
        const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
        const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

        if (document.querySelector(".loader-wrap-heading")) {
          tls.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
            delay: 0.5,
            y: -100,
            opacity: 0,
          });
        }

        tls
          .to(svg, {
            duration: 0.5,
            attr: { d: curve },
            ease: "power2.in",
          })
          .to(svg, {
            duration: 0.5,
            attr: { d: flat },
            ease: "power2.out",
          });

        if (document.querySelector(".loader-wrap")) {
          tls.to(".loader-wrap", { y: -1500 }).to(".loader-wrap", { zIndex: -1, display: "none" });
        }

        const preHeader = document.querySelector(".pre-header");
        if (preHeader) {
          tls.from(preHeader, { y: 200 }, "-=1.5");

          const preHeaderCont = preHeader.querySelector(".containers");
          if (preHeaderCont) {
            tls.from(
              preHeaderCont,
              {
                y: 40,
                opacity: 0,
                delay: 0.1,
              },
              "-=1.5"
            );
          }
        }
      };

      const handleWindowLoad = () => {
        const body = $("body");
        if (body.length) {
          body.addClass("loaded");
          setTimeout(function () {
            body.removeClass("loaded");
          }, 1500);
        }
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
      } else {
        setTimeout(handleDOMContentLoaded, 100);
      }

      if (document.readyState === "complete") {
        handleWindowLoad();
      } else {
        window.addEventListener("load", handleWindowLoad);
      }
    };

    initLoader();
  }, []);

  return null;
};

export default LoaderInit;
