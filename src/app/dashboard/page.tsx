"use client";

import { useState, useEffect, useCallback } from "react";
import { JudgmentForm } from "@/components/JudgmentForm";
import { JudgmentCard } from "@/components/JudgmentCard";
import { JudgmentDetail } from "@/components/JudgmentDetail";

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
  reflections: Array<{
    id: string;
    response: string;
    answer: string;
    createdAt: string;
  }>;
}

export default function Home() {
  const [judgments, setJudgments] = useState<Judgment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">判断の記録</h1>
          <p className="text-sm text-gray-500 mt-1">
            判断を記録し、未来の自分に問いを残す
          </p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? "閉じる" : "記録する"}
        </button>
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
