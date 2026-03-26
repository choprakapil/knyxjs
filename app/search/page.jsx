"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Offcanvas from "@/components/layout/Offcanvas";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div style={{ backgroundColor: "#030303", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, paddingTop: "200px", paddingBottom: "100px" }}>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="tp-ff-jakarta fw-600 fs-48 tp-text-common-white mb-20">
                Search Results
              </h1>
              {query ? (
                <p className="tp-ff-dm fs-20 tp-text-grey-2">
                  Showing results for <strong style={{ color: "#1B3B8A" }}>"{query}"</strong>
                </p>
              ) : (
                <p className="tp-ff-dm fs-20 tp-text-grey-2">
                  Please enter a valid search term in the header.
                </p>
              )}
              
              <div style={{ 
                marginTop: "60px", 
                padding: "60px 20px", 
                background: "rgba(255,255,255,0.02)", 
                borderRadius: "15px", 
                border: "1px dashed rgba(255,255,255,0.1)",
                maxWidth: "600px",
                margin: "60px auto 0"
              }}>
                  <p className="tp-ff-dm fs-18 tp-text-grey-2 mb-0">
                    <i className="fa-solid fa-magnifying-glass mb-15" style={{ fontSize: "30px", color: "rgba(255,255,255,0.2)", display: "block" }}></i>
                    Search backend integration coming soon.
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SearchPage() {
  return (
    <>
      <Offcanvas />
      <Header />
      <Suspense fallback={<div style={{height: "100vh", background: "#030303"}}></div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  );
}
