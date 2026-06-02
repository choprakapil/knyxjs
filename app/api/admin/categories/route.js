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

// Middleware: Check authentication
async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return null;
  }
  return decoded;
}

// GET: Fetch all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: { select: { products: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST: Create a new category
export async function POST(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 });
    }

    const slug = slugify(name);

    // Check if slug already exists
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Category with this name already exists" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        slug
      },
      include: {
        _count: { select: { products: true } }
      }
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create category" }, { status: 500 });
  }
}

// PUT: Update a category
export async function PUT(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, name } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Category ID is required" }, { status: 400 });
    }

    if (!name || name.trim() === "") {
      return NextResponse.json({ success: false, error: "Category name is required" }, { status: 400 });
    }

    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingCategory) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    const slug = slugify(name);

    // Check if new slug conflicts
    if (slug !== existingCategory.slug) {
      const conflict = await prisma.category.findUnique({ where: { slug } });
      if (conflict) {
        return NextResponse.json({ success: false, error: "Category name already in use" }, { status: 400 });
      }
    }

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name: name.trim(),
        slug
      },
      include: {
        _count: { select: { products: true } }
      }
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update category" }, { status: 500 });
  }
}

// DELETE: Remove a category
export async function DELETE(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Category ID is required" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { _count: { select: { products: true } } }
    });

    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    // Check if category has products
    if (category._count.products > 0) {
      return NextResponse.json({ success: false, error: "Cannot delete category with existing products" }, { status: 400 });
    }

    await prisma.category.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete category" }, { status: 500 });
  }
}
