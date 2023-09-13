-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "shortenedLink" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
