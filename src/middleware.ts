import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  const path = request.nextUrl.pathname;

  if (path === "/" && token?.event) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (path.startsWith("/dashboard") && !token?.event) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};
