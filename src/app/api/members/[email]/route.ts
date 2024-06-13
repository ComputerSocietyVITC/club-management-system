import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { session } from "@/lib/auth";

const prisma = new PrismaClient();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const isSession = await session(req, {} as NextResponse);

  if (!isSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await prisma.member.delete({
    where: { email: params.email },
  });
  return NextResponse.json(`${params.email} deleted`, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const isSession = await session(req, {} as NextResponse);

  if (!isSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { name, email, roleId, discordid, githubid } = await req.json();
  const updatedMember = await prisma.member.update({
    where: { email: params.email },
    data: { name, roleId, discordid, githubid },
  });
  return NextResponse.json(updatedMember, { status: 200 });
}
