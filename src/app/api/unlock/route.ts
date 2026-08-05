import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const COOKIE_NAME = "wedding_unlocked";

export async function POST(req: NextRequest) {
  const { passcode } = await req.json().catch(() => ({ passcode: "" }));
  const expected = process.env.SITE_PASSCODE;

  if (!expected) {
    console.error("SITE_PASSCODE is not set — the site cannot be unlocked until it is.");
    return NextResponse.json({ error: "Site passcode not configured" }, { status: 500 });
  }

  if (typeof passcode !== "string" || passcode.trim().toUpperCase() !== expected.trim().toUpperCase()) {
    return NextResponse.json({ error: "Incorrect passcode" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, "yes", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 180 // 180 days
  });
  return res;
}
