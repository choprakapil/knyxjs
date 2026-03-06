"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = () => {
  const loaderRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    const wavePath = "M0,500S175,400,500,400s500,100,500,100V0H0Z";
    const flatPath = "M0,0S175,0,500,0s500,0,500,0V0H0Z";

    tl.to(textRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.6
    })
      .to(svgRef.current, {
        attr: { d: wavePath },
        duration: 0.6,
        ease: "power2.inOut"
      })
      .to(svgRef.current, {
        attr: { d: flatPath },
        duration: 0.5,
        ease: "power2.out"
      })
      .to(loaderRef.current, {
        y: "-100%",
        duration: 0.7,
        ease: "power3.inOut"
      })
      .set(loaderRef.current, {
        display: "none",
        pointerEvents: "none",
        visibility: "hidden"
      })
      .add(() => {
        document.body.style.overflow = "auto";
      });

  }, []);

  return (
    <div ref={loaderRef} className="loader-wrap">
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path ref={svgRef} id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
      </svg>
      <div ref={textRef} className="loader-wrap-heading">
        <div className="load-text">
          <span>K</span>
          <span>N</span>
          <span>Y</span>
          <span>X</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
