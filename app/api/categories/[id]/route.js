export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const { name, slug: userSlug } = await req.json();

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const normalizedSlug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    if (!name || !normalizedSlug) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    // Check if slug is used by another category
    const existing = await prisma.category.findUnique({ where: { slug: normalizedSlug } });
    if (existing && existing.id !== parsedId) {
      return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
    }

    const category = await prisma.category.update({
      where: { id: parsedId },
      data: { name, slug: normalizedSlug },
    });

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    const parsedId = Number(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const count = await prisma.product.count({
      where: { categoryId: parsedId }
    });

    if (count > 0) {
      return NextResponse.json({ success: false, error: "Cannot delete category with existing products" }, { status: 400 });
    }

    await prisma.category.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete category" }, { status: 500 });
  }
}
