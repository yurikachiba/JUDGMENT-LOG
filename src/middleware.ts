import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // callbackUrl を付けずにシンプルに /login へリダイレクト
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * /dashboard と /api（/api/auth を除く）を保護
     * /, /login, /api/auth, 静的ファイル (_next, favicon 等) は公開
     */
    "/dashboard/:path*",
    "/api/((?!auth).*)",
  ],
};
