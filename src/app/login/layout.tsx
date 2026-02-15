import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン - 判断ログ",
  alternates: {
    canonical: "/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ログインページではヘッダーとmainのパディングを使わない独自レイアウト
  return <>{children}</>;
}
