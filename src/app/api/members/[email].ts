import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;

  if (req.method === "PUT") {
    const { name, roleId, discordid } = req.body;
    console.log(name, roleId, discordid);
    const updatedMember = await prisma.member.update({
      where: { email: String(email) },
      data: { name, roleId, discordid },
    });
    res.status(200).json(updatedMember);
  } else if (req.method === "DELETE") {
    await prisma.member.delete({
      where: { email: String(email) },
    });
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export { handler as PUT, handler as DELETE };
