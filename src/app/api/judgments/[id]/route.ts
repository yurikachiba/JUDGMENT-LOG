import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/judgments/:id - 判断詳細
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const judgment = await prisma.judgment.findUnique({
    where: { id: params.id },
    include: {
      reflections: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!judgment) {
    return NextResponse.json(
      { error: "判断が見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(judgment);
}

// PATCH /api/judgments/:id - 判断を更新（タグ追加など）
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const judgment = await prisma.judgment.update({
    where: { id: params.id },
    data: body,
  });

  return NextResponse.json(judgment);
}

// DELETE /api/judgments/:id - 判断を削除
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.judgment.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
