-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('SEEDING', 'TRANSPLANT', 'WATERING', 'FERTILIZING', 'WEEDING', 'PESTICIDE', 'HARVESTING', 'OTHER');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('WEATHER', 'PEST', 'TEMPERATURE', 'OTHER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkLog" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workType" "WorkType" NOT NULL,
    "note" TEXT,
    "weather" TEXT,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "duration" INTEGER,
    "cropId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "cropId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleRecord" (
    "id" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "totalQuantity" INTEGER NOT NULL,
    "cropId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaleRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "message" TEXT NOT NULL,
    "isNotified" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleRecord" ADD CONSTRAINT "SaleRecord_cropId_fkey" FOREIGN KEY ("cropId") REFERENCES "Crop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
