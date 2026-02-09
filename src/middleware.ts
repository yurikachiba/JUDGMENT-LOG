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
     * /login, /lp, /api/auth 以外の全ルートを保護
     * 静的ファイル (_next, favicon 等) は除外
     */
    "/((?!login|lp|api/auth|_next/static|_next/image|favicon|apple-touch-icon|site\\.webmanifest|ogp).*)",
  ],
};
