/*
  Warnings:

  - You are about to drop the column `earnings` on the `User` table. All the data in the column will be lost.
  - Added the required column `flagsId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionsId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `moneySaved` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salary` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "earnings",
ADD COLUMN     "flagsId" TEXT NOT NULL,
ADD COLUMN     "sessionsId" TEXT NOT NULL,
ALTER COLUMN "moneySaved" SET NOT NULL,
ALTER COLUMN "moneySaved" SET DEFAULT 0,
ALTER COLUMN "salary" SET NOT NULL,
ALTER COLUMN "salary" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Earnings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Earnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flags" (
    "id" TEXT NOT NULL,
    "flags" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Flags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_flagsId_fkey" FOREIGN KEY ("flagsId") REFERENCES "Flags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Earnings" ADD CONSTRAINT "Earnings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
