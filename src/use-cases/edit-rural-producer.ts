import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducerNotFoundError } from './errors/rural-producer-not-found-error'
import { PlantedCrops } from '@/utils/types/planted-crops'
import { RuralProducer } from '@/utils/types/rural-producer'

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

interface editRuralProducerUseCaseResponse {
  producerRural: {
    ruralProducer: RuralProducer
    plantedCrops: PlantedCrops[]
  }
}
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

    if (cpfOrCnpj !== undefined)
      producerRural.ruralProducer.cpfOrCnpj = cpfOrCnpj
    if (producerName !== undefined)
      producerRural.ruralProducer.producerName = producerName
    if (farmName !== undefined) producerRural.ruralProducer.farmName = farmName
    if (city !== undefined) producerRural.ruralProducer.city = city
    if (state !== undefined) producerRural.ruralProducer.state = state
    if (totalArea !== undefined)
      producerRural.ruralProducer.totalArea = totalArea
    if (agriculturalArea !== undefined)
      producerRural.ruralProducer.agriculturalArea = agriculturalArea
    if (vegetationArea !== undefined)
      producerRural.ruralProducer.vegetationArea = vegetationArea
    if (plantedCrops !== undefined) {
      producerRural.plantedCrops.forEach((item) => {
        plantedCrops.forEach((crop) => {
          if (item.ruralProducerId === crop.ruralProducerId) {
            item.name = crop.name
          }
        })
      })
    }

    await this.ruralProducerRepository.save(
      producerRural.ruralProducer,
      producerRural.plantedCrops,
    )

    return {
      producerRural,
    }
  }
}
