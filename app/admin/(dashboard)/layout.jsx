import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import "@/app/globals.css";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export default async function AdminLayout({ children }) {
  headers(); // forces fresh render (prevents back-cache issues)

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
