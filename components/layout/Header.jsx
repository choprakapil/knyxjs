"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";
import Offcanvas from "./Offcanvas";
import { siteData } from "@/lib/data/site";

export const MENU_ITEMS = siteData.menus.main;


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
        {/* Left Search */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <div className="header-search-wrap" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{ color: '#fff', position: 'absolute', left: '16px', pointerEvents: 'none', opacity: 0.6 }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              placeholder={siteData.ui.searchPlaceholder} 
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '30px',
                padding: '10px 16px 10px 42px',
                color: '#fff',
                fontSize: '14px',
                width: '180px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                outline: 'none'
              }}
              onFocus={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                e.target.style.borderColor = 'rgba(200, 255, 0, 0.4)';
                e.target.style.width = '240px';
                e.target.style.boxShadow = '0 0 15px rgba(200, 255, 0, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.target.style.width = '180px';
                e.target.style.boxShadow = 'none';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(e.target.value.trim())}`;
                }
              }}
            />
          </div>
        </div>

        {/* Center Logo */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <a href={withBasePath("/")} style={{ display: 'block', cursor: 'pointer' }}>
            <img 
              style={{ height: '36px', width: 'auto', display: 'block', objectFit: 'contain' }} 
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
