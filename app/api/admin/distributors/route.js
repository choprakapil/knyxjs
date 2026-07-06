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

// GET: Fetch all distributors from settings
export async function GET() {
  try {
    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    const distributors = settings?.distributors ? JSON.parse(settings.distributors) : [];
    
    return NextResponse.json({ success: true, distributors });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch distributors" }, { status: 500 });
  }
}

// POST: Add a new distributor
export async function POST(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const distributor = await req.json();

    if (!distributor.name || !distributor.country) {
      return NextResponse.json({ success: false, error: "Name and Country are required" }, { status: 400 });
    }

    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    let distributors = settings?.distributors ? JSON.parse(settings.distributors) : [];
    
    // Add new distributor with ID
    const newDistributor = {
      id: Date.now().toString(),
      ...distributor
    };
    
    distributors.push(newDistributor);

    await prisma.setting.upsert({
      where: { id: 1 },
      update: { distributors: JSON.stringify(distributors) },
      create: { id: 1, distributors: JSON.stringify(distributors) },
    });

    return NextResponse.json({ success: true, distributor: newDistributor, distributors });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create distributor" }, { status: 500 });
  }
}

// PUT: Update a distributor
export async function PUT(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { id, ...updatedData } = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Distributor ID is required" }, { status: 400 });
    }

    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    let distributors = settings?.distributors ? JSON.parse(settings.distributors) : [];
    const distributorIndex = distributors.findIndex(d => d.id === id);

    if (distributorIndex === -1) {
      return NextResponse.json({ success: false, error: "Distributor not found" }, { status: 404 });
    }

    distributors[distributorIndex] = {
      ...distributors[distributorIndex],
      ...updatedData,
      id // Preserve the ID
    };

    await prisma.setting.upsert({
      where: { id: 1 },
      update: { distributors: JSON.stringify(distributors) },
      create: { id: 1, distributors: JSON.stringify(distributors) },
    });

    return NextResponse.json({ success: true, distributor: distributors[distributorIndex], distributors });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update distributor" }, { status: 500 });
  }
}

// DELETE: Remove a distributor
export async function DELETE(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Distributor ID is required" }, { status: 400 });
    }

    const settings = await prisma.setting.findUnique({
      where: { id: 1 }
    });

    let distributors = settings?.distributors ? JSON.parse(settings.distributors) : [];
    const initialLength = distributors.length;
    
    distributors = distributors.filter(d => d.id !== id);

    if (distributors.length === initialLength) {
      return NextResponse.json({ success: false, error: "Distributor not found" }, { status: 404 });
    }

    await prisma.setting.upsert({
      where: { id: 1 },
      update: { distributors: JSON.stringify(distributors) },
      create: { id: 1, distributors: JSON.stringify(distributors) },
    });

    return NextResponse.json({ success: true, message: "Distributor deleted successfully", distributors });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Failed to delete distributor" }, { status: 500 });
  }
}
