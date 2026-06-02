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

// 1. GET: Fetch list of products with categories
export async function GET(req) {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" }
    });
    const categories = await prisma.category.findMany();

    // Parse specs JSON strings for SQLite
    const productsWithParsedSpecs = products.map(p => ({
      ...p,
      specs: p.specs ? JSON.parse(p.specs) : null
    }));

    return NextResponse.json({ success: true, products: productsWithParsedSpecs, categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

// 2. POST: Create a new product
export async function POST(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { name, categoryId, description, image, specs } = await req.json();

    if (!name || !categoryId) {
      return NextResponse.json({ success: false, error: "Name and Category are required" }, { status: 400 });
    }

    const slug = slugify(name);
    
    // Check if slug already exists
    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json({ success: false, error: "Product with this name already exists" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || "",
        image: image || null,
        specs: specs ? JSON.stringify(specs) : null,
        categoryId: parseInt(categoryId)
      },
      include: { category: true }
    });

    // Parse specs for response
    const response = {
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : null
    };

    return NextResponse.json({ success: true, product: response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create product" }, { status: 500 });
  }
}

// 3. PUT: Update a product
export async function PUT(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, categoryId, description, image, specs } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    // Find the product
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    const slug = name ? slugify(name) : existingProduct.slug;

    // Check if new slug conflicts with another product
    if (slug !== existingProduct.slug) {
      const conflict = await prisma.product.findUnique({ where: { slug } });
      if (conflict) {
        return NextResponse.json({ success: false, error: "Product name already in use" }, { status: 400 });
      }
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name, slug }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
        ...(specs !== undefined && { specs: specs ? JSON.stringify(specs) : null }),
        ...(categoryId && { categoryId: parseInt(categoryId) })
      },
      include: { category: true }
    });

    // Parse specs for response
    const response = {
      ...product,
      specs: product.specs ? JSON.parse(product.specs) : null
    };

    return NextResponse.json({ success: true, product: response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update product" }, { status: 500 });
  }
}

// 4. DELETE: Remove a product
export async function DELETE(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Product ID is required" }, { status: 400 });
    }

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete product" }, { status: 500 });
  }
}
