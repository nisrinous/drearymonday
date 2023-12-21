import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const role = request.cookies.get("user-role")?.value;
  const id = request.cookies.get("user-id")?.value;
  const membership = request.cookies.get("user-membership")?.value;

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !token &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/user") && role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (request.nextUrl.pathname.startsWith("/news") && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (
    ["/auth/signup", "/auth/signin"].includes(request.nextUrl.pathname) &&
    token &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/news", request.url));
  }

  if (
    ["/auth/signup", "/auth/signin"].includes(request.nextUrl.pathname) &&
    token &&
    role === "admin"
  ) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}
