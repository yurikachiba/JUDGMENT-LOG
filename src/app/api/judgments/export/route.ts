import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

// GET /api/judgments/export - 全判断をTXTファイルとしてエクスポート
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const judgments = await prisma.judgment.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: { reflections: { orderBy: { createdAt: "asc" } } },
    });

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

    const text = lines.join("\n");
    const today = new Date().toISOString().slice(0, 10);
    const filename = `judgment-log_${today}.txt`;

    return new NextResponse(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("GET /api/judgments/export error:", error);
    return NextResponse.json(
      { error: "エクスポートに失敗しました" },
      { status: 500 }
    );
  }
}
