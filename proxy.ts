import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile"];
const publicRoutes = ["/auth/login", "/auth/register"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/auth/login", "/auth/register"],
};
