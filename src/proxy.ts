import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Si no está en /admin, dejamos pasar.
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Las subrutas de logueo se permiten
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Verificamos protección para el panel
  const token = request.cookies.get("vertex_admin_session")?.value;

  if (!token) {
    // Redirigir al login
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  // Verificar la firma del JWT
  const payload = await verifyToken(token);
  if (!payload) {
    // Si la gallaeta fue falsificada o expiró, redirigir
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    const response = NextResponse.redirect(url);
    response.cookies.delete("vertex_admin_session");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
