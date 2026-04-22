import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Next.js 16 Proxy (renamed from middleware).
 *
 * Routing config: localePrefix = 'as-needed'
 *   - English (default): no prefix → /admin/login, /admin, /portfolio, etc.
 *   - Spanish: /es prefix → /es/admin/login, /es/admin, /es/portfolio, etc.
 *
 * Admin routes live in the filesystem at src/app/[locale]/admin/...
 * next-intl does NOT automatically rewrite /admin/... to /en/admin/... for the
 * app router — we must do that rewrite manually for admin paths.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Detect admin routes ────────────────────────────────────────────────────
  // Matches: /admin, /admin/*, /es/admin, /es/admin/*
  const adminMatch = pathname.match(/^(?:\/(es))?(\/admin(?:\/.*)?)?$/);
  const isAdminRoute =
    adminMatch !== null &&
    adminMatch[2] !== undefined &&
    adminMatch[2].startsWith("/admin");

  if (!isAdminRoute) {
    // Regular public routes — delegate entirely to next-intl
    return intlMiddleware(request);
  }

  // ── Admin route detected ───────────────────────────────────────────────────
  const localeInPath = adminMatch[1]; // "es" | undefined
  const locale = localeInPath ?? "en"; // actual locale
  const subpath = adminMatch[2]; // e.g. "/admin/login", "/admin/projects"

  const loginSubpath = "/admin/login";
  const isLoginPage = subpath === loginSubpath;

  // ── Check auth (skip for login page) ─────────────────────────────────────
  if (!isLoginPage) {
    const token = request.cookies.get("vertex_admin_session")?.value;

    if (!token) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = localeInPath ? `/${localeInPath}/admin/login` : "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyToken(token);
    if (!payload) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = localeInPath ? `/${localeInPath}/admin/login` : "/admin/login";
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("vertex_admin_session");
      return response;
    }
  }

  // ── Rewrite to the [locale] segment in the filesystem ────────────────────
  // The app router file is at src/app/[locale]/admin/...
  // We need to rewrite /admin/... → /en/admin/... (internally)
  // and /es/admin/... → /es/admin/... (already correct)
  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = `/${locale}${subpath}`;

  const response = NextResponse.rewrite(rewriteUrl);

  // Inject x-next-intl-locale header so Server Components know the locale
  response.headers.set("x-next-intl-locale", locale);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
