import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducerNotFoundError } from './errors/rural-producer-not-found-error'
import { PlantedCrops } from '@/utils/types/planted-crops'

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

    console.log('producerRural: ', producerRural)

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

    await this.ruralProducerRepository.saveRuralProducer(producerRural)
    await this.ruralProducerRepository.savePlantedCrops(
      producerRural.planted_crops,
      ruralProducerId,
    )

    return {}
  }
}
