/*
  Warnings:

  - You are about to drop the column `instituition` on the `Spending` table. All the data in the column will be lost.
  - Added the required column `institution` to the `Spending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spending" DROP COLUMN "instituition",
ADD COLUMN     "institution" TEXT NOT NULL;
