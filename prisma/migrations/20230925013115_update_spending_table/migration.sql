/*
  Warnings:

  - Added the required column `date` to the `Spending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spending" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
