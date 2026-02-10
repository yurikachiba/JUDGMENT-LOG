import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { findSimilarJudgments } from "@/lib/similarity";
import { generateReflection } from "@/lib/ai";

// Vercel Serverless Function のタイムアウトを延長（AI応答に時間がかかるため）
export const maxDuration = 60;

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
    const similar = await findSimilarJudgments(params.id, 3, session.user.id);

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

    const message =
      error instanceof Error ? error.message : String(error);

    if (message.includes("ANTHROPIC_API_KEY")) {
      return NextResponse.json(
        { error: "AI サービスが設定されていません" },
        { status: 503 }
      );
    }

    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "AI サービスの認証に失敗しました。API キーを確認してください" },
        { status: 503 }
      );
    }

    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "AI サービスのリクエスト制限に達しました。しばらく待ってから再試行してください" },
        { status: 429 }
      );
    }

    if (error instanceof Anthropic.NotFoundError) {
      return NextResponse.json(
        { error: "AI モデルが見つかりません" },
        { status: 503 }
      );
    }

    if (error instanceof Anthropic.BadRequestError) {
      console.error("Anthropic BadRequestError details:", error.message);
      if (error.message.includes("credit balance is too low")) {
        return NextResponse.json(
          { error: "AI サービスの利用枠が不足しています。管理者にお問い合わせください" },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { error: "AI サービスへのリクエストでエラーが発生しました" },
        { status: 400 }
      );
    }

    if (error instanceof Anthropic.APIError) {
      console.error("Anthropic APIError details:", error.status, error.message);
      return NextResponse.json(
        { error: `AI サービスでエラーが発生しました (${error.status}): ${error.message}` },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { error: "振り返りの生成に失敗しました" },
      { status: 500 }
    );
  }
}
