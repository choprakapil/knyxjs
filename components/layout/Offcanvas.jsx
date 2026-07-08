"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";
import { MENU_ITEMS } from "./Header";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { usePathname } from "next/navigation";

/* ═══════════════════════════════════════════════════════
   OBO-style Products Body-Map Panel
   ─ Left:  product links with arrow lines → white by default
   ─ Right: athlete image (menu.jpeg)
   ─ Hover: link text + line + dot all turn brand-blue #3257ff

   itemPositions: vertical % from top of image where each
   category's dot should land (i.e. that body part on the image).
   menu.jpeg shows a cricket batsman — helmet is at ~12% from top.
═══════════════════════════════════════════════════════ */

const ITEM_POSITIONS = [11]; // one entry per product category (% from top) — 11% aligns with helmet on menu.PNG
const BRAND = "#3257ff";
const BRAND_GLOW = "rgba(50,87,255,0.75)";

const ProductsBodyMapPanel = ({ items, onClose }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        margin: "14px 0 4px",
        minHeight: "220px",
        // NO border, NO box — open design
      }}
    >
      {/* ── LEFT: product links on dark offcanvas bg ── */}
      <div
        style={{
          flex: "0 0 44%",
          position: "relative",
          // no background — inherits the offcanvas dark naturally
          paddingTop: "4px",
        }}
      >
        {items.map((item, i) => {
          const isHov = hovered === i;
          const topPct = ITEM_POSITIONS[i] ?? 10 + i * 18;

          return (
            <a
              key={i}
              href={withBasePath(item.href)}
              onClick={() => onClose && onClose()}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: "absolute",
                top: `${topPct}%`,
                left: 0,
                right: 0,
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                padding: "5px 0 5px 4px",
                gap: 0,
                cursor: "pointer",
              }}
            >
              {/* Label */}
              <span
                style={{
                  color: isHov ? BRAND : "#ffffff",
                  fontSize: "13px",
                  fontWeight: 800,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  transition: "color 0.22s ease",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                {item.label}
              </span>

              {/* Arrow line */}
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  margin: "0 6px 0 10px",
                  background: isHov
                    ? `linear-gradient(90deg,${BRAND},#7a9bff)`
                    : "rgba(255,255,255,0.2)",
                  boxShadow: isHov ? `0 0 7px ${BRAND_GLOW}` : "none",
                  transition: "background 0.22s ease, box-shadow 0.22s ease",
                  borderRadius: "1px",
                }}
              />

              {/* Dot */}
              <div
                style={{
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  flexShrink: 0,
                  marginRight: "-5px",
                  zIndex: 3,
                  background: isHov ? BRAND : "rgba(255,255,255,0.35)",
                  boxShadow: isHov ? `0 0 14px 4px ${BRAND_GLOW}` : "none",
                  transform: isHov ? "scale(1.5)" : "scale(1)",
                  transition: "all 0.22s ease",
                }}
              />
            </a>
          );
        })}
      </div>

      {/* ── RIGHT: white image area — no box, just the image ── */}
      <div
        style={{
          flex: 1,
          position: "relative",
          background: "#ffffff",       // white bg matches menu.PNG
          borderRadius: "10px",        // soft rounded corners on image side only
          overflow: "hidden",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        {/* Left-edge gradient: dark offcanvas → white image (seamless blend) */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, bottom: 0,
            width: "32px",
            background: "linear-gradient(90deg, rgba(3,3,12,0.7) 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <img
          src={withBasePath("/assets/img/menu.PNG")}
          alt="KNYX Cricket Player"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "top center",
            display: "block",
            transition: "transform 0.4s ease, filter 0.35s ease",
            transform: hovered !== null ? "scale(1.03)" : "scale(1)",
            filter:
              hovered !== null
                ? "drop-shadow(0 4px 24px rgba(50,87,255,0.3))"
                : "none",
          }}
        />
      </div>

      <style>{`
        @media (hover: none) {
          .knyx-bodymap-link:active span { color: ${BRAND} !important; }
        }
      `}</style>
    </div>
  );
};


