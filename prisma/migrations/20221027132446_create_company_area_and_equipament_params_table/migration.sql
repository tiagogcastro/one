/*
  Warnings:

  - You are about to drop the column `capacity` on the `equipament` table. All the data in the column will be lost.
  - You are about to drop the column `histerese` on the `equipament` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `equipament` table. All the data in the column will be lost.
  - You are about to drop the column `offset` on the `equipament` table. All the data in the column will be lost.
  - You are about to drop the column `setor` on the `equipament` table. All the data in the column will be lost.
  - Added the required column `companyAreaId` to the `equipament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipament" DROP COLUMN "capacity",
DROP COLUMN "histerese",
DROP COLUMN "name",
DROP COLUMN "offset",
DROP COLUMN "setor",
ADD COLUMN     "companyAreaId" TEXT NOT NULL,
ADD COLUMN     "hardwareId" TEXT;

-- CreateTable
CREATE TABLE "company_area" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "company_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipament_parameters" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "equipamentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "equipament_parameters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "company_area" ADD CONSTRAINT "company_area_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipament" ADD CONSTRAINT "equipament_companyAreaId_fkey" FOREIGN KEY ("companyAreaId") REFERENCES "company_area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipament_parameters" ADD CONSTRAINT "equipament_parameters_equipamentId_fkey" FOREIGN KEY ("equipamentId") REFERENCES "equipament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
