"use client";

import { useRef, useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";
import { professionalProducts } from "@/lib/data/products";
import { slugify } from "@/lib/utils";

/** Pick the first 4 professional products for the homepage showcase. */
const products = professionalProducts.slice(0, 4).map((p, i) => ({
    id: String(i + 1).padStart(3, "0"),
    title: p.name,
    category: p.category,
    image: `/assets/img/products/${p.image}`,
    description: p.description,
    link: `/products/${p.categorySlug || 'helmet'}/${p.slug || slugify(p.name)}`,
}));

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
                <span style={{ color: "var(--tp-theme-primary)", fontWeight: 600, fontSize: "14px", textTransform: "uppercase", letterSpacing: "2px" }}>{item.category}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a
                  href={item.link}
                  className="tp-btn-ai tp-btn-switch-2-animation p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-14 fw-700 tp-ff-dm"
                  style={{ marginTop: "20px" }}
                >
                  <span className="d-flex align-items-center justify-content-center">
                    <span className="btn-text">View Details</span>
                    <span className="btn-icon">
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="btn-icon">
                      <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6.00071C16.4166 4.67142 11.9705 2.40252 9.21414 0L11.1357 5.31243H0.688756C0.552576 5.31246 0.419232 5.35209 0.305998 5.42773C0.192725 5.50341 0.104852 5.61172 0.0527125 5.73756C0.00064999 5.86334 -0.0134432 6.0016 0.0130924 6.13511C0.0396547 6.26871 0.105682 6.39175 0.201995 6.48809C0.330914 6.61703 0.505697 6.68939 0.688048 6.6897H11.135L9.21414 12C11.9701 9.59697 16.4165 7.32913 20 6.00071Z" fill="currentColor" />
                      </svg>
                    </span>
                  </span>
                </a>
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