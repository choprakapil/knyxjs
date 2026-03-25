"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";
import Offcanvas from "./Offcanvas";
import { siteData } from "@/lib/data/site";

export const MENU_ITEMS = siteData.menus.main;


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = React.useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

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
          padding: '10px 5%',
          background: 'rgba(5, 5, 5, 0.4)', 
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left Search */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="header-search-wrap" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                color: '#fff',
                opacity: 0.8,
                transition: 'opacity 0.3s ease'
              }}
              aria-label="Toggle search"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <input 
              ref={searchInputRef}
              type="text" 
              placeholder={siteData.ui.searchPlaceholder} 
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '30px',
                padding: isSearchOpen ? '10px 16px 10px 42px' : '0',
                color: '#fff',
                fontSize: '14px',
                width: isSearchOpen ? '200px' : '0',
                opacity: isSearchOpen ? 1 : 0,
                visibility: isSearchOpen ? 'visible' : 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none',
                position: 'absolute',
                left: '0'
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(e.target.value.trim())}`;
                }
                if (e.key === 'Escape') {
                  setIsSearchOpen(false);
                }
              }}
              onBlur={() => {
                if (!searchInputRef.current?.value) {
                    setIsSearchOpen(false);
                }
              }}
            />
          </div>
        </div>

        {/* Center Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <a href={withBasePath("/")} style={{ display: 'block', cursor: 'pointer' }}>
            <img 
              style={{ height: '68px', width: 'auto', display: 'block', objectFit: 'contain' }} 
              src={withBasePath(siteData.logo.light)} 
              alt={siteData.logo.alt} 
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
