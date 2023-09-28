/*
  Warnings:

  - Made the column `moneySaved` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `salary` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalExpenses` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `totalSpent` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "moneySaved" SET NOT NULL,
ALTER COLUMN "moneySaved" SET DEFAULT 0,
ALTER COLUMN "salary" SET NOT NULL,
ALTER COLUMN "salary" SET DEFAULT 0,
ALTER COLUMN "totalExpenses" SET NOT NULL,
ALTER COLUMN "totalExpenses" SET DEFAULT 0,
ALTER COLUMN "totalSpent" SET NOT NULL,
ALTER COLUMN "totalSpent" SET DEFAULT 0;
