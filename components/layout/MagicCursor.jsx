"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const MagicCursor = () => {
  const ballRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ballRef.current) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ratio = 0.15; // Smooth delay ratio
    let active = false;

    const ball = ballRef.current;

    const ballWidth = 14;
    const ballHeight = 14;
    const ballBorderWidth = 1;

    gsap.set(ball, {
      xPercent: -50,
      yPercent: -50,
      width: ballWidth,
      height: ballHeight,
      borderWidth: ballBorderWidth,
      opacity: 1,
      backgroundColor: "#000",
      zIndex: 9999,
      borderRadius: "50%",
      position: "fixed",
    });

    let visible = false;

    const mouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible && cursorRef.current) {
        visible = true;
        gsap.to(cursorRef.current, { duration: 0.3, autoAlpha: 1 });
      }
    };

    window.addEventListener("mousemove", mouseMove);

    const updatePosition = () => {
      if (!active) {
        pos.x += (mouse.x - pos.x) * ratio;
        pos.y += (mouse.y - pos.y) * ratio;
        gsap.set(ball, { x: pos.x, y: pos.y });
      }
    };

    gsap.ticker.add(updatePosition);

    const onMouseEnter = () => {
      gsap.to(ball, { duration: 0.3, scale: 0, opacity: 0 });
    };

    const onMouseLeave = () => {
      gsap.to(ball, { duration: 0.3, scale: 1, opacity: 1 });
    };

    const attachHover = () => {
      document.querySelectorAll("a, button, .hover-target").forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    attachHover();

    const observer = new MutationObserver(() => attachHover());
    observer.observe(document.body, { childList: true, subtree: true });

    const handleMouseLeaveDoc = () => {
      gsap.to(cursorRef.current, { duration: 0.3, autoAlpha: 0 });
    };
    const handleMouseEnterDoc = () => {
      gsap.to(cursorRef.current, { duration: 0.3, autoAlpha: 1 });
    };

    document.addEventListener("mouseleave", handleMouseLeaveDoc);
    document.addEventListener("mouseenter", handleMouseEnterDoc);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      gsap.ticker.remove(updatePosition);
      observer.disconnect();
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
      document.removeEventListener("mouseenter", handleMouseEnterDoc);
      document.querySelectorAll("a, button, .hover-target").forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <div ref={cursorRef} id="magic-cursor" className="cursor-white-bg">
      <div ref={ballRef} id="ball"></div>
    </div>
  );
};

export default MagicCursor;
