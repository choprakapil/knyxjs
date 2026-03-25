import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Normalize pathname to handle trailingSlash: true
  const cleanPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;

  if (cleanPath.startsWith("/admin")) {
    
    if (cleanPath === "/admin/login") {
      if (token) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// Map accurately into /admin subpaths only to reduce edge evaluation speeds
export const config = {
  matcher: ["/admin/:path*"],
};
