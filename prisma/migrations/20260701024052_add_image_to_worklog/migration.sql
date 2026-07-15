/*
  Warnings:

  - Added the required column `unit` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "unit" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SaleRecord" ADD COLUMN     "saleChannel" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "WorkLog" ADD COLUMN     "image" TEXT;
