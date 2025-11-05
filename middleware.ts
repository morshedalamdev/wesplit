import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "./lib/dal";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute =
    protectedRoutes.includes(path) || path.startsWith("/dashboard");
  const isPublicRoute = publicRoutes.includes(path);

  const user = await getUserId();

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && user) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
