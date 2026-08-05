import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "wedding_unlocked";

// Paths that must stay reachable without the passcode.
const PUBLIC_PATHS = ["/login", "/api/unlock", "/favicon.ico"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (isPublic) return NextResponse.next();

  const unlocked = req.cookies.get(COOKIE_NAME)?.value === "yes";
  if (unlocked) return NextResponse.next();

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static, _next/image (Next internals)
     * - files with an extension (images, etc. served from /public)
     */
    "/((?!_next/static|_next/image|.*\\..*).*)"
  ]
};
