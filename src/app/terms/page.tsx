import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約 - 判断ログ",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
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
        <h1 className="text-3xl font-bold mb-2">利用規約</h1>
        <p className="text-sm text-gray-400 mb-12">最終更新日：2025年2月9日</p>

        <div className="space-y-10 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第1条（適用）
            </h2>
            <p>
              本規約は、判断ログ（以下「本サービス」）の利用に関する条件を定めるものです。ユーザーは本サービスを利用することにより、本規約に同意したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第2条（サービスの内容）
            </h2>
            <p>
              本サービスは、ユーザーの判断を記録し、AIによる振り返りの問いを提供する判断記録システムです。AIはアドバイスや正解を提示するものではなく、過去の判断に基づく問いを返すことで、ユーザー自身の振り返りを支援します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第3条（アカウント）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスの利用にはGoogleアカウントによる認証が必要です。
              </li>
              <li>
                ユーザーは自身のアカウントを適切に管理する責任を負い、第三者に利用させてはなりません。
              </li>
              <li>
                アカウントの不正利用により生じた損害について、運営者は一切の責任を負いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第4条（禁止事項）
            </h2>
            <p className="mb-3">
              ユーザーは以下の行為を行ってはなりません。
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>他のユーザーまたは第三者の権利を侵害する行為</li>
              <li>不正アクセスまたはそれを試みる行為</li>
              <li>本サービスを逆コンパイル、リバースエンジニアリング、またはその他の方法で解析する行為</li>
              <li>本サービスを商業目的で無断利用する行為</li>
              <li>その他、運営者が不適切と判断する行為</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第5条（AI機能について）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスのAI機能は、外部のAIサービス（Anthropic
                Claude）を利用しています。
              </li>
              <li>
                AIが生成する問いや分析は参考情報であり、その正確性・完全性を保証するものではありません。
              </li>
              <li>
                AIの出力に基づくユーザーの判断や行動について、運営者は一切の責任を負いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第6条（知的財産権）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                本サービスに関する知的財産権は運営者に帰属します。
              </li>
              <li>
                ユーザーが記録したコンテンツの著作権はユーザーに帰属します。ただし、サービス提供に必要な範囲で運営者が利用することに同意するものとします。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第7条（サービスの変更・中断・終了）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                運営者は、事前の通知なく本サービスの内容を変更、中断、または終了することがあります。
              </li>
              <li>
                サービスの変更・中断・終了によりユーザーに生じた損害について、運営者は一切の責任を負いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第8条（免責事項）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                運営者は本サービスの完全性、正確性、有用性等について保証しません。
              </li>
              <li>
                本サービスの利用に起因してユーザーに生じた損害について、運営者の故意または重過失による場合を除き、責任を負いません。
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第9条（規約の変更）
            </h2>
            <p>
              運営者は必要に応じて本規約を変更できるものとします。変更後の規約は本サービス上に掲示した時点で効力を生じます。変更後に本サービスを利用した場合、変更後の規約に同意したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              第10条（準拠法・管轄裁判所）
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>本規約の解釈は日本法に準拠します。</li>
              <li>
                本サービスに関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </li>
            </ol>
          </section>
        </div>
      </main>
    </div>
  );
}
