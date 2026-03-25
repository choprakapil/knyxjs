import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

// 1. GET: Fetch current logged-in user details
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { email: true, role: true }
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// 2. POST/PUT: Save Updated Profile details
export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
    }

    const { email, password } = await req.json();

    const updateData = {};
    if (email) updateData.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    await prisma.user.update({
      where: { id: decoded.id },
      data: updateData
    });

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message || "Update failed" }, { status: 500 });
  }
}
