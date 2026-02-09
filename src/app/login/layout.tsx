export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ログインページではヘッダーとmainのパディングを使わない独自レイアウト
  return <>{children}</>;
}
