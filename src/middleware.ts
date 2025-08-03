/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const publicPaths = ["/", "/login", "/register"];
const protectedPaths = ["/dashboard", "/user/checkout"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  console.log("hi token", token);

  console.log("All Cookies:", request.cookies);
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
      role = (payload as any).role;
      isLoggedIn = true;
      console.log(" TOKEN PAYLOAD:", payload);
    } catch (err) {
      console.error(" JWT verification failed:", err);

      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  console.log("Request path:", pathname);
  console.log("Token:", token);
  console.log("Is public path:", isPublicPath);
  console.log("Is protected path:", isProtectedPath);
  console.log("Is dashboard path:", isDashboardPath);
  console.log("User role:", role);
  console.log("Is logged in:", isLoggedIn);

  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isDashboardPath && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (isLoggedIn && isPublicPath && pathname !== "/") {
    return NextResponse.redirect(
      new URL(role === "admin" ? "/dashboard" : "/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/user/checkout/:path*",
    "/",
    "/login",
    "/register",
  ],
};
