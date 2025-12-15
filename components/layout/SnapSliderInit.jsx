"use client";

import { useEffect } from "react";

const SnapSliderInit = () => {
  useEffect(() => {
    const initSnapSlider = () => {
      if (
        typeof window === "undefined" ||
        typeof window.gsap === "undefined" ||
        typeof window.ScrollTrigger === "undefined" ||
        typeof window.jQuery === "undefined"
      ) {
        setTimeout(initSnapSlider, 100);
        return;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const $ = window.jQuery;

      if (ScrollTrigger && gsap) {
        gsap.registerPlugin(ScrollTrigger);
      }

      function ShowcaseSnapSlider() {
        if ($(".tp-snap-slider-holder").length > 0) {
          const snapSliderHolder = document.querySelector(".tp-snap-slider-holder");
          if (!snapSliderHolder) return;

          const snapSlides = gsap.utils.toArray(".tp-snap-slide");
          const snapSlidesImgMask = gsap.utils.toArray(".tp-snap-slide .img-mask");
          const snapCaptionWrapper = document.querySelector(".tp-snap-slider-captions");
          const snapCaptions = gsap.utils.toArray(".tp-snap-slide-caption");
          const snapThumbsWrapper = document.querySelector(".tp-snap-slider-thumbs");
          const snapThumbs = gsap.utils.toArray(".thumb-slide");
          const snapSliderImagesWrapper = document.querySelector(".tp-snap-slider-images-wrapper");

          if (!snapSlides || snapSlides.length === 0) return;

          if (snapSliderImagesWrapper && snapSlides.length > 0) {
            ScrollTrigger.create({
              trigger: snapSliderHolder,
              start: "top top",
              end: () => "+=" + window.innerHeight * snapSlides.length,
              pin: snapSliderImagesWrapper,
              pinSpacing: true,
              scrub: true,
              snap: {
                snapTo: 1 / snapSlides.length,
                duration: { min: 0.2, max: 0.6 },
                delay: 0.1,
                ease: "power1.inOut",
              },
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });

            gsap.to(snapSliderImagesWrapper, {
              y: () => -(snapSlides.length - 1) * window.innerHeight,
              ease: "none",
              scrollTrigger: {
                trigger: snapSliderHolder,
                start: "top top",
                end: () => "+=" + window.innerHeight * snapSlides.length,
                scrub: true,
                snap: {
                  snapTo: 1 / snapSlides.length,
                  duration: { min: 0.2, max: 0.6 },
                  delay: 0.1,
                  ease: "power1.inOut",
                },
                invalidateOnRefresh: true,
              },
            });
          }

          if (snapSlidesImgMask && snapSlidesImgMask.length > 0) {
            snapSlides.forEach((slide, index) => {
              const slideMask = slide.querySelector(".img-mask");
              if (!slideMask) return;

              gsap.fromTo(
                slideMask,
                { opacity: 0.3 },
                {
                  opacity: 1,
                  ease: "sine.out",
                  scrollTrigger: {
                    trigger: slide,
                    start: "top bottom",
                    end: "top center",
                    scrub: true,
                  },
                }
              );

              if (index < snapSlides.length - 1) {
                gsap.fromTo(
                  slideMask,
                  { opacity: 1 },
                  {
                    opacity: 0.3,
                    ease: "sine.out",
                    scrollTrigger: {
                      trigger: slide,
                      start: "bottom center",
                      end: "bottom top",
                      scrub: true,
                    },
                  }
                );
              }
            });
          }

          if (snapThumbsWrapper) {
            ScrollTrigger.create({
              trigger: snapSlides,
              start: "top top",
              end: () => "+=" + window.innerHeight * (snapSlides.length - 1),
              pin: snapThumbsWrapper,
              scrub: true,
            });
          }

          if (snapThumbs && snapThumbs.length > 0) {
            gsap.fromTo(
              snapThumbs,
              { y: 0 },
              {
                y: -snapThumbs[0].offsetHeight * (snapThumbs.length - 1),
                scrollTrigger: {
                  trigger: snapSliderHolder,
                  scrub: true,
                  start: "top top",
                  end: "+=" + window.innerHeight * (snapSlides.length - 1),
                },
                ease: "none",
              }
            );
          }

          if (snapCaptionWrapper) {
            ScrollTrigger.create({
              trigger: snapCaptionWrapper,
              start: "top top",
              end: () => "+=" + window.innerHeight * (snapSlides.length - 1),
              pin: true,
              scrub: true,
            });
          }

          if (snapCaptions && snapCaptions.length > 0) {
            gsap.fromTo(
              snapCaptions,
              { y: 0 },
              {
                y: -snapCaptions[0].offsetHeight * (snapCaptions.length - 1),
                scrollTrigger: {
                  trigger: snapSliderHolder,
                  scrub: true,
                  start: "top top",
                  end: "+=" + window.innerHeight * (snapSlides.length - 1),
                },
                ease: "none",
              }
            );
          }

          snapSlides.forEach((slide, i) => {
            const imageWrappers = slide.querySelectorAll(".img-mask");
            const isLastSlide = i === snapSlides.length - 1;
            const isFirstSlide = i === 0;

            if (imageWrappers.length > 0) {
              gsap.fromTo(
                imageWrappers,
                { y: isFirstSlide ? 0 : -window.innerHeight },
                {
                  y: isLastSlide ? 0 : window.innerHeight,
                  scrollTrigger: {
                    trigger: slide,
                    scrub: true,
                    start: isFirstSlide ? "top top" : "top bottom",
                    end: isLastSlide ? "top top" : undefined,
                  },
                  ease: "none",
                }
              );
            }
          });
        }
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", ShowcaseSnapSlider);
      } else {
        ShowcaseSnapSlider();
      }

      setTimeout(() => {
        ShowcaseSnapSlider();
        if (ScrollTrigger) {
          ScrollTrigger.refresh();
        }
      }, 500);
    };

    initSnapSlider();
  }, []);

  return null;
};

export default SnapSliderInit;
