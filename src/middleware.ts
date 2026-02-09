export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    /*
     * /login と /api/auth 以外の全ルートを保護
     * 静的ファイル (_next, favicon 等) は除外
     */
    "/((?!login|api/auth|_next/static|_next/image|favicon|apple-touch-icon|site\\.webmanifest|ogp).*)",
  ],
};
