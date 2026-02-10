"use client";

import { useState } from "react";
import { StateSelector } from "./StateSelector";

interface Props {
  onCreated: () => void;
}

export function JudgmentForm({ onCreated }: Props) {
  const [content, setContent] = useState("");
  const [energy, setEnergy] = useState("mid");
  const [time, setTime] = useState("normal");
  const [mind, setMind] = useState("normal");
  const [premise, setPremise] = useState("");
  const [alternatives, setAlternatives] = useState("");
  const [personaTag, setPersonaTag] = useState("");
  const [tags, setTags] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !premise.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/judgments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          energy,
          time,
          mind,
          premise: premise.trim(),
          alternatives: alternatives.trim(),
          personaTag: personaTag.trim(),
          tags: tags.trim(),
        }),
      });

      if (res.ok) {
        onCreated();
      } else {
        const data = await res.json().catch(() => ({}));
        console.error("判断の記録に失敗しました:", data.error || res.status);
      }
    } catch (error) {
      console.error("判断の記録中にエラーが発生しました:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 判断内容 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          何を判断した？
        </label>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="例：転職のオファーを断った"
          className="input-field"
          required
        />
      </div>

      {/* 状態 3択 */}
      <div className="grid grid-cols-3 gap-4">
        <StateSelector
          label="体力"
          value={energy}
          onChange={setEnergy}
          options={[
            { value: "high", label: "充実", icon: "●" },
            { value: "mid", label: "普通", icon: "◐" },
            { value: "low", label: "低い", icon: "○" },
          ]}
        />
        <StateSelector
          label="時間"
          value={time}
          onChange={setTime}
          options={[
            { value: "plenty", label: "余裕", icon: "●" },
            { value: "normal", label: "普通", icon: "◐" },
            { value: "tight", label: "切迫", icon: "○" },
          ]}
        />
        <StateSelector
          label="心"
          value={mind}
          onChange={setMind}
          options={[
            { value: "clear", label: "明晰", icon: "●" },
            { value: "normal", label: "普通", icon: "◐" },
            { value: "cloudy", label: "曇り", icon: "○" },
          ]}
        />
      </div>

      {/* 前提 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          その時の前提
        </label>
        <textarea
          value={premise}
          onChange={(e) => setPremise(e.target.value)}
          placeholder="例：家族の事情で引っ越しが難しかった"
          rows={2}
          className="textarea-field"
          required
        />
      </div>

      {/* 見送った選択肢 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          見送った選択肢
          <span className="text-gray-400 font-normal ml-1">（任意）</span>
        </label>
        <input
          type="text"
          value={alternatives}
          onChange={(e) => setAlternatives(e.target.value)}
          placeholder="例：受けて引っ越す / 半年後に再挑戦"
          className="input-field"
        />
      </div>

      {/* 人格タグ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          この判断をした自分を一言で
          <span className="text-gray-400 font-normal ml-1">（任意）</span>
        </label>
        <input
          type="text"
          value={personaTag}
          onChange={(e) => setPersonaTag(e.target.value)}
          placeholder="例：余裕はあったが眠気に弱かった"
          className="input-field"
        />
      </div>

      {/* タグ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          タグ
          <span className="text-gray-400 font-normal ml-1">
            （カンマ区切り・任意）
          </span>
        </label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="例：仕事, キャリア, 家族"
          className="input-field"
        />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? "記録中..." : "この判断を記録する"}
      </button>
    </form>
  );
}
