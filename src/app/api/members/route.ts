import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

async function handler(req: NextRequest, res: NextResponse) {
  if (req.method === "GET") {
    const members = await prisma.member.findMany();
    return NextResponse.json(members, { status: 200 });
  } else if (req.method === "POST") {
    const { name, email, roleId, discordid } = await req.json();
    const newMember = await prisma.member.create({
      data: { name, email, roleId, discordid },
    });
    return NextResponse.json(newMember, { status: 201 });
  } else {
    res.headers.set("Allow", "GET, POST");
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }
}

export { handler as POST, handler as GET };
