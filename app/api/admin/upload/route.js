import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return verifyToken(token);
}

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-msvideo",
  "application/octet-stream",
]);

const ALLOWED_EXT = new Set([
  ".mp4",
  ".webm",
  ".mov",
  ".m4v",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".svg",
]);

function isAllowedUpload(file) {
  if (ALLOWED_TYPES.has(file.type)) return true;
  const ext = path.extname(file.name || "").toLowerCase();
  return ALLOWED_EXT.has(ext);
}

export async function POST(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (!isAllowedUpload(file)) {
      return NextResponse.json(
        { success: false, error: `Unsupported file type: ${file.type || "unknown"}` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || (file.type.startsWith("video/") ? ".mp4" : ".png");
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "assets", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, safeName), buffer);

    const publicPath = `/assets/uploads/${safeName}`;

    return NextResponse.json({ success: true, path: publicPath, name: file.name });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
