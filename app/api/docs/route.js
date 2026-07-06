import { NextResponse } from "next/server";
import { readdir, stat, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

// GET: Fetch all documents (Public endpoint)
export async function GET() {
  try {
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
        uploadDate: fileStats.mtime,
        url: `/docs/${filename}`
      });
    }

    // Sort by upload date desc
    documents.sort((a, b) => b.uploadDate - a.uploadDate);

    return NextResponse.json({ success: true, documents });
  } catch (error) {
    console.error("Fetch public docs error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch documents" }, { status: 500 });
  }
}
