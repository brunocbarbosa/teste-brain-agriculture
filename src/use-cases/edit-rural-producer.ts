import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducerNotFoundError } from './errors/rural-producer-not-found-error'
import { PlantedCrops } from '@/utils/types/planted-crops'
import { RuralProducerWithoutPlantedCrops } from '@/utils/types/rural-producer'

interface editRuralProducerUseCaseRequest {
  ruralProducerId: string
  cpfOrCnpj?: string
  producerName?: string
  farmName?: string
  city?: string
  state?: string
  totalArea?: number
  agriculturalArea?: number
  vegetationArea?: number
  plantedCrops?: PlantedCrops[]
}

interface editRuralProducerUseCaseResponse {}

export class EditRuralProducerUseCase {
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async execute({
    ruralProducerId,
    cpfOrCnpj,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    agriculturalArea,
    vegetationArea,
    plantedCrops,
  }: editRuralProducerUseCaseRequest): Promise<editRuralProducerUseCaseResponse> {
    const producerRural =
      await this.ruralProducerRepository.findById(ruralProducerId)

    if (!producerRural) throw new RuralProducerNotFoundError()

    if (cpfOrCnpj !== undefined) producerRural.cpf_or_cnpj = cpfOrCnpj
    if (producerName !== undefined) producerRural.producer_name = producerName
    if (farmName !== undefined) producerRural.farm_name = farmName
    if (city !== undefined) producerRural.city = city
    if (state !== undefined) producerRural.state = state
    if (totalArea !== undefined) producerRural.total_area = totalArea
    if (agriculturalArea !== undefined)
      producerRural.agricultural_area = agriculturalArea
    if (vegetationArea !== undefined)
      producerRural.vegetation_area = vegetationArea
    if (plantedCrops !== undefined) producerRural.planted_crops = plantedCrops

    const ruralProducerWithoutPlantedCrops: RuralProducerWithoutPlantedCrops = {
      id: producerRural.id,
      cpf_or_cnpj: producerRural.cpf_or_cnpj,
      producer_name: producerRural.producer_name,
      farm_name: producerRural.farm_name,
      city: producerRural.city,
      state: producerRural.state,
      total_area: producerRural.total_area,
      agricultural_area: producerRural.agricultural_area,
      vegetation_area: producerRural.vegetation_area,
    }

    const PlantedCropsEdit: PlantedCrops[] = producerRural.planted_crops

    if (
      cpfOrCnpj !== undefined ||
      producerName !== undefined ||
      farmName !== undefined ||
      city !== undefined ||
      state !== undefined ||
      totalArea !== undefined ||
      agriculturalArea !== undefined ||
      vegetationArea !== undefined
    ) {
      await this.ruralProducerRepository.saveRuralProducer(
        ruralProducerWithoutPlantedCrops,
      )
    }

    if (plantedCrops !== undefined) {
      await this.ruralProducerRepository.savePlantedCrops(PlantedCropsEdit)
    }

    return {}
  }
}
