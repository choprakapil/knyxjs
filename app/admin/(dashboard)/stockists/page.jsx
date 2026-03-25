"use client";
import React from "react";
import { withBasePath } from "@/lib/asset";

export default function StockistsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", animation: "fadeSlideIn 0.3s ease both" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", margin: 0 }}>Stockists</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "4px" }}>Manage locations and distributors.</p>
        </div>
        <button style={{ padding: "12px 20px", background: "linear-gradient(135deg, #c8ff00 0%, #a2cc00 100%)", border: "none", borderRadius: "12px", color: "#000000", fontWeight: 700, fontSize: "14px", cursor: "pointer" }}>
          Add Stockist
        </button>
      </div>

      <div style={{ background: "rgba(255, 255, 255, 0.01)", border: "1px solid rgba(255, 255, 255, 0.03)", borderRadius: "16px", padding: "40px", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
         🚧 Node template configured. Stockist locations management screen loading.
      </div>
      <style jsx>{` @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } } `}</style>
    </div>
  );
}
