/*
  Warnings:

  - You are about to drop the column `totalEarnings` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `totalExpenses` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `totalSpent` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Earnings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Earnings" DROP CONSTRAINT "Earnings_userId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "totalEarnings",
DROP COLUMN "totalExpenses",
DROP COLUMN "totalSpent";

-- DropTable
DROP TABLE "Earnings";
