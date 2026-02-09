import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "判断ログ - 自分を更新するための判断記録システム",
  description:
    "成功でも失敗でもない。判断を記録し、AIが過去の自分を呼び出し、未来の自分に問いを返す。答えを出すのではなく、判断を疑える自分でい続けるために。",
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

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
