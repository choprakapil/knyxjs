"use client";
import React, { useState, useEffect } from "react";
import { withBasePath } from "@/lib/asset";
import Offcanvas from "./Offcanvas";

const DesktopMenu = () => (
  <ul>
    <li><a href={withBasePath("/")}>Home</a></li>
    <li><a href={withBasePath("/#brand-story")}>Brand Story</a></li>

    <li><a href={withBasePath("/technology")}>Technology</a></li>

    <li className="has-dropdown p-inherit">
      <a href="javascript:void(0)" style={{ cursor: "default" }}>
        Products
        <span>
          <svg width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.7 4.93333L0.2 1.6C-0.294427 0.940764 0.175955 0 1 0H6C6.82405 0 7.29443 0.940764 6.8 1.6L4.3 4.93333C3.9 5.46667 3.1 5.46667 2.7 4.93333Z" fill="currentColor" />
          </svg>
        </span>
      </a>
      <ul className="tp-submenu submenu">
        <li>
          <a href={withBasePath("/products/helmet")}>Helmet</a>
        </li>
        <li>
          <a href="#">Groin Protection</a>
        </li>
      </ul>
    </li>

    <li><a href={withBasePath("/stockists")}>Stockists</a></li>
  </ul>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Offcanvas open={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <header className="main-header">
        <div id="header-sticky" className={`tp-header-area pre-_header sticky-black-bg tp-header-ai-wrap ${isSticky ? "header-sticky" : ""}`}>
          <div className="container-fluid container-1824">
            <div className="tp-header-ai-bg">
              <div className="row align-items-center">
                <div className="col-xxl-3 col-xl-2 col-lg-4 col-md-4 col-sm-4 col-6">
                  <div className="tp-header-logo">
                    <a href={withBasePath("/")}>
                      <img width="150" src={withBasePath('/assets/img/logo/logo-white-2.png')} alt="logo" />
                    </a>
                  </div>
                </div>
                <div className="col-xxl-6 col-xl-7 d-none d-xl-block">
                  <div className="tp-main-menu tp-main-menu-ai tp-header-dropdown dropdown-black-bg d-flex justify-content-center">
                    <nav className="tp-mobile-menu-active">
                        <DesktopMenu />
                    </nav>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-3 col-lg-8 col-md-8 col-sm-8 col-6">
                  <div className="tp-header-right d-flex align-items-center justify-content-end">
                    <div className="tp-header-btn d-none d-sm-inline-block">
                      <a
                        href={withBasePath("/")}
                        className="tp-btn-ai p-relative hover-text-white d-inline-block text-uppercase tp-text-common-white lh-1 fs-16 fw-700 tp-ff-dm"
                      >
                        Contact Us
                      </a>
                    </div>
                    <button
                      className="tp-menu-bar tp-header-sidebar-btn tp-header-2-menu-btn tp-header-ai-menu-btn ml-20"
                      onClick={() => setIsMenuOpen(true)}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
