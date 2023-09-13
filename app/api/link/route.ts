import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import randomstring from "randomstring";

const prisma = new PrismaClient();

export async function POST(request: Request, response: Response) {
  const data = await request.json();
  const { url } = data;
  const shortenedUrl = randomstring.generate(6);
  const link = await prisma.link.create({
    data: {
      link: url,
      shortenedLink: shortenedUrl,
    },
  });
  return NextResponse.json({ link: shortenedUrl });
}
