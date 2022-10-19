/*
  Warnings:

  - Added the required column `companyId` to the `user_company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_company" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user_company" ADD CONSTRAINT "user_company_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
