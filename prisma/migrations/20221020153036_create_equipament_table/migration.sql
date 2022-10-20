-- CreateTable
CREATE TABLE "equipament" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "setor" TEXT,
    "offset" DECIMAL(65,30),
    "histerese" DECIMAL(65,30),
    "capacity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "equipament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "equipament" ADD CONSTRAINT "equipament_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
