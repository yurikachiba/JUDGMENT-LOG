import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { findSimilarJudgments } from "@/lib/similarity";
import { generateReflection } from "@/lib/ai";

// POST /api/judgments/:id/reflect - AIに振り返りを依頼
export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const judgment = await prisma.judgment.findUnique({
      where: { id: params.id },
    });

    if (!judgment || judgment.userId !== session.user.id) {
      return NextResponse.json(
        { error: "判断が見つかりません" },
        { status: 404 }
      );
    }

    // 類似判断を検索
    const similar = await findSimilarJudgments(params.id, 3);

    // AI振り返り生成
    const response = await generateReflection(
      {
        content: judgment.content,
        energy: judgment.energy,
        time: judgment.time,
        mind: judgment.mind,
        premise: judgment.premise,
        alternatives: judgment.alternatives,
        createdAt: judgment.createdAt.toISOString(),
      },
      similar.map((s) => ({
        content: s.content,
        energy: s.energy,
        time: s.time,
        mind: s.mind,
        premise: s.premise,
        alternatives: s.alternatives,
        createdAt: s.createdAt.toISOString(),
      }))
    );

    // 振り返りを保存
    const reflection = await prisma.reflection.create({
      data: {
        judgmentId: params.id,
        response,
      },
    });

    return NextResponse.json(reflection, { status: 201 });
  } catch (error) {
    console.error("POST /api/judgments/[id]/reflect error:", error);
    return NextResponse.json(
      { error: "振り返りの生成に失敗しました" },
      { status: 500 }
    );
  }
}
