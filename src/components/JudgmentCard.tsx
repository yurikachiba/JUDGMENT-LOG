"use client";

interface Judgment {
  id: string;
  content: string;
  energy: string;
  time: string;
  mind: string;
  premise: string;
  personaTag: string;
  tags: string;
  createdAt: string;
  reflections: Array<{ id: string }>;
}

interface Props {
  judgment: Judgment;
  onClick: () => void;
}

const STATE_ICONS: Record<string, string> = {
  high: "●",
  mid: "◐",
  low: "○",
  plenty: "●",
  normal: "◐",
  tight: "○",
  clear: "●",
  cloudy: "○",
};

export function JudgmentCard({ judgment, onClick }: Props) {
  const date = new Date(judgment.createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const tags = judgment.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const hasReflection = judgment.reflections.length > 0;

  return (
    <button
      onClick={onClick}
      className="card w-full text-left group cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 group-hover:text-kimi-600 transition-colors">
            {judgment.content}
          </p>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            {judgment.premise}
          </p>
          {judgment.personaTag && (
            <p className="text-xs text-kimi-500 mt-1 italic">
              — {judgment.personaTag}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {/* 状態インジケーター */}
          <div className="flex items-center gap-0.5 text-xs text-gray-400" title="体力・時間・心">
            <span>{STATE_ICONS[judgment.energy]}</span>
            <span>{STATE_ICONS[judgment.time]}</span>
            <span>{STATE_ICONS[judgment.mind]}</span>
          </div>
          {hasReflection && (
            <div
              className="w-2 h-2 rounded-full bg-ruri-400"
              title="振り返り済み"
            />
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <span className="text-xs text-gray-400">{date}</span>
        {tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className={
                  tag === "成功"
                    ? "tag-success"
                    : tag === "失敗"
                      ? "tag-fail"
                      : "tag"
                }
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
