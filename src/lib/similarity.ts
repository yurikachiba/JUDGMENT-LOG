import { prisma } from "./prisma";

/**
 * 簡易的な類似判断検索
 * キーワードマッチ + 状態の近さでスコアリング
 */
export async function findSimilarJudgments(
  judgmentId: string,
  limit: number = 3
) {
  const target = await prisma.judgment.findUnique({
    where: { id: judgmentId },
  });

  if (!target) return [];

  const allOthers = await prisma.judgment.findMany({
    where: { id: { not: judgmentId } },
    orderBy: { createdAt: "desc" },
  });

  // キーワード抽出（単語分割）
  const targetWords = extractWords(target.content + " " + target.premise);
  const targetTags = target.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const scored = allOthers.map((j) => {
    let score = 0;

    // キーワードマッチ
    const words = extractWords(j.content + " " + j.premise);
    const overlap = targetWords.filter((w) => words.includes(w)).length;
    score += overlap * 3;

    // タグマッチ
    const tags = j.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const tagOverlap = targetTags.filter((t) => tags.includes(t)).length;
    score += tagOverlap * 5;

    // 状態の近さ
    if (j.energy === target.energy) score += 2;
    if (j.time === target.time) score += 2;
    if (j.mind === target.mind) score += 2;

    return { judgment: j, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.judgment);
}

function extractWords(text: string): string[] {
  // 日本語: 2文字以上の連続するひらがな/カタカナ/漢字をトークンとして抽出
  // 英語: スペース区切り
  const jpMatches = text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]{2,}/g) || [];
  const enMatches = text
    .toLowerCase()
    .split(/[\s,。、．.]+/)
    .filter((w) => w.length > 2);
  return [...jpMatches, ...enMatches];
}
