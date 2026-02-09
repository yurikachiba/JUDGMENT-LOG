import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/judgments/:id - 判断詳細
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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
  } catch (error) {
    console.error("GET /api/judgments/[id] error:", error);
    return NextResponse.json(
      { error: "判断の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// PATCH /api/judgments/:id - 判断を更新（タグ追加など）
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const judgment = await prisma.judgment.update({
      where: { id: params.id },
      data: body,
    });

    return NextResponse.json(judgment);
  } catch (error) {
    console.error("PATCH /api/judgments/[id] error:", error);
    return NextResponse.json(
      { error: "判断の更新に失敗しました" },
      { status: 500 }
    );
  }
}

// DELETE /api/judgments/:id - 判断を削除
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.judgment.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/judgments/[id] error:", error);
    return NextResponse.json(
      { error: "判断の削除に失敗しました" },
      { status: 500 }
    );
  }
}
