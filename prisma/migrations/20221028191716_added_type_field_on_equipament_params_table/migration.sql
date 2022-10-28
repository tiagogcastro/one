/*
  Warnings:

  - Added the required column `type` to the `equipament_parameters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipament_parameters" ADD COLUMN     "type" TEXT NOT NULL;
