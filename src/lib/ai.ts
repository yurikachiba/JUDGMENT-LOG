import Anthropic from "@anthropic-ai/sdk";

function getClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }
  return new Anthropic();
}

interface JudgmentData {
  content: string;
  energy: string;
  time: string;
  mind: string;
  premise: string;
  alternatives: string;
  createdAt: string;
}

interface SimilarJudgment {
  content: string;
  energy: string;
  time: string;
  mind: string;
  premise: string;
  alternatives: string;
  createdAt: string;
}

const STATE_LABELS: Record<string, Record<string, string>> = {
  energy: { high: "充実", mid: "普通", low: "低い" },
  time: { plenty: "余裕あり", normal: "普通", tight: "切迫" },
  mind: { clear: "明晰", normal: "普通", cloudy: "曇り" },
};

function formatState(key: string, value: string): string {
  return STATE_LABELS[key]?.[value] || value;
}

function formatJudgmentContext(j: JudgmentData | SimilarJudgment): string {
  const date = new Date(j.createdAt).toLocaleDateString("ja-JP");
  return [
    `日付: ${date}`,
    `判断: ${j.content}`,
    `体力: ${formatState("energy", j.energy)}`,
    `時間: ${formatState("time", j.time)}`,
    `心: ${formatState("mind", j.mind)}`,
    `前提: ${j.premise}`,
    j.alternatives ? `見送った選択肢: ${j.alternatives}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function generateReflection(
  current: JudgmentData,
  similar: SimilarJudgment[]
): Promise<string> {
  const similarContext =
    similar.length > 0
      ? similar.map((s, i) => `--- 類似判断${i + 1} ---\n${formatJudgmentContext(s)}`).join("\n\n")
      : "（類似する過去の判断はありません）";

  const systemPrompt = `あなたは「判断ログ」の振り返りAIです。

あなたの役割は厳密に以下だけです：
- 過去の類似判断を提示する
- 当時の制約を復元する
- 今との違いを指摘する
- 問いを投げる

絶対に守ること：
- 助言をしない
- 評価をしない
- 答えを出さない
- 問いを返すだけ

出力フォーマットは以下に厳密に従ってください：

【あなたはこの時こうでした】
・判断：（内容）
・当時の状態：体力○○ / 時間○○ / 心○○
・制約：（前提を要約）

【今との違い】
・変わった前提：（あれば）
・変わってない前提：（あれば）

【問い】
今だったら、どう判断しますか？

これ以上のことは一切書かないでください。`;

  const userMessage = `以下の判断について振り返りを生成してください。

--- 対象の判断 ---
${formatJudgmentContext(current)}

--- 過去の類似判断 ---
${similarContext}`;

  const client = getClient();
  const response = await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const block = response.content[0];
  if (block?.type === "text") {
    return block.text;
  }
  return "振り返りを生成できませんでした。";
}
