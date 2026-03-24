export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

const slugify = (text) => text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-');

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { name: true }
        }
      }
    });
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, slug: userSlug, description, image, specs, categoryId } = await req.json();

    const normalizedSlug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    if (!name || !normalizedSlug || !description || !categoryId) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (!image || typeof image !== "string") {
      return NextResponse.json({ success: false, error: "Invalid image" }, { status: 400 });
    }

    const existing = await prisma.product.findUnique({ where: { slug: normalizedSlug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
    }

    const categoryIdInt = parseInt(categoryId);

    const product = await prisma.product.create({
      data: {
        name,
        slug: normalizedSlug,
        description,
        image,
        specs: specs || null,
        categoryId: categoryIdInt
      }
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    console.error("Create product Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to create product" }, { status: 500 });
  }
}
