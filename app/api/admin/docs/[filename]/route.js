import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { unlink } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return verifyToken(token);
}

export async function DELETE(req, { params }) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { filename } = await params;
    if (!filename) {
      return NextResponse.json({ success: false, error: "No filename provided" }, { status: 400 });
    }

    // Sanitize to prevent directory traversal
    const safeFilename = path.basename(filename);
    const docsDir = path.join(process.cwd(), "docs");
    const filePath = path.join(docsDir, safeFilename);

    try {
      await unlink(filePath);
      return NextResponse.json({ success: true, message: "File deleted successfully" });
    } catch (err) {
      return NextResponse.json({ success: false, error: "File not found on disk" }, { status: 404 });
    }
  } catch (error) {
    console.error("Delete doc error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Deletion failed" },
      { status: 500 }
    );
  }
}
