/*
  Warnings:

  - Added the required column `paymentMethod` to the `Spending` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Spending" ADD COLUMN     "paymentMethod" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "earnings" DOUBLE PRECISION,
ADD COLUMN     "moneySaved" DOUBLE PRECISION,
ADD COLUMN     "salary" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
