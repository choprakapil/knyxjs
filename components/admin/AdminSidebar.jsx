"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuGroups = [
  {
    title: "Content",
    items: [
      { name: "Home", path: "/admin/home", icon: "🏠" },
      { name: "Brand Story", path: "/admin/brand-story", icon: "📖" },
      { name: "Technology", path: "/admin/technology", icon: "⚡" },
    ]
  },
  {
    title: "Products",
    items: [
      { name: "Products", path: "/admin/products", icon: "📦" },
      { name: "Categories", path: "/admin/categories", icon: "📁" },
    ]
  },
  {
    title: "Business",
    items: [
      { name: "Stockists", path: "/admin/stockists", icon: "📍" },
      { name: "Contact", path: "/admin/contact", icon: "📞" },
    ]
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout API failed", err);
    }
    window.location.replace("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <style jsx>{`
        .admin-sidebar {
          width: 260px;
          background: #0f172a;
          height: 100vh;
          position: sticky;
          top: 0;
          display: flex;
          flex-direction: column;
          padding: 24px 16px;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sidebar-logo {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 36px;
          padding-left: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 8px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nav-item:hover:not(.disabled) {
          background: #1e293b;
          color: #f8fafc;
        }

        .nav-item.active {
          background: #1e293b;
          color: #e2e8f0;
          font-weight: 600;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
        }

        .nav-item.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .sidebar-icon {
          font-size: 1.1rem;
        }

        .coming-soon {
          font-size: 0.65rem;
          background: rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 2px 6px;
          border-radius: 4px;
          margin-left: auto;
        }

        .sidebar-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 16px;
          margin-top: auto;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 8px;
          color: #94a3b8;
          background: transparent;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .logout-btn:hover {
          background: rgba(255, 0, 0, 0.05);
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: 70px;
            padding: 20px 8px;
          }
          .sidebar-logo {
            font-size: 0.9rem;
            margin-bottom: 30px;
            padding-left: 0;
            justify-content: center;
          }
          .sidebar-logo span, .nav-item span:not(.sidebar-icon), .coming-soon {
            display: none;
          }
          .nav-item {
            justify-content: center;
            padding: 12px;
          }
          .logout-btn {
            justify-content: center;
            padding: 12px;
          }
        }
      `}</style>

      <div className="sidebar-logo">
        <span>KNYX Control</span>
      </div>

      <style jsx>{`
        .sidebar-group {
          margin-bottom: 24px;
        }

        .group-title {
          font-size: 11px;
          text-transform: uppercase;
          color: #475569;
          font-weight: 600;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          padding-left: 14px;
        }
      `}</style>

      <nav className="sidebar-nav">
        {menuGroups.map((group) => (
          <div key={group.title} className="sidebar-group">
            <div className="group-title">{group.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {group.items.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  className={`nav-item ${pathname === item.path ? "active" : ""}`}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <footer className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="sidebar-icon">🚪</span>
          <span>Logout</span>
        </button>
      </footer>
    </aside>
  );
}
