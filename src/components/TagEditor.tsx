"use client";

import { useState } from "react";

interface Props {
  tags: string;
  onUpdate: (tags: string) => void;
}

export function TagEditor({ tags, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState("");

  const tagList = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const addTag = () => {
    if (!input.trim()) return;
    const newTags = [...tagList, input.trim()].join(", ");
    onUpdate(newTags);
    setInput("");
    setEditing(false);
  };

  const removeTag = (tag: string) => {
    const newTags = tagList.filter((t) => t !== tag).join(", ");
    onUpdate(newTags);
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">タグ</h3>
      <div className="flex items-center gap-2 flex-wrap">
        {tagList.map((tag) => (
          <span
            key={tag}
            className={`${
              tag === "成功"
                ? "tag-success"
                : tag === "失敗"
                  ? "tag-fail"
                  : "tag"
            } cursor-pointer group`}
            onClick={() => removeTag(tag)}
            title="クリックで削除"
          >
            {tag}
            <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
              &times;
            </span>
          </span>
        ))}

        {editing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTag();
            }}
            className="flex items-center gap-1"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="タグ名"
              className="text-xs border border-gray-200 rounded px-2 py-1 w-24 focus:outline-none focus:ring-1 focus:ring-kimi-300"
              autoFocus
              onBlur={() => {
                if (!input.trim()) setEditing(false);
              }}
            />
          </form>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-gray-400 hover:text-kimi-500 transition-colors"
          >
            + 追加
          </button>
        )}
      </div>
    </div>
  );
}
