/*
  Warnings:

  - You are about to drop the column `sessionsId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sessionsId_fkey";

-- AlterTable
ALTER TABLE "Expenses" ADD COLUMN     "categoriesId" TEXT;

-- AlterTable
ALTER TABLE "Spending" ADD COLUMN     "categoriesId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sessionsId",
ADD COLUMN     "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Sessions";

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Spending" ADD CONSTRAINT "Spending_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
