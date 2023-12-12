import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducerNotFoundError } from './errors/rural-producer-not-found-error'

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
  plantedCrops?: string[]
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

    if (cpfOrCnpj !== undefined) producerRural.cpfOrCnpj = cpfOrCnpj
    if (producerName !== undefined) producerRural.producerName = producerName
    if (farmName !== undefined) producerRural.farmName = farmName
    if (city !== undefined) producerRural.city = city
    if (state !== undefined) producerRural.state = state
    if (totalArea !== undefined) producerRural.totalArea = totalArea
    if (agriculturalArea !== undefined)
      producerRural.agriculturalArea = agriculturalArea
    if (vegetationArea !== undefined)
      producerRural.vegetationArea = vegetationArea
    if (plantedCrops !== undefined) producerRural.plantedCrops = plantedCrops

    await this.ruralProducerRepository.save(producerRural)

    return {}
  }
}
