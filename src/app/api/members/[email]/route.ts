import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  res: NextResponse,
  { params }: { params: { email: string } }
) {
  await prisma.member.delete({
    where: { email: params.email },
  });
  return NextResponse.json(`${params.email} deleted`, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const { name, email, roleId, discordid, githubid } = await req.json();
  const updatedMember = await prisma.member.update({
    where: { email: params.email },
    data: { name, roleId, discordid, githubid },
  });
  return NextResponse.json(updatedMember, { status: 200 });
}
