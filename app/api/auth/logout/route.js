import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set("token", "", {
    httpOnly: true,
    secure: true, // Forces secure header invalidation
    sameSite: "strict",
    path: "/",
    expires: new Date(0), // FORCE DELETE
  });

  return Response.json({ success: true });
}
