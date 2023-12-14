import { PlantedCropsEnum } from '../planted-crops-enum'

export type PlantedCrops = {
  id?: string
  rural_producer_id: string
  name: PlantedCropsEnum
}
