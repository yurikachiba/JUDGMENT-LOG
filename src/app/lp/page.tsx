import Link from "next/link";

function Logo({ size = 40 }: { size?: number }) {
  const iconSize = Math.round(size * 0.55);
  return (
    <div
      className="rounded-2xl bg-kimi-500 flex items-center justify-center shadow-lg shadow-kimi-200"
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-medium tracking-widest text-kimi-600 uppercase mb-4">
      {children}
    </span>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ナビゲーション */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="font-bold text-gray-800 text-lg">判断ログ</span>
          </div>
          <Link
            href="/login"
            className="text-sm font-medium text-kimi-600 hover:text-kimi-700 transition-colors"
          >
            ログイン
          </Link>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <section className="pt-20 pb-16 sm:pt-28 sm:pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Logo size={64} />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            答えは出さない。
            <br />
            <span className="text-kimi-600">問いを返す。</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            判断ログは、成功や失敗を記録するツールではありません。
            <br className="hidden sm:block" />
            あなたの「判断」を記録し、AIが過去の自分を呼び出して、
            <br className="hidden sm:block" />
            未来の自分に問いを返すシステムです。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/login" className="btn-primary text-base px-8 py-3">
              はじめる
            </Link>
            <a
              href="#concept"
              className="btn-secondary text-base px-8 py-3"
            >
              コンセプトを読む
            </a>
          </div>
        </div>
      </section>

      {/* ===== これは「判断ログ」 ===== */}
      <section id="concept" className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Concept</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            成功ログでも、失敗ログでもない。
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              うまくいったか。失敗したか。それは副産物にすぎません。
            </p>
            <p className="text-lg sm:text-xl font-medium text-gray-900">
              主役は常にこれ。
            </p>
            <blockquote className="border-l-4 border-kimi-400 pl-5 py-3 my-6 bg-kimi-50/50 rounded-r-lg">
              <p className="text-gray-800 font-medium leading-relaxed">
                私はこの時、こういう状態で、こう判断した。
              </p>
            </blockquote>
            <p>
              これだけ。成功も失敗も、後からタグで付けるだけ。
              <br />
              最初から評価しない。
            </p>
          </div>
        </div>
      </section>

      {/* ===== 判断の最小単位 ===== */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Structure</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            1つの判断に必要なのは、これだけ。
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "判断したこと",
                desc: "何を決めたか、1行で。",
                icon: (
                  <path
                    d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
                  />
                ),
              },
              {
                label: "その時の状態",
                desc: "体力・時間・心。3つの軸で残す。",
                icon: (
                  <>
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </>
                ),
              },
              {
                label: "その時の前提",
                desc: "判断の根拠になった制約や条件。",
                icon: (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </>
                ),
              },
              {
                label: "見送った選択肢",
                desc: "選ばなかった道があれば。",
                icon: (
                  <>
                    <path d="M18 6L6 18M6 6l12 12" />
                  </>
                ),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-kimi-50 flex items-center justify-center mb-4">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C48A12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.label}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AIの役割 ===== */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>AI&apos;s Role</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            AIは判断しない。
          </h2>
          <p className="text-gray-500 mb-10 leading-relaxed">
            助言も、正解も出しません。AIがやるのは、これだけ。
          </p>
          <div className="space-y-4">
            {[
              "似た判断を過去から拾う",
              "当時の制約を復元する",
              "今との違いを指摘する",
              "問いを投げる",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-[#FAFAF8] rounded-xl p-5"
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-ruri-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-800 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== AIの出力例 ===== */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Output</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            AIが返すのは、この形だけ。
          </h2>
          <div className="bg-white border border-ruri-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-ruri-50 px-6 py-4 border-b border-ruri-100">
              <span className="text-xs font-bold text-ruri-600 tracking-wider">
                REFLECTION
              </span>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-ruri-700 mb-2">
                  あなたはこの時こうでした
                </h4>
                <div className="text-sm text-gray-600 space-y-1 pl-4 border-l-2 border-gray-200">
                  <p>
                    <span className="font-medium text-gray-800">判断：</span>
                    チームを2人に絞って開発を進めた
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      当時の状態：
                    </span>
                    体力△ 時間× 心○
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">制約：</span>
                    納期まで2週間、予算追加なし
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-ruri-700 mb-2">
                  今との違い
                </h4>
                <div className="text-sm text-gray-600 space-y-1 pl-4 border-l-2 border-gray-200">
                  <p>
                    <span className="font-medium text-gray-800">
                      変わった前提：
                    </span>
                    チームが4人に増えた
                  </p>
                  <p>
                    <span className="font-medium text-gray-800">
                      変わってない前提：
                    </span>
                    納期のプレッシャーは同じ
                  </p>
                </div>
              </div>
              <div className="bg-kimi-50 rounded-xl p-5">
                <h4 className="text-sm font-bold text-kimi-700 mb-2">問い</h4>
                <p className="text-gray-800 font-medium">
                  今だったら、どう判断しますか？
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            これ以上、何も言わせない。
          </p>
        </div>
      </section>

      {/* ===== 成功も失敗も残す意味 ===== */}
      <section className="py-16 sm:py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Why</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            失敗ログほど、価値が高い。
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              成功も失敗も残す理由は、反省のためではありません。
            </p>
            <p className="text-lg sm:text-xl font-medium text-gray-900">
              「当時の自分は妥当だった」と
              <br />
              未来の自分が理解するため。
            </p>
            <p>
              あの時の体力で、あの時の情報で、あの時の制約の中で、
              <br className="hidden sm:block" />
              あなたはベストな判断をした。それを記録として残す。
            </p>
          </div>
        </div>
      </section>

      {/* ===== このOSがもたらす変化 ===== */}
      <section className="py-16 sm:py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Changes</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            自分を「更新対象」として扱える。
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "過去の自分を\n責めなくなる",
                desc: "当時の制約を理解すれば、判断は妥当だったと分かる。",
              },
              {
                title: "同じ状況での\n判断が速くなる",
                desc: "似た判断の記録があるから、迷う時間が減る。",
              },
              {
                title: "「今は違う」と\n言えるようになる",
                desc: "変わった前提を認識できるから、判断を更新できる。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              >
                <h3 className="font-bold text-gray-900 mb-3 whitespace-pre-line leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 sm:py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            いい判断をするためじゃない。
            <br />
            <span className="text-kimi-600">
              判断を疑える自分でい続けるために。
            </span>
          </h2>
          <p className="text-gray-500 mb-10">
            答えを返すAIではなく、問いを返すAI。
          </p>
          <Link href="/login" className="btn-primary text-base px-10 py-3.5">
            判断ログをはじめる
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={24} />
            <span className="text-sm font-medium text-gray-500">判断ログ</span>
          </div>
          <p className="text-xs text-gray-400">
            判断を記録し、未来の自分に問いを残す。
          </p>
        </div>
      </footer>
    </div>
  );
}
