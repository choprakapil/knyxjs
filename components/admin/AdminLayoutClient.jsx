"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayoutClient({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      <div style={{ width: "260px", minWidth: "260px", maxWidth: "260px", flexShrink: 0, background: "#0f172a" }}>
        <AdminSidebar />
      </div>

      <div style={{ flex: 1, background: "#f8fafc", padding: "30px", overflowY: "auto" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {children}
        </div>
      </div>

    </div>
  );
}
