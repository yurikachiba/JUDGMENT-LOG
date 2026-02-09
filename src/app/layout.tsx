import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const viewport: Viewport = {
  themeColor: "#E8A317",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "判断ログ - 自分を更新するための判断記録システム",
  description:
    "成功でも失敗でもない。判断を記録し、AIが過去の自分を呼び出し、未来の自分に問いを返す。答えを出すのではなく、判断を疑える自分でい続けるために。",
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
  other: {
    "msapplication-TileColor": "#E8A317",
    "mobile-web-app-capable": "yes",
  },
  openGraph: {
    title: "判断ログ - 自分を更新するための判断記録システム",
    description:
      "成功でも失敗でもない。判断を記録し、AIが過去の自分を呼び出し、未来の自分に問いを返す。",
    images: ["/ogp.png"],
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
