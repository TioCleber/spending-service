-- AlterTable
ALTER TABLE "User" ADD COLUMN     "totalExpenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalSpent" DOUBLE PRECISION NOT NULL DEFAULT 0;
