// middleware.ts
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Initialize Supabase client with the request object
  const supabase = createMiddlewareClient({ req, res: NextResponse.next() });

  // Get the authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  // Check if the user is unauthenticated and trying to access a protected route
  if (!user && !req.nextUrl.pathname.startsWith("/login") && !req.nextUrl.pathname.startsWith("/auth/callback")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If authenticated or accessing login/callback, proceed with the request
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};