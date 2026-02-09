import Link from "next/link";

function Logo({ size = 40 }: { size?: number }) {
  const iconSize = Math.round(size * 0.55);
  return (
    <div
      className="rounded-2xl bg-kimi-500 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={iconSize}
        height={iconSize}
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
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-gray-900">
      {/* ナビゲーション */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAF8]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="font-bold text-gray-800">判断ログ</span>
          </div>
          <Link
            href="/login"
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            ログイン
          </Link>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section className="min-h-[85vh] flex items-center justify-center px-6 pt-14">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-gray-400 tracking-widest mb-8">
            JUDGMENT LOG
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-[1.2] tracking-tight">
            答えは出さない。
            <br />
            <span className="text-kimi-500">問いを返す。</span>
          </h1>
          <p className="mt-8 text-gray-400 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            自分を更新するための判断記録システム
          </p>
          <div className="mt-12">
            <a
              href="#story"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              <span>scroll</span>
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
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== これは判断ログ ===== */}
      <section id="story" className="py-24 sm:py-32 px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-400 text-sm mb-6">01</p>
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug mb-8">
            これは「成功ログ」でも
            <br />
            「失敗ログ」でもない。
          </h2>
          <div className="space-y-6 text-gray-500 leading-relaxed">
            <p>
              うまくいったか。失敗したか。
              <br />
              それは副産物にすぎない。
            </p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">
              主役は常にこれ。
            </p>
          </div>
          <div className="mt-10 border-l-2 border-kimi-400 pl-6 py-4">
            <p className="text-lg sm:text-xl text-gray-900 font-medium leading-relaxed">
              私はこの時、
              <br />
              こういう状態で、
              <br />
              こう判断した。
            </p>
          </div>
          <p className="mt-8 text-gray-400 text-sm">
            これだけ。最初から評価しない。
          </p>
        </div>
      </section>

      {/* ===== 判断の最小単位 ===== */}
      <section className="py-24 sm:py-32 px-6 bg-white">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-400 text-sm mb-6">02</p>
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug mb-12">
            1つの判断に必要なのは、
            <br />
            これだけ。
          </h2>
          <div className="space-y-6">
            {[
              {
                label: "判断したこと",
                note: "1行で書く。",
              },
              {
                label: "その時の状態",
                note: "体力、時間、心。3つだけ。",
              },
              {
                label: "その時の前提",
                note: "判断の根拠になった制約。1〜2行。",
              },
              {
                label: "見送った選択肢",
                note: "あれば。",
              },
            ].map((item, i) => (
              <div key={i} className="flex items-baseline gap-4">
                <span className="shrink-0 text-sm text-kimi-500 font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="font-bold text-gray-900">{item.label}</span>
                  <span className="text-gray-400 ml-3 text-sm">
                    {item.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-gray-400 leading-relaxed">
            成功・失敗は後からタグで付けるだけ。
            <br />
            記録する時は、評価しない。
          </p>
        </div>
      </section>

      {/* ===== AIの役割 ===== */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-400 text-sm mb-6">03</p>
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug mb-6">
            AIは判断しない。
          </h2>
          <p className="text-gray-500 mb-12">
            答えを出すAIでも、正解を教えるAIでもない。
            <br />
            やるのはこれだけ。
          </p>
          <div className="space-y-0">
            {[
              "似た判断を過去から拾う",
              "当時の制約を復元する",
              "今との違いを指摘する",
              "問いを投げる",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-5 py-4 border-b border-gray-100 last:border-0"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-ruri-500 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-gray-800">{text}</span>
              </div>
            ))}
          </div>
          <p className="mt-12 text-sm text-gray-400">
            これ以上、何も言わせない。
          </p>
        </div>
      </section>

      {/* ===== AIの出力 ===== */}
      <section className="py-24 sm:py-32 px-6 bg-white">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-400 text-sm mb-6">04</p>
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug mb-12">
            AIが返すのは、
            <br />
            この形だけ。
          </h2>
          <div className="bg-[#FAFAF8] border border-gray-200 rounded-xl overflow-hidden">
            {/* あなたはこの時こうでした */}
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <p className="text-xs font-bold text-ruri-600 tracking-wider mb-4">
                あなたはこの時こうでした
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="text-gray-900 font-medium">判断：</span>
                  チームを2人に絞って開発を進めた
                </p>
                <p>
                  <span className="text-gray-900 font-medium">当時の状態：</span>
                  体力△　時間×　心○
                </p>
                <p>
                  <span className="text-gray-900 font-medium">制約：</span>
                  納期まで2週間、予算追加なし
                </p>
              </div>
            </div>
            {/* 今との違い */}
            <div className="p-6 sm:p-8 border-b border-gray-200">
              <p className="text-xs font-bold text-ruri-600 tracking-wider mb-4">
                今との違い
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="text-gray-900 font-medium">
                    変わった前提：
                  </span>
                  チームが4人に増えた
                </p>
                <p>
                  <span className="text-gray-900 font-medium">
                    変わってない前提：
                  </span>
                  納期のプレッシャーは同じ
                </p>
              </div>
            </div>
            {/* 問い */}
            <div className="p-6 sm:p-8 bg-kimi-50/80">
              <p className="text-xs font-bold text-kimi-700 tracking-wider mb-3">
                問い
              </p>
              <p className="text-gray-900 font-bold text-lg">
                今だったら、どう判断しますか？
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== なぜ残すのか ===== */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-400 text-sm mb-6">05</p>
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug mb-8">
            失敗ログほど、
            <br />
            価値が高い。
          </h2>
          <div className="space-y-6 text-gray-500 leading-relaxed">
            <p>
              成功も失敗も残す理由は、反省のためじゃない。
            </p>
            <div className="border-l-2 border-kimi-400 pl-6 py-2">
              <p className="text-lg sm:text-xl font-bold text-gray-900 leading-relaxed">
                「当時の自分は妥当だった」と
                <br />
                未来の自分が理解するため。
              </p>
            </div>
            <p>
              あの時の体力で、あの時の情報で、あの時の制約の中で。
              <br />
              あなたはベストな判断をした。
            </p>
          </div>
        </div>
      </section>

      {/* ===== 変化 ===== */}
      <section className="py-24 sm:py-32 px-6 bg-gray-900 text-white">
        <div className="max-w-xl mx-auto">
          <p className="text-gray-500 text-sm mb-6">06</p>
          <h2 className="text-2xl sm:text-4xl font-bold leading-snug mb-12">
            自分を
            <br />
            「更新対象」として扱える。
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "過去の自分を責めなくなる",
                body: "当時の制約を理解すれば、判断は妥当だったと分かる。",
              },
              {
                title: "同じ状況での判断が速くなる",
                body: "似た判断の記録があるから、迷う時間が減る。",
              },
              {
                title: "「今は違う」と言えるようになる",
                body: "変わった前提を認識できるから、判断を更新できる。",
              },
            ].map((item, i) => (
              <div key={i} className="border-l border-gray-700 pl-6">
                <h3 className="font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-28 sm:py-36 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold leading-snug mb-4">
            いい判断をするためじゃない。
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-kimi-500 mb-12">
            判断を疑える自分でい続けるために。
          </p>
          <Link
            href="/login"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium text-base px-10 py-4 rounded-xl transition-colors"
          >
            判断ログをはじめる
          </Link>
          <p className="mt-6 text-xs text-gray-400">
            Googleアカウントで無料ではじめられます
          </p>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={22} />
            <span className="text-xs font-medium text-gray-400">判断ログ</span>
          </div>
          <p className="text-xs text-gray-300">
            答えを出すのではなく、問いを返す。
          </p>
        </div>
      </footer>
    </div>
  );
}
