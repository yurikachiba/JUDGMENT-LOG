import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/reflections/:id - 振り返りに回答を追加
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const reflection = await prisma.reflection.update({
    where: { id: params.id },
    data: { answer: body.answer },
  });

  return NextResponse.json(reflection);
}
