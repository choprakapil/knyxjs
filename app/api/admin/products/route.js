import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

const slugify = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// 1. GET: Fetch list of products with categories
export async function GET(req) {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
    const categories = await prisma.category.findMany();

    return NextResponse.json({ success: true, products, categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

// 2. POST: Create a new product
export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name, categoryId, description, image, specs } = await req.json();

    if (!name || !categoryId) {
      return NextResponse.json({ success: false, error: "Name and Category are required" }, { status: 400 });
    }

    const slug = slugify(name);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || "",
        image: image || null,
        specs: specs || null,
        categoryId: parseInt(categoryId)
      }
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create product" }, { status: 500 });
  }
}
