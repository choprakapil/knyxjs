import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { deepMerge, parseContentJson } from "@/lib/mergeContent";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = verifyToken(token);

  if (!decoded) {
    return null;
  }
  return decoded;
}

function formatSettings(settings) {
  if (!settings) return null;
  return {
    ...settings,
    stockists: settings.stockists ? JSON.parse(settings.stockists) : [],
    content: parseContentJson(settings.content),
  };
}

// GET: Fetch site settings
export async function GET() {
  try {
    let settings = await prisma.setting.findUnique({
      where: { id: 1 },
    });

    if (!settings) {
      settings = await prisma.setting.create({
        data: { id: 1 },
      });
    }

    return NextResponse.json(
      { success: true, settings: formatSettings(settings) },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
  }
}

// POST: Update site settings (partial updates merge into existing content JSON)
export async function POST(req) {
  try {
    const decoded = await checkAuth();
    if (!decoded) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      logoPath,
      siteEmail,
      sitePhone,
      instagramUrl,
      facebookUrl,
      twitterUrl,
      linkedinUrl,
      content,
    } = body;

    const existing = await prisma.setting.findUnique({ where: { id: 1 } });
    const existingContent = parseContentJson(existing?.content);

    let contentValue;
    if (content !== undefined) {
      const incoming =
        typeof content === "string" ? parseContentJson(content) : content;
      const merged = deepMerge(existingContent, incoming);
      contentValue = JSON.stringify(merged);
    }

    const settings = await prisma.setting.upsert({
      where: { id: 1 },
      update: {
        ...(logoPath !== undefined && { logoPath }),
        ...(siteEmail !== undefined && { siteEmail }),
        ...(sitePhone !== undefined && { sitePhone }),
        ...(instagramUrl !== undefined && { instagramUrl }),
        ...(facebookUrl !== undefined && { facebookUrl }),
        ...(twitterUrl !== undefined && { twitterUrl }),
        ...(linkedinUrl !== undefined && { linkedinUrl }),
        ...(contentValue !== undefined && { content: contentValue }),
      },
      create: {
        id: 1,
        logoPath: logoPath || "/assets/img/logo/logo-white-2.png",
        siteEmail: siteEmail || "contact@knyxsports.com",
        sitePhone: sitePhone || "",
        instagramUrl: instagramUrl || "https://www.instagram.com/knyxsports/",
        facebookUrl: facebookUrl || "",
        twitterUrl: twitterUrl || "",
        linkedinUrl: linkedinUrl || "",
        ...(contentValue !== undefined && { content: contentValue }),
      },
    });

    return NextResponse.json({ success: true, settings: formatSettings(settings) });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update settings" },
      { status: 500 }
    );
  }
}
