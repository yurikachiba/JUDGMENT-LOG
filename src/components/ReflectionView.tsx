"use client";

import { useState } from "react";

interface Reflection {
  id: string;
  response: string;
  answer: string;
  createdAt: string;
}

interface Props {
  reflection: Reflection;
}

export function ReflectionView({ reflection }: Props) {
  const [answer, setAnswer] = useState(reflection.answer);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const date = new Date(reflection.createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const saveAnswer = async () => {
    setSaving(true);
    try {
      await fetch(`/api/reflections/${reflection.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  // AIの応答をセクションごとに分割して表示
  const sections = parseReflectionSections(reflection.response);

  return (
    <div className="reflection-card">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-ruri-400">{date}</span>
      </div>

      {/* AIの応答 */}
      <div className="space-y-4">
        {sections.map((section, i) => (
          <div key={i}>
            {section.title && (
              <h3 className="text-ruri-700 font-bold text-sm mb-1">
                {section.title}
              </h3>
            )}
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {section.body}
            </div>
          </div>
        ))}
      </div>

      {/* ユーザーの回答 */}
      <div className="mt-5 pt-4 border-t border-ruri-100">
        <h4 className="text-sm font-medium text-ruri-600 mb-2">あなたの回答</h4>
        {editing ? (
          <div className="space-y-2">
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={3}
              className="textarea-field text-sm"
              placeholder="今のあなたの判断を書いてみてください..."
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={saveAnswer}
                disabled={saving}
                className="btn-accent text-sm px-4 py-1.5"
              >
                {saving ? "保存中..." : "保存"}
              </button>
              <button
                onClick={() => {
                  setAnswer(reflection.answer);
                  setEditing(false);
                }}
                className="btn-secondary text-sm px-4 py-1.5"
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : answer ? (
          <div
            className="text-sm text-gray-700 cursor-pointer hover:bg-ruri-100/50 rounded-lg p-2 -mx-2 transition-colors"
            onClick={() => setEditing(true)}
          >
            {answer}
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-ruri-400 hover:text-ruri-600 transition-colors"
          >
            問いに答える...
          </button>
        )}
      </div>
    </div>
  );
}

function parseReflectionSections(
  text: string
): Array<{ title: string; body: string }> {
  const sections: Array<{ title: string; body: string }> = [];
  const lines = text.split("\n");

  let currentTitle = "";
  let currentBody: string[] = [];

  for (const line of lines) {
    const titleMatch = line.match(/^【(.+?)】$/);
    if (titleMatch) {
      if (currentTitle || currentBody.length > 0) {
        sections.push({
          title: currentTitle,
          body: currentBody.join("\n").trim(),
        });
      }
      currentTitle = titleMatch[1];
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  if (currentTitle || currentBody.length > 0) {
    sections.push({
      title: currentTitle,
      body: currentBody.join("\n").trim(),
    });
  }

  return sections.filter((s) => s.body.length > 0);
}
