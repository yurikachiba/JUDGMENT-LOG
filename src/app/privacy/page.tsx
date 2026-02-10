import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "判断ログのプライバシーポリシーです。個人情報の取り扱い、データの保護方針についてご確認ください。",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-gray-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            トップに戻る
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-gray-400 mb-12">最終更新日：2025年2月9日</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <p>
              判断ログ（以下「本サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本ポリシーは、本サービスにおける個人情報の取り扱いについて定めるものです。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              1. 収集する情報
            </h2>
            <p className="mb-4">
              本サービスでは以下の情報を収集します。
            </p>

            <h3 className="font-bold text-gray-900 mb-2">
              (1) Googleアカウント情報
            </h3>
            <p className="mb-4">
              認証時にGoogleから提供される以下の情報を取得します。
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>氏名</li>
              <li>メールアドレス</li>
              <li>プロフィール画像</li>
            </ul>

            <h3 className="font-bold text-gray-900 mb-2">
              (2) ユーザーが入力する情報
            </h3>
            <ul className="list-disc pl-5 space-y-1 mb-6">
              <li>判断の記録（判断内容、状態、前提、見送った選択肢、タグ）</li>
              <li>AIの問いに対する回答</li>
            </ul>

            <h3 className="font-bold text-gray-900 mb-2">
              (3) 自動的に収集される情報
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>セッション情報（認証状態の維持に必要な情報）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              2. 情報の利用目的
            </h2>
            <p className="mb-3">
              収集した情報は以下の目的で利用します。
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>ユーザー認証およびアカウント管理</li>
              <li>判断記録の保存・表示</li>
              <li>
                AI機能による振り返りの問い生成（過去の判断との類似性分析を含む）
              </li>
              <li>サービスの改善および運営</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              3. 第三者への情報提供
            </h2>
            <p className="mb-4">
              本サービスでは、以下の場合を除き、ユーザーの個人情報を第三者に提供しません。
            </p>

            <h3 className="font-bold text-gray-900 mb-2">
              (1) AI機能の利用
            </h3>
            <p className="mb-4">
              振り返りの問いを生成するため、ユーザーの判断記録の一部をAIサービス提供者（Anthropic）に送信します。送信されるデータには個人を特定する情報（氏名・メールアドレス等）は含まれません。
            </p>

            <h3 className="font-bold text-gray-900 mb-2">(2) 法令に基づく場合</h3>
            <p>
              法令に基づき開示が求められた場合、必要な範囲で情報を提供することがあります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              4. データの保管
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                ユーザーのデータはPostgreSQLデータベースに保管されます。
              </li>
              <li>
                データは適切なセキュリティ対策を講じた環境で管理されます。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              5. データの削除
            </h2>
            <p>
              ユーザーがアカウントを削除した場合、関連するすべてのデータ（判断記録、振り返り、アカウント情報）は削除されます。データの削除を希望する場合は、運営者にお問い合わせください。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              6. Cookieの使用
            </h2>
            <p>
              本サービスでは、認証状態の維持のためにCookieを使用します。これはサービスの機能に必要なもので、トラッキングや広告目的では使用しません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              7. ユーザーの権利
            </h2>
            <p className="mb-3">ユーザーは以下の権利を有します。</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>自身のデータへのアクセスおよび確認</li>
              <li>データの訂正の要求</li>
              <li>データの削除の要求</li>
              <li>サービス利用の停止</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              8. 本ポリシーの変更
            </h2>
            <p>
              本ポリシーは必要に応じて変更されることがあります。重要な変更がある場合は、本サービス上で通知します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              9. お問い合わせ
            </h2>
            <p>
              プライバシーに関するお問い合わせは、本サービスの運営者までご連絡ください。
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
