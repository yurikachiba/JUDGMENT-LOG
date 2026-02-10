import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ログイン",
  description:
    "判断ログにGoogleアカウントでログイン。判断を記録し、AIが過去の自分を呼び出し、問いを返す。",
  alternates: { canonical: "/login" },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ログインページではヘッダーとmainのパディングを使わない独自レイアウト
  return <>{children}</>;
}
