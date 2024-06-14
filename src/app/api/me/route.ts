"use server";

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { session } from "../../../lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  const isSession = await session(req, res);

  if (!isSession) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const me = await prisma.member.findUnique({
    where: {
      email: isSession.user?.email ?? undefined,
    },
  });
  return NextResponse.json(me, { status: 200 });
}
