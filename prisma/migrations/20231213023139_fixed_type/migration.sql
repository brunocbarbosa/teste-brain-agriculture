/*
  Warnings:

  - Changed the type of `agricultural_area` on the `RuralProducer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `total_area` on the `RuralProducer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vegetation_area` on the `RuralProducer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RuralProducer" DROP COLUMN "agricultural_area",
ADD COLUMN     "agricultural_area" DOUBLE PRECISION NOT NULL,
DROP COLUMN "total_area",
ADD COLUMN     "total_area" DOUBLE PRECISION NOT NULL,
DROP COLUMN "vegetation_area",
ADD COLUMN     "vegetation_area" DOUBLE PRECISION NOT NULL;
