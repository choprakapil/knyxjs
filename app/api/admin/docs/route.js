import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { writeFile, mkdir, readdir, stat } from "fs/promises";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return verifyToken(token);
}

const MIME_TYPES = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".csv": "text/csv",
  ".mp4": "video/mp4",
  ".zip": "application/zip",
};

// GET: Fetch all documents
export async function GET() {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const docsDir = path.join(process.cwd(), "docs");
    
    // Ensure the directory exists
    await mkdir(docsDir, { recursive: true });

    const files = await readdir(docsDir);
    const documents = [];

    for (const filename of files) {
      if (filename.startsWith(".")) continue; // skip hidden files

      const filePath = path.join(docsDir, filename);
      const fileStats = await stat(filePath);

      const ext = path.extname(filename).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      documents.push({
        name: filename,
        size: fileStats.size,
        type: contentType,
        uploadDate: fileStats.mtime, // Use modification time as upload time
        url: `/docs/${filename}`
      });
    }

    // Sort by upload date desc
    documents.sort((a, b) => b.uploadDate - a.uploadDate);

    return NextResponse.json({ success: true, documents });
  } catch (error) {
    console.error("Fetch docs error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch documents" }, { status: 500 });
  }
}

// POST: Upload a document
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

    const ext = path.extname(file.name).toLowerCase();
    const allowedExts = Object.keys(MIME_TYPES);
    if (!allowedExts.includes(ext)) {
      return NextResponse.json(
        { success: false, error: `Unsupported file extension: ${ext || "none"}` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize the base name of the file to prevent path traversal and clean symbols
    const baseName = path.basename(file.name, ext)
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "_")
      .replace(/_+/g, "_");

    let finalName = `${baseName}${ext}`;
    const docsDir = path.join(process.cwd(), "docs");

    await mkdir(docsDir, { recursive: true });

    // Handle name collision
    let counter = 1;
    while (fs.existsSync(path.join(docsDir, finalName))) {
      finalName = `${baseName}-${counter}${ext}`;
      counter++;
    }

    const filePath = path.join(docsDir, finalName);
    await writeFile(filePath, buffer);

    const publicUrl = `/docs/${finalName}`;

    return NextResponse.json({
      success: true,
      document: {
        name: finalName,
        size: file.size,
        type: MIME_TYPES[ext] || "application/octet-stream",
        uploadDate: new Date(),
        url: publicUrl
      }
    });
  } catch (error) {
    console.error("Upload doc error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
