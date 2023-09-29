/*
  Warnings:

  - You are about to drop the column `institution` on the `Earnings` table. All the data in the column will be lost.
  - Added the required column `establishmentsOrServices` to the `Earnings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Earnings" DROP COLUMN "institution",
ADD COLUMN     "establishmentsOrServices" TEXT NOT NULL;
