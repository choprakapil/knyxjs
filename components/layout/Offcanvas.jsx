"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";
import { MENU_ITEMS } from "./Header";
import { useSiteSettings } from "@/components/providers/SiteSettingsProvider";
import { usePathname, useRouter } from "next/navigation";

const MobileMenu = ({ onClose }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const toggleDropdown = (label) => {
    setOpenDropdown(prev => prev === label ? null : label);
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith("/#")) {
        e.preventDefault();
        const targetId = href.replace("/#", "");
        onClose && onClose();
        
        if (pathname === "/") {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            window.location.href = href;
        }
    } else {
        onClose && onClose();
    }
  };

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {MENU_ITEMS.map((item, index) => (
        <li key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '15px 0' }}>
          {item.dropdown ? (
            <>
              <button
                onClick={() => toggleDropdown(item.label)}
                aria-expanded={openDropdown === item.label}
                aria-controls={`dropdown-${index}`}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 0,
                  fontSize: '20px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {item.label}
                <span style={{ 
                  transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0deg)', 
                  transition: 'transform 0.3s ease' 
                }}>
                  ▼
                </span>
              </button>
              <ul
                id={`dropdown-${index}`}
                style={{
                  display: openDropdown === item.label ? 'block' : 'none',
                  paddingLeft: '20px',
                  marginTop: '15px',
                  listStyle: 'none'
                }}
              >
                {item.dropdown.map((sub, i) => (
                  <li key={i} style={{ marginBottom: '10px' }}>
                    <a href={withBasePath(sub.href)} style={{ color: '#bbb', fontSize: '16px' }}>
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <a 
                href={withBasePath(item.href)} 
                onClick={(e) => handleNavClick(e, item.href)}
                style={{ display: 'block', padding: '0', fontSize: '20px', fontWeight: 600, color: '#ffffff' }}
            >
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

const Offcanvas = ({ open, onClose }) => {
  const { site: siteData } = useSiteSettings();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="tp-offcanvas-area">
        <div className={`tp-offcanvas offcanvas-black-bg ${open ? "opened" : ""}`} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between mb-40">
            <div className="tp-offcanvas-logo" style={{ maxWidth: '120px' }}>
              <a href={withBasePath("/")} onClick={(e) => { e.preventDefault(); window.location.href = withBasePath("/"); }}>
                <img 
                  src={withBasePath(siteData.logo.light)} 
                  alt={siteData.logo.alt} 
                  style={{ width: '100%', height: 'auto' }} 
                />
              </a>
            </div>
            <div className="tp-offcanvas-close-btn">
              <button className="close-btn" onClick={onClose} aria-label="Close menu">
                <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.19141 9.80762L27.5762 28.1924" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.19141 28.1924L27.5762 9.80761" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="tp-offcanvas-menu mb-40">
            <nav><MobileMenu onClose={onClose} /></nav>
          </div>

          <div className="tp-offcanvas-social" style={{ marginTop: 'auto' }}>
            <h3 className="tp-offcanvas-title sm">Stalk Us</h3>
            <div className="tp-footer-wd-social tp-footer-ai-social d-flex justify-content-lg-start mb-40">
              {siteData.socials.map((social, index) => (
                <div key={social.network} className="tp_fade_anim" data-delay={`.${index * 2 + 3}`} data-fade-from="top" data-ease="bounce">
                  <a href={withBasePath(social.url)} target="_blank" rel="noopener noreferrer">
                    <i className={`fa-brands fab fa-${social.network}`}></i>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      <div className={`body-overlay ${open ? "apply" : ""}`} onClick={onClose}></div>
    </>
  );
};

export default Offcanvas;
