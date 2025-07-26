/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicPaths = ["/", "/login", "/register"];
const protectedPaths = ["/dashboard", "/profile"];

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_ACCESS_SECRET!;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isPublicPath = publicPaths.includes(pathname);
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isDashboardPath = pathname.startsWith("/dashboard");

  let isLoggedIn = false;
  let role = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(JWT_SECRET);

      const { payload } = await jwtVerify(token, secret);
      isLoggedIn = true;
      role = (payload as any).role;
    } catch (error) {
      console.error("Token invalid or expired:", error);
      isLoggedIn = false;
    }
  }

  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isPublicPath) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isDashboardPath && isLoggedIn && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
