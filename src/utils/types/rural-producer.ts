import { PlantedCropsEnum } from '../planted-crops-enum'

export type RuralProducer = {
  id?: string
  cpfOrCnpj: string
  producerName: string
  farmName: string
  city: string
  state: string
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
  plantedCrops: PlantedCropsEnum[]
}
