"use client";

import { useState } from "react";
import { TagEditor } from "./TagEditor";
import { ReflectionView } from "./ReflectionView";

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
  reflections: Reflection[];
}

interface Props {
  judgment: Judgment;
  onBack: () => void;
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

export function JudgmentDetail({ judgment, onBack }: Props) {
  const [reflecting, setReflecting] = useState(false);
  const [reflectError, setReflectError] = useState<string | null>(null);
  const [reflections, setReflections] = useState<Reflection[]>(
    judgment.reflections
  );
  const [tags, setTags] = useState(judgment.tags);

  const date = new Date(judgment.createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  const handleReflect = async () => {
    setReflecting(true);
    setReflectError(null);
    try {
      const res = await fetch(`/api/judgments/${judgment.id}/reflect`, {
        method: "POST",
      });
      if (res.ok) {
        const reflection = await res.json();
        setReflections([reflection, ...reflections]);
      } else {
        const data = await res.json().catch(() => null);
        const message = data?.error || "振り返りの生成に失敗しました";
        setReflectError(message);
      }
    } catch (error) {
      console.error("振り返りの生成中にエラーが発生しました:", error);
      setReflectError("ネットワークエラーが発生しました。接続を確認してください");
    } finally {
      setReflecting(false);
    }
  };

  const handleTagsUpdate = async (newTags: string) => {
    setTags(newTags);
    try {
      await fetch(`/api/judgments/${judgment.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tags: newTags }),
      });
    } catch (error) {
      console.error("タグの更新中にエラーが発生しました:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* 戻るボタン */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
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
          <path d="m15 18-6-6 6-6" />
        </svg>
        一覧に戻る
      </button>

      {/* 判断内容 */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-400">{date}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {judgment.content}
        </h2>

        {/* 状態 */}
        <div className="flex gap-4 mb-4">
          <div className="state-badge bg-kimi-50 text-kimi-700">
            体力: {STATE_LABELS[judgment.energy]}
          </div>
          <div className="state-badge bg-kimi-50 text-kimi-700">
            時間: {STATE_LABELS[judgment.time]}
          </div>
          <div className="state-badge bg-kimi-50 text-kimi-700">
            心: {STATE_LABELS[judgment.mind]}
          </div>
        </div>

        {/* 前提 */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-1">前提</h3>
          <p className="text-gray-800">{judgment.premise}</p>
        </div>

        {/* 見送った選択肢 */}
        {judgment.alternatives && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              見送った選択肢
            </h3>
            <p className="text-gray-800">{judgment.alternatives}</p>
          </div>
        )}

        {/* 人格タグ */}
        {judgment.personaTag && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              この判断をした自分
            </h3>
            <p className="text-gray-800 italic">— {judgment.personaTag}</p>
          </div>
        )}

        {/* タグ */}
        <TagEditor tags={tags} onUpdate={handleTagsUpdate} />
      </div>

      {/* エラー表示 */}
      {reflectError && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {reflectError}
        </div>
      )}

      {/* 振り返りボタン */}
      <button
        onClick={handleReflect}
        disabled={reflecting}
        className="btn-accent w-full flex items-center justify-center gap-2"
      >
        {reflecting ? (
          <>
            <span className="animate-pulse">振り返りを生成中...</span>
          </>
        ) : (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            この判断を振り返る
          </>
        )}
      </button>

      {/* 振り返り一覧 */}
      {reflections.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-500">振り返り</h3>
          {reflections.map((r) => (
            <ReflectionView key={r.id} reflection={r} />
          ))}
        </div>
      )}
    </div>
  );
}
