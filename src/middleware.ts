/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicPaths = ["/", "/login", "/register"];
const protectedPaths = ["/dashboard", "/checkout"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const pathname = request.nextUrl.pathname;

  const isPublicPath = publicPaths.includes(pathname);
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isDashboardPath = pathname.startsWith("/dashboard");

  let isLoggedIn = false;
  let role: string | null = null;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      console.log("TOKEN PAYLOAD", payload);
      console.log("ROLE FROM TOKEN", role);
      isLoggedIn = true;
      role = (payload as any).role;
    } catch (err) {
      console.error("JWT verification failed:", err);
      isLoggedIn = false;
    }
  }

  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isDashboardPath && isLoggedIn && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isLoggedIn && isPublicPath) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/checkout/:path*",
    "/",
    "/login",
    "/register",
  ],
};
