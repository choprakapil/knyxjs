export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/jwt";
import { NextResponse } from "next/server";

let attempts = {};

setInterval(() => {
  attempts = {};
}, 1000 * 60 * 5); // reset every 5 minutes

export async function POST(req) {
  console.log("LOGIN_API_HIT", Date.now());
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!attempts[ip]) {
      attempts[ip] = { count: 0, time: Date.now() };
    }

    if (Date.now() - attempts[ip].time < 60000) {
      if (attempts[ip].count >= 5) {
        return NextResponse.json(
          { success: false, error: "Too many attempts. Try again later." },
          { status: 429 }
        );
      }
    } else {
      attempts[ip] = { count: 0, time: Date.now() };
    }

    attempts[ip].count++;

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    // Include and return token
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    // Set cookie or return in response
    const response = NextResponse.json({ success: true, data: { token, role: user.role } });
    
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
