"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";
import Offcanvas from "./Offcanvas";

export const MENU_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Brand Story", href: "/#brand-story" },
  { label: "Technology", href: "/technology" },
  { 
    label: "Products", 
    href: "javascript:void(0)", 
    dropdown: [
      { label: "Helmet", href: "/products/helmet" },
      { label: "Groin Protection", href: "#" }
    ]
  },
  { label: "Stockists", href: "/stockists" }
];


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Consolidated style rule for hamburger lines to maintain clean code standards
  const barLineStyle = {
    display: 'block',
    width: '100%',
    height: '2.5px',
    background: '#ffffff',
    borderRadius: '4px'
  };

  return (
    <>
      {/* Offcanvas Menu Integration (Unchanged logic) */}
      <Offcanvas open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      {/* 
        Semantic Layout Layer 
        Re-introduced critical target hooks (e.g., tp-header-area) for backwards template script hooks 
        while preserving strict inline boundaries locking in the final visual layout pixel parity.
      */}
      <header 
        className="main-header tp-header-area tp-header-ai-wrap"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          padding: '28px 5%',
          background: 'rgba(5, 5, 5, 0.4)', 
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left Spacer (Ensures perfectly calculated center balance) */}
        <div style={{ flex: 1 }}></div>

        {/* Center Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <a href={withBasePath("/")} style={{ display: 'block', cursor: 'pointer' }}>
            <img 
              style={{ height: '36px', width: 'auto', display: 'block', objectFit: 'contain' }} 
              src={withBasePath('/assets/img/logo/logo-white-2.png')} 
              alt="KNYX Logo" 
            />
          </a>
        </div>

        {/* Right Action (Hamburger Menu) */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            className="tp-menu-bar"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '12px',      
              marginRight: '-12px', 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '42px',       
              width: '56px',        
            }}
          >
            {/* Using consolidated style configuration with no alteration in dimensions */}
            <span style={barLineStyle}></span>
            <span style={barLineStyle}></span>
            <span style={{ ...barLineStyle, width: '70%', alignSelf: 'flex-end' }}></span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
