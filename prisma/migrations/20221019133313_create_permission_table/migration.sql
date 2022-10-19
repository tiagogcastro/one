/*
  Warnings:

  - You are about to drop the column `permission_id` on the `user_permission` table. All the data in the column will be lost.
  - Added the required column `permissionId` to the `user_permission` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_permission_permission_id_key";

-- AlterTable
ALTER TABLE "user_permission" DROP COLUMN "permission_id",
ADD COLUMN     "permissionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "permission" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permission" TEXT NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "permission_permission_key" ON "permission"("permission");

-- AddForeignKey
ALTER TABLE "user_permission" ADD CONSTRAINT "user_permission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
