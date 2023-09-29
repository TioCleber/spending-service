/*
  Warnings:

  - You are about to drop the column `institution` on the `Spending` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Spending` table. All the data in the column will be lost.
  - You are about to drop the `Expenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `establishmentsOrServices` to the `Spending` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Earnings" DROP CONSTRAINT "Earnings_userId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_userId_fkey";

-- DropForeignKey
ALTER TABLE "Spending" DROP CONSTRAINT "Spending_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_flagsId_fkey";

-- AlterTable
ALTER TABLE "Spending" DROP COLUMN "institution",
DROP COLUMN "paymentMethod",
ADD COLUMN     "establishmentsOrServices" TEXT NOT NULL;

-- DropTable
DROP TABLE "Expenses";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "moneySaved" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalSpent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalExpenses" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "flagsId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecurringExpenses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "establishmentsOrServices" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3),
    "payday" TEXT,
    "installments" INTEGER,
    "missingInstallments" INTEGER,
    "categoriesId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecurringExpenses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_flagsId_fkey" FOREIGN KEY ("flagsId") REFERENCES "Flags"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Spending" ADD CONSTRAINT "Spending_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpenses" ADD CONSTRAINT "RecurringExpenses_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecurringExpenses" ADD CONSTRAINT "RecurringExpenses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Earnings" ADD CONSTRAINT "Earnings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
