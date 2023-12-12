import { PlantedCropsEnum } from '../planted-crops-enum'

export type PlantedCrops = {
  id?: string
  ruralProducerId: string
  name: PlantedCropsEnum
}
