import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { session } from "../../../lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const isSession = await session(req, res);

  if (!isSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const members = await prisma.member.findMany();
  return NextResponse.json(members, { status: 200 });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const isSession = await session(req, res);

  if (!isSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { name, email, roleId, discordid, githubid } = await req.json();
  const newMember = await prisma.member.create({
    data: { name, email, roleId, discordid, githubid },
  });
  return NextResponse.json(newMember, { status: 201 });
}
