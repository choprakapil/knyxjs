"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie.includes("token=");

    if (!hasToken) {
      router.replace("/admin/login");
    }
  }, []);

  return children;
}
