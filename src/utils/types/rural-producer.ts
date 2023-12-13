import { PlantedCropsEnum } from '../planted-crops-enum'

export type RuralProducer = {
  id?: string
  cpf_or_cnpj: string
  producer_name: string
  farm_name: string
  city: string
  state: string
  total_area: number
  agricultural_area: number
  vegetation_area: number
  planted_crops: PlantedCropsEnum[]
}
