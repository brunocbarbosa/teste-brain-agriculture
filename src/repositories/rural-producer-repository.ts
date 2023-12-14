import { PlantedCrops } from '@/utils/types/planted-crops'
import {
  RuralProducer,
  RuralProducerWithoutPlantedCrops,
} from '@/utils/types/rural-producer'
import { Prisma } from '@prisma/client'

export interface RuralProducerRepository {
  findAllRuralProducer(): Promise<RuralProducerWithoutPlantedCrops[] | null>
  findAllPlantedCrops(): Promise<PlantedCrops[] | null>
  findById(id: string): Promise<RuralProducer | null>
  findByCpfOrCnpj(cpfOrCnpj: string): Promise<RuralProducer | null>
  saveRuralProducer(data: RuralProducerWithoutPlantedCrops): Promise<void>
  savePlantedCrops(data: PlantedCrops[]): Promise<void>
  createRuralProducer(
    data: RuralProducerWithoutPlantedCrops,
  ): Promise<RuralProducerWithoutPlantedCrops>
  createPlantedCrops(data: PlantedCrops[]): Promise<number>
  delete(id: string): Promise<void>
}
