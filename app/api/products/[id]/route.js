export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name, slug: userSlug, description, image, specs, categoryId } = await req.json();

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

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

    // Check if slug is used by another product
    const existing = await prisma.product.findFirst({
      where: {
        slug: normalizedSlug,
        NOT: { id: parsedId }
      }
    });

    if (existing) {
      return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id: parsedId },
      data: {
        name,
        slug: normalizedSlug,
        description,
        image,
        specs: specs || null,
        categoryId: Number(categoryId),
      },
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error("Update product Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete product" }, { status: 500 });
  }
}
