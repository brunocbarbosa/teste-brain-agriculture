import { PlantedCropsEnum } from '@/utils/planted-crops-enum'
import { PlantedCrops } from '@/utils/types/planted-crops'
import { RuralProducer } from '@/utils/types/rural-producer'

export interface RuralProducerRepository {
  findById(id: string): Promise<{
    ruralProducer: RuralProducer
    plantedCrops: PlantedCrops[]
  } | null>
  findByCpfOrCnpj(cpfOrCnpj: string): Promise<{
    ruralProducer: RuralProducer
    plantedCrops: PlantedCrops[]
  } | null>
  save(data: RuralProducer, plantedCrops: PlantedCrops[]): Promise<void>
  create(
    data: RuralProducer,
    plantedCrops: PlantedCropsEnum[],
  ): Promise<{
    ruralProducerData: RuralProducer
    plantedCropsData: PlantedCrops[]
  }>
  delete(data: RuralProducer, plantedCrops: PlantedCrops[]): Promise<void>
}
