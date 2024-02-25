import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin") &&
        !req.nextauth.token?.userRole.includes("Admin")
    ) {
        return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ["/admin/:path*", "/create-profile", "/profile/edit", "/friend-request/:path*"] }