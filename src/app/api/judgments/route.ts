import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/judgments - 判断一覧
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");

  let where = {};
  if (tag) {
    where = { tags: { contains: tag } };
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
}

// POST /api/judgments - 新規判断を記録
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { content, energy, time, mind, premise, alternatives, tags } = body;

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
      tags: tags || "",
    },
  });

  return NextResponse.json(judgment, { status: 201 });
}
