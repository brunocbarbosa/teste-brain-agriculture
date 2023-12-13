-- CreateTable
CREATE TABLE "RuralProducer" (
    "id" TEXT NOT NULL,
    "cpfOrCnpj" TEXT NOT NULL,
    "producerName" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "totalArea" TEXT NOT NULL,
    "agriculturalArea" TEXT NOT NULL,
    "vegetationArea" TEXT NOT NULL,

    CONSTRAINT "RuralProducer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlantedCrops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ruralProducerId" TEXT NOT NULL,

    CONSTRAINT "PlantedCrops_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlantedCrops" ADD CONSTRAINT "PlantedCrops_ruralProducerId_fkey" FOREIGN KEY ("ruralProducerId") REFERENCES "RuralProducer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
