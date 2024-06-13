import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const members = await prisma.member.findMany();
  return NextResponse.json(members, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { name, email, roleId, discordid, githubid } = await req.json();
  const newMember = await prisma.member.create({
    data: { name, email, roleId, discordid, githubid },
  });
  return NextResponse.json(newMember, { status: 201 });
}
