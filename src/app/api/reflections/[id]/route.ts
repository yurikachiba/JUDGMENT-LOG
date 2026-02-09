import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// PATCH /api/reflections/:id - 振り返りに回答を追加
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    // 振り返りの所有権を確認
    const reflection = await prisma.reflection.findUnique({
      where: { id: params.id },
      include: { judgment: { select: { userId: true } } },
    });

    if (!reflection || reflection.judgment.userId !== session.user.id) {
      return NextResponse.json(
        { error: "振り返りが見つかりません" },
        { status: 404 }
      );
    }

    const body = await req.json();

    const updated = await prisma.reflection.update({
      where: { id: params.id },
      data: { answer: body.answer },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/reflections/[id] error:", error);
    return NextResponse.json(
      { error: "回答の保存に失敗しました" },
      { status: 500 }
    );
  }
}
