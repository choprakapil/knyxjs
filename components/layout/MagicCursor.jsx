"use client";

import { useEffect, useRef } from "react";

const MagicCursor = () => {
  const ballRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (ballRef.current) {
        ballRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div id="magic-cursor" className="cursor-white-bg">
      <div ref={ballRef} id="ball"></div>
    </div>
  );
};

export default MagicCursor;
