import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Admin Auth Logic
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("vertex_admin_session")?.value;

    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      const response = NextResponse.redirect(url);
      response.cookies.delete("vertex_admin_session");
      return response;
    }

    return NextResponse.next();
  }

  // 2. Default Next-Intl I18n Middleware
  return intlMiddleware(request);
}

export const config = {
  // Match everything except api, static assets, and internal next paths
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

