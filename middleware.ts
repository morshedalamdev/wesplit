import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/dal";

export const runtime = "nodejs";

export default async function middleware(req: NextRequest){
     const user = getUser();

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};