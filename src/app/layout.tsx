import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "判断ログ",
  description: "自分を更新するための判断記録システム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-[#FAFAF8]">
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
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