/* ═══════════════════════════════════════════════════════
   Mobile Navigation Menu
═══════════════════════════════════════════════════════ */
const MobileMenu = ({ onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();

  const toggleDropdown = (label) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      onClose && onClose();
      if (pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    } else {
      onClose && onClose();
    }
  };

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {MENU_ITEMS.map((item, index) => (
        <li
          key={index}
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            padding: "15px 0",
          }}
        >
          {item.dropdown ? (
            <>
              {/* ── Dropdown toggle button ── */}
              <button
                onClick={() => toggleDropdown(item.label)}
                aria-expanded={openDropdown === item.label}
                aria-controls={`dropdown-${index}`}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 0,
                  fontSize: "20px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {item.label}
                <span
                  style={{
                    transform:
                      openDropdown === item.label
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    fontSize: "14px",
                    opacity: 0.6,
                  }}
                >
                  ▼
                </span>
              </button>

              {/* ── Dropdown content ── */}
              <div
                id={`dropdown-${index}`}
                style={{
                  maxHeight: openDropdown === item.label ? "520px" : "0",
                  overflow: "hidden",
                  transition:
                    "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* OBO-style body-map panel — only for Products */}
                {item.label === "Products" && item.dropdown.length > 0 && (
                  <ProductsBodyMapPanel
                    items={item.dropdown}
                    onClose={onClose}
                  />
                )}

                {/* Plain link list below the panel */}
                <ul
                  style={{
                    paddingLeft: "4px",
                    marginTop: "6px",
                    listStyle: "none",
                  }}
                >
                  {item.dropdown.map((sub, i) => (
                    <li key={i} style={{ marginBottom: "8px" }}>
                      <a
                        href={withBasePath(sub.href)}
                        onClick={() => onClose && onClose()}
                        style={{
                          color: "#aaa",
                          fontSize: "15px",
                          textDecoration: "none",
                          display: "block",
                          padding: "3px 0",
                          transition: "color 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#fff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#aaa")
                        }
                      >
                        {sub.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <a
              href={withBasePath(item.href)}
              onClick={(e) => handleNavClick(e, item.href)}
              style={{
                display: "block",
                padding: "0",
                fontSize: "20px",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

/* ═══════════════════════════════════════════════════════
   Offcanvas Shell
═══════════════════════════════════════════════════════ */
const Offcanvas = ({ open, onClose }) => {
  const { site: siteData } = useSiteSettings();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="tp-offcanvas-area">
        <div
          className={`tp-offcanvas offcanvas-black-bg ${open ? "opened" : ""}`}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between mb-40">
            <div className="tp-offcanvas-logo" style={{ maxWidth: "120px" }}>
              <a
                href={withBasePath("/")}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = withBasePath("/");
                }}
              >
                <img
                  src={withBasePath(siteData.logo.light)}
                  alt={siteData.logo.alt}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </div>
            <div className="tp-offcanvas-close-btn">
              <button
                className="close-btn"
                onClick={onClose}
                aria-label="Close menu"
              >
                <svg
                  width="37"
                  height="38"
                  viewBox="0 0 37 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.19141 9.80762L27.5762 28.1924"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.19141 28.1924L27.5762 9.80761"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="tp-offcanvas-menu mb-40">
            <nav>
              <MobileMenu onClose={onClose} />
            </nav>
          </div>

          <div className="tp-offcanvas-social" style={{ marginTop: "auto" }}>
            <h3 className="tp-offcanvas-title sm">Stalk Us</h3>
            <div className="tp-footer-wd-social tp-footer-ai-social d-flex justify-content-lg-start mb-40">
              {siteData.socials.map((social, index) => (
                <div
                  key={social.network}
                  className="tp_fade_anim"
                  data-delay={`.${index * 2 + 3}`}
                  data-fade-from="top"
                  data-ease="bounce"
                >
                  <a
                    href={withBasePath(social.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className={`fa-brands fab fa-${social.network}`}></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`body-overlay ${open ? "apply" : ""}`}
        onClick={onClose}
      ></div>
    </>
  );
};

export default Offcanvas;
