-- DropForeignKey
ALTER TABLE "company_area" DROP CONSTRAINT "company_area_companyId_fkey";

-- DropForeignKey
ALTER TABLE "equipament" DROP CONSTRAINT "equipament_companyAreaId_fkey";

-- DropForeignKey
ALTER TABLE "equipament" DROP CONSTRAINT "equipament_companyId_fkey";

-- DropForeignKey
ALTER TABLE "equipament_parameters" DROP CONSTRAINT "equipament_parameters_equipamentId_fkey";

-- AddForeignKey
ALTER TABLE "company_area" ADD CONSTRAINT "company_area_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipament" ADD CONSTRAINT "equipament_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipament" ADD CONSTRAINT "equipament_companyAreaId_fkey" FOREIGN KEY ("companyAreaId") REFERENCES "company_area"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipament_parameters" ADD CONSTRAINT "equipament_parameters_equipamentId_fkey" FOREIGN KEY ("equipamentId") REFERENCES "equipament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
