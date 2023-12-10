import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducer } from '@/utils/rural-producer'
import { RuralProducerAlreadyExistsError } from './errors/rural-producer-already-exists-error'

interface registerRuralProducerUseCaseRequest {
  cpfOrCnpj: string
  producerName: string
  farmName: string
  city: string
  state: string
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
  plantedCrops: string[]
}

interface registerRuralProducerUseCaseResponse {
  ruralProducer: RuralProducer
}

export class RegisterRuralProducerUseCase {
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async execute({
    cpfOrCnpj,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    agriculturalArea,
    vegetationArea,
    plantedCrops,
  }: registerRuralProducerUseCaseRequest): Promise<registerRuralProducerUseCaseResponse> {
    const producerWithTheSameCpfOrCnpj =
      await this.ruralProducerRepository.findByCpfOrCnpj(cpfOrCnpj)

    if (producerWithTheSameCpfOrCnpj)
      throw new RuralProducerAlreadyExistsError()

    const ruralProducer = await this.ruralProducerRepository.create({
      cpfOrCnpj,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      agriculturalArea,
      vegetationArea,
      plantedCrops,
    })

    return {
      ruralProducer,
    }
  }
}
