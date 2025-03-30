// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log(`[Middleware] Processing request for: ${req.nextUrl.pathname}`);

  const supabase = createMiddlewareClient({ req, res: NextResponse.next() });
  console.log("[Middleware] Supabase client initialized");

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("[Middleware] Error fetching user:", error.message);
    } else {
      console.log("[Middleware] User data:", user ? user.email : "No user found");
    }

    if (!user && !req.nextUrl.pathname.startsWith("/login") && !req.nextUrl.pathname.startsWith("/auth/callback")) {
      console.log("[Middleware] Redirecting to /login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (err) {
    console.error("[Middleware] Unexpected error:", err);
  }

  console.log("[Middleware] Proceeding with request");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};