"use client";

import { useRef, useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";

const products = [
  { id: "001", title: "Insight Engine", image: "/assets/img/service/ai/thumb.jpg" },
  { id: "002", title: "Vision Suite", image: "/assets/img/service/ai/thumb-2.jpg" },
  { id: "003", title: "Automation Cloud", image: "/assets/img/service/ai/thumb-3.jpg" },
  { id: "004", title: "Data Hub", image: "/assets/img/service/ai/thumb-4.jpg" },
];

export default function StickyProductsSection() {
  const sectionRef = useRef(null);
  const slidesRef = useRef([]);
  const [active, setActive] = useState(0);

  // IntersectionObserver to track active slide
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.index);
            setActive(idx);
          }
        });
      },
      { threshold: 0.6 }
    );

    slidesRef.current.forEach((el) => el && io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="tp-snap-wrapper">
      <div className="tp-snap-container">
        {products.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => (slidesRef.current[idx] = el)}
            data-index={idx}
            className={`tp-snap-slide ${active === idx ? "is-active" : ""}`}
          >
            <div className="tp-snap-content">
              <div className="tp-snap-text">
                <span>{item.id}</span>
                <h2>{item.title}</h2>
                <p>High-performance module engineered for scale & outcomes.</p>
              </div>
              <div className="tp-snap-media">
                <img src={withBasePath(item.image)} alt={item.title} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}