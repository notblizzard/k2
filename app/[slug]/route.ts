import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import randomstring from "randomstring";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const url = request.nextUrl.pathname.split("/")[1];
  const link = await prisma.link.findFirst({
    where: {
      shortenedLink: url,
    },
  });
  if (!link) {
    return NextResponse.next();
  }
  return NextResponse.redirect(link.link);
}
