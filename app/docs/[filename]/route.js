export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import fs from "fs/promises";
import path from "path";

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

export async function GET(req, { params }) {
  try {
    const { filename } = await params;
    if (!filename) {
      return new Response("Not Found", { status: 404 });
    }

    // Prevent path traversal attacks
    const safeFilename = path.basename(filename);
    const filePath = path.join(process.cwd(), "docs", safeFilename);

    try {
      const fileBuffer = await fs.readFile(filePath);
      const ext = path.extname(safeFilename).toLowerCase();
      const contentType = MIME_TYPES[ext] || "application/octet-stream";

      return new Response(fileBuffer, {
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `inline; filename="${safeFilename}"`,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch (err) {
      return new Response("File Not Found", { status: 404 });
    }
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
