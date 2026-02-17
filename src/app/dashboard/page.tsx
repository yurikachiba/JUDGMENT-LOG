"use client";

import { useState, useEffect, useCallback } from "react";
import { JudgmentForm } from "@/components/JudgmentForm";
import { JudgmentCard } from "@/components/JudgmentCard";
import { JudgmentDetail } from "@/components/JudgmentDetail";

interface Reflection {
  id: string;
  response: string;
  answer: string;
  createdAt: string;
}

interface Judgment {
  id: string;
  content: string;
  energy: string;
  time: string;
  mind: string;
  premise: string;
  alternatives: string;
  personaTag: string;
  tags: string;
  createdAt: string;
  updatedAt: string;
  reflections: Reflection[];
}

const STATE_LABELS: Record<string, string> = {
  high: "充実",
  mid: "普通",
  low: "低い",
  plenty: "余裕あり",
  normal: "普通",
  tight: "切迫",
  clear: "明晰",
  cloudy: "曇り",
};

function formatJudgmentsAsText(judgments: Judgment[]): string {
  const lines: string[] = [];
  lines.push(`判断ログ（全${judgments.length}件）`);
  lines.push("=".repeat(40));

  for (const j of judgments) {
    lines.push("");
    const date = new Date(j.createdAt).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
    lines.push(`--- ${date} ---`);
    lines.push(`【判断】${j.content}`);
    lines.push(
      `【体力】${STATE_LABELS[j.energy] ?? j.energy}　【時間】${STATE_LABELS[j.time] ?? j.time}　【心】${STATE_LABELS[j.mind] ?? j.mind}`
    );
    lines.push(`【前提】${j.premise}`);
    if (j.alternatives) {
      lines.push(`【見送った選択肢】${j.alternatives}`);
    }
    if (j.personaTag) {
      lines.push(`【この判断をした自分】${j.personaTag}`);
    }
    if (j.tags) {
      lines.push(`【タグ】${j.tags}`);
    }

    for (const r of j.reflections) {
      const rDate = new Date(r.createdAt).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      lines.push("");
      lines.push(`  ▶ 振り返り（${rDate}）`);
      for (const line of r.response.split("\n")) {
        lines.push(`  ${line}`);
      }
      if (r.answer) {
        lines.push("");
        lines.push(`  ✏ あなたの回答: ${r.answer}`);
      }
    }
  }

  lines.push("");
  lines.push("=".repeat(40));
  return lines.join("\n");
}

export default function Home() {
  const [judgments, setJudgments] = useState<Judgment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );
  const [exportStatus, setExportStatus] = useState<
    "idle" | "exporting" | "error"
  >("idle");

  const fetchJudgments = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      const res = await fetch(`/api/judgments?${params}`);
      if (!res.ok) {
        console.error("判断一覧の取得に失敗しました:", res.status);
        setJudgments([]);
        return;
      }
      const data = await res.json();
      setJudgments(data);
    } catch (error) {
      console.error("判断一覧の取得中にエラーが発生しました:", error);
      setJudgments([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchJudgments();
  }, [fetchJudgments]);

  const handleCreated = () => {
    setShowForm(false);
    fetchJudgments();
  };

  const handleCopyAll = async () => {
    try {
      const text = formatJudgmentsAsText(judgments);
      await navigator.clipboard.writeText(text);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const handleExportTxt = async () => {
    setExportStatus("exporting");
    try {
      const res = await fetch("/api/judgments/export");
      if (!res.ok) throw new Error("export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        res.headers
          .get("Content-Disposition")
          ?.match(/filename="(.+)"/)?.[1] ?? "judgment-log.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportStatus("idle");
    } catch {
      setExportStatus("error");
      setTimeout(() => setExportStatus("idle"), 2000);
    }
  };

  const selectedJudgment = judgments.find((j) => j.id === selectedId);

  if (selectedJudgment) {
    return (
      <JudgmentDetail
        judgment={selectedJudgment}
        onBack={() => {
          setSelectedId(null);
          fetchJudgments();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダーエリア */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">判断の記録</h1>
          <p className="text-sm text-gray-500 mt-1">
            判断を記録し、未来の自分に問いを残す
          </p>
        </div>
        <div className="flex items-center gap-2">
          {judgments.length > 0 && (
            <>
              <button
                onClick={handleExportTxt}
                disabled={exportStatus === "exporting"}
                className="btn-secondary flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-sm"
                title="全判断をTXTファイルとしてダウンロード"
              >
                {exportStatus === "exporting" ? (
                  "エクスポート中..."
                ) : exportStatus === "error" ? (
                  "失敗"
                ) : (
                  <>
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    TXT出力
                  </>
                )}
              </button>
              <button
                onClick={handleCopyAll}
                className="btn-secondary flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-sm"
                title="全判断をクリップボードにコピー"
              >
                {copyStatus === "copied" ? (
                  <>
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
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    コピー済み
                  </>
                ) : copyStatus === "error" ? (
                  "失敗"
                ) : (
                  <>
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
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                    全コピー
                  </>
                )}
              </button>
            </>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex-1 sm:flex-none text-center"
          >
            {showForm ? "閉じる" : "記録する"}
          </button>
        </div>
      </div>

      {/* 入力フォーム */}
      {showForm && (
        <div className="card">
          <JudgmentForm onCreated={handleCreated} />
        </div>
      )}

      {/* 検索 */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="判断を検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* 判断一覧 */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">読み込み中...</div>
      ) : judgments.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-kimi-50 flex items-center justify-center mx-auto mb-4">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E8A317"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">まだ判断がありません</p>
          <p className="text-gray-400 text-sm mt-1">
            最初の判断を記録しましょう
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {judgments.map((j) => (
            <JudgmentCard
              key={j.id}
              judgment={j}
              onClick={() => setSelectedId(j.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
