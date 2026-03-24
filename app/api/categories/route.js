export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, slug: userSlug } = await req.json();

    if (!name || typeof name !== "string") {
      return NextResponse.json({ success: false, error: "Invalid name" }, { status: 400 });
    }

    const normalizedSlug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    if (!normalizedSlug) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const existing = await prisma.category.findUnique({ where: { slug: normalizedSlug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Slug already exists" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: { name, slug: normalizedSlug }
    });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create category" }, { status: 500 });
  }
}
