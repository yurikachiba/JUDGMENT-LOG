import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/reflections/:id - 振り返りに回答を追加
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const reflection = await prisma.reflection.update({
      where: { id: params.id },
      data: { answer: body.answer },
    });

    return NextResponse.json(reflection);
  } catch (error) {
    console.error("PATCH /api/reflections/[id] error:", error);
    return NextResponse.json(
      { error: "回答の保存に失敗しました" },
      { status: 500 }
    );
  }
}
