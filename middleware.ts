import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      !req.nextauth.token?.userRole.includes("Admin")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (
      (req.nextUrl.pathname.startsWith("/friend-request") ||
        req.nextUrl.pathname === "/event-summary") &&
      !req.nextauth.token?.userRole.includes("User")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/create-profile",
    "/profile/edit",
    "/friend-request/:path*",
    "/event-summary",
  ],
};
