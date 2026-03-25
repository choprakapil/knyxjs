import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    // 1. Fetch real counts from Database
    const [productCount, categoryCount, userCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.user.count()
    ]);

    // 2. Fetch some layout summaries (like most recent products added)
    const recentProducts = await prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { name: true, slug: true, createdAt: true }
    });

    return NextResponse.json({
      success: true,
      stats: {
        products: productCount,
        categories: categoryCount,
        admins: userCount
      },
      recentActivity: recentProducts
    });

  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch stats" }, { status: 500 });
  }
}
