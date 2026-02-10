import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

const BASE_URL =
  process.env.NEXTAUTH_URL || "https://judgment-log.vercel.app";

export const viewport: Viewport = {
  themeColor: "#E8A317",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "判断ログ - 自分を更新するための判断記録システム",
    template: "%s - 判断ログ",
  },
  description:
    "成功でも失敗でもない。判断を記録し、AIが過去の自分を呼び出し、未来の自分に問いを返す。答えを出すのではなく、判断を疑える自分でい続けるために。",
  keywords: [
    "判断ログ",
    "意思決定",
    "判断記録",
    "振り返り",
    "AI",
    "自己成長",
    "判断力",
    "記録アプリ",
  ],
  authors: [{ name: "判断ログ" }],
  creator: "判断ログ",
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "判断ログ",
  },
  formatDetection: {
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: { "ja-JP": "/" },
  },
  other: {
    "msapplication-TileColor": "#E8A317",
    "mobile-web-app-capable": "yes",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "判断ログ",
    title: "判断ログ - 自分を更新するための判断記録システム",
    description:
      "成功でも失敗でもない。判断を記録し、AIが過去の自分を呼び出し、未来の自分に問いを返す。",
    images: [
      {
        url: "/ogp.png",
        width: 1200,
        height: 630,
        alt: "判断ログ - 自分を更新するための判断記録システム",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "判断ログ - 自分を更新するための判断記録システム",
    description:
      "成功でも失敗でもない。判断を記録し、AIが過去の自分を呼び出し、未来の自分に問いを返す。",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
