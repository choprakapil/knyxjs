import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export const runtime = "nodejs";

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

// GET: Fetch all stockists from settings
export async function GET() {
  try {
    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    const stockists = settings?.stockists ? JSON.parse(settings.stockists) : [];
    
    return NextResponse.json({ success: true, stockists });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch stockists" }, { status: 500 });
  }
}

// POST: Add a new stockist
export async function POST(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const stockist = await req.json();

    if (!stockist.name || !stockist.country) {
      return NextResponse.json({ success: false, error: "Name and Country are required" }, { status: 400 });
    }

    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    let stockists = settings?.stockists ? JSON.parse(settings.stockists) : [];
    
    // Add new stockist with ID
    const newStockist = {
      id: Date.now().toString(),
      ...stockist
    };
    
    stockists.push(newStockist);

    await prisma.setting.upsert({
      where: { id: 1 },
      update: { stockists: JSON.stringify(stockists) },
      create: { id: 1, stockists: JSON.stringify(stockists) },
    });

    return NextResponse.json({ success: true, stockist: newStockist, stockists });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create stockist" }, { status: 500 });
  }
}

// PUT: Update a stockist
export async function PUT(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updatedData } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Stockist ID is required" }, { status: 400 });
    }

    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    let stockists = settings?.stockists ? JSON.parse(settings.stockists) : [];
    const stockistIndex = stockists.findIndex(s => s.id === id);

    if (stockistIndex === -1) {
      return NextResponse.json({ success: false, error: "Stockist not found" }, { status: 404 });
    }

    stockists[stockistIndex] = {
      ...stockists[stockistIndex],
      ...updatedData,
      id // Preserve the ID
    };

    await prisma.setting.upsert({
      where: { id: 1 },
      update: { stockists: JSON.stringify(stockists) },
      create: { id: 1, stockists: JSON.stringify(stockists) },
    });

    return NextResponse.json({ success: true, stockist: stockists[stockistIndex], stockists });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update stockist" }, { status: 500 });
  }
}

// DELETE: Remove a stockist
export async function DELETE(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Stockist ID is required" }, { status: 400 });
    }

    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    let stockists = settings?.stockists ? JSON.parse(settings.stockists) : [];
    const initialLength = stockists.length;
    
    stockists = stockists.filter(s => s.id !== id);

    if (stockists.length === initialLength) {
      return NextResponse.json({ success: false, error: "Stockist not found" }, { status: 404 });
    }

    await prisma.setting.upsert({
      where: { id: 1 },
      update: { stockists: JSON.stringify(stockists) },
      create: { id: 1, stockists: JSON.stringify(stockists) },
    });

    return NextResponse.json({ success: true, message: "Stockist deleted successfully", stockists });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete stockist" }, { status: 500 });
  }
}
