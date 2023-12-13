/*
  Warnings:

  - You are about to drop the column `ruralProducerId` on the `PlantedCrops` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpfOrCnpj]` on the table `RuralProducer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rural_producer_id` to the `PlantedCrops` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `PlantedCrops` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PlantedCropsEnum" AS ENUM ('SOJA', 'MILHO', 'ALGODAO', 'CAFE', 'CANA_DE_ACUCAR');

-- DropForeignKey
ALTER TABLE "PlantedCrops" DROP CONSTRAINT "PlantedCrops_ruralProducerId_fkey";

-- AlterTable
ALTER TABLE "PlantedCrops" DROP COLUMN "ruralProducerId",
ADD COLUMN     "rural_producer_id" TEXT NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" "PlantedCropsEnum" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RuralProducer_cpfOrCnpj_key" ON "RuralProducer"("cpfOrCnpj");

-- AddForeignKey
ALTER TABLE "PlantedCrops" ADD CONSTRAINT "PlantedCrops_rural_producer_id_fkey" FOREIGN KEY ("rural_producer_id") REFERENCES "RuralProducer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
