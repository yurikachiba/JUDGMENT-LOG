import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/judgments - 判断一覧
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const tag = searchParams.get("tag");
    const search = searchParams.get("search");

    let where: Prisma.JudgmentWhereInput = { userId: session.user.id };
    if (tag) {
      where = { ...where, tags: { contains: tag } };
    }
    if (search) {
      where = {
        ...where,
        OR: [
          { content: { contains: search } },
          { premise: { contains: search } },
        ],
      };
    }

    const judgments = await prisma.judgment.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { reflections: { orderBy: { createdAt: "desc" }, take: 1 } },
    });

    return NextResponse.json(judgments);
  } catch (error) {
    console.error("GET /api/judgments error:", error);
    return NextResponse.json(
      { error: "判断一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// POST /api/judgments - 新規判断を記録
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const body = await req.json();

    const { content, energy, time, mind, premise, alternatives, personaTag, tags } = body;

    if (!content || !energy || !time || !mind || !premise) {
      return NextResponse.json(
        { error: "必須項目が不足しています" },
        { status: 400 }
      );
    }

    const judgment = await prisma.judgment.create({
      data: {
        content,
        energy,
        time,
        mind,
        premise,
        alternatives: alternatives || "",
        personaTag: personaTag || "",
        tags: tags || "",
        userId: session.user.id,
      },
    });

    return NextResponse.json(judgment, { status: 201 });
  } catch (error) {
    console.error("POST /api/judgments error:", error);
    return NextResponse.json(
      { error: "判断の記録に失敗しました" },
      { status: 500 }
    );
  }
}
