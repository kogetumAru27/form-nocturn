/*
  Warnings:

  - Added the required column `unitPrice` to the `SaleRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleRecord" ADD COLUMN     "unitPrice" INTEGER NOT NULL;
