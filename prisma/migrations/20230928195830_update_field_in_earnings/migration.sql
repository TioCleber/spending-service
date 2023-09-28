/*
  Warnings:

  - Changed the type of `value` on the `Earnings` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Earnings" DROP COLUMN "value",
ADD COLUMN     "value" DOUBLE PRECISION NOT NULL;
