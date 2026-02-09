import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { UserMenu } from "@/components/UserMenu";

export const metadata: Metadata = {
  title: "判断ログ",
  description: "自分を更新するための判断記録システム",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#E8A317",
    "theme-color": "#E8A317",
  },
  openGraph: {
    title: "判断ログ",
    description: "自分を更新するための判断記録システム",
    images: ["/ogp.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "判断ログ",
    description: "自分を更新するための判断記録システム",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[#FAFAF8]">
        <Providers>
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-kimi-500 flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-lg">判断ログ</span>
              </a>
              <UserMenu />
            </div>
          </header>
          <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
