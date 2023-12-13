/*
  Warnings:

  - You are about to drop the column `agriculturalArea` on the `RuralProducer` table. All the data in the column will be lost.
  - You are about to drop the column `cpfOrCnpj` on the `RuralProducer` table. All the data in the column will be lost.
  - You are about to drop the column `farmName` on the `RuralProducer` table. All the data in the column will be lost.
  - You are about to drop the column `producerName` on the `RuralProducer` table. All the data in the column will be lost.
  - You are about to drop the column `totalArea` on the `RuralProducer` table. All the data in the column will be lost.
  - You are about to drop the column `vegetationArea` on the `RuralProducer` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf_or_cnpj]` on the table `RuralProducer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agricultural_area` to the `RuralProducer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf_or_cnpj` to the `RuralProducer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farm_name` to the `RuralProducer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `producer_name` to the `RuralProducer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_area` to the `RuralProducer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vegetation_area` to the `RuralProducer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RuralProducer_cpfOrCnpj_key";

-- AlterTable
ALTER TABLE "RuralProducer" DROP COLUMN "agriculturalArea",
DROP COLUMN "cpfOrCnpj",
DROP COLUMN "farmName",
DROP COLUMN "producerName",
DROP COLUMN "totalArea",
DROP COLUMN "vegetationArea",
ADD COLUMN     "agricultural_area" TEXT NOT NULL,
ADD COLUMN     "cpf_or_cnpj" TEXT NOT NULL,
ADD COLUMN     "farm_name" TEXT NOT NULL,
ADD COLUMN     "producer_name" TEXT NOT NULL,
ADD COLUMN     "total_area" TEXT NOT NULL,
ADD COLUMN     "vegetation_area" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducer_cpf_or_cnpj_key" ON "RuralProducer"("cpf_or_cnpj");
