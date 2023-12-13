import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducer } from '@/utils/types/rural-producer'
import { RuralProducerAlreadyExistsError } from './errors/rural-producer-already-exists-error'
import {
  agriculturalAndVegetationAreasSum,
  checkCpfAndCnpjIsValid,
} from '@/utils/functions'
import { CpfOrCnpjIsNotValidError } from './errors/cpf-or-cnpj-is-not-valid-error'
import { TotalAreaError } from './errors/total-area-error'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'

interface registerRuralProducerUseCaseRequest {
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

    if (!checkCpfAndCnpjIsValid(cpfOrCnpj)) throw new CpfOrCnpjIsNotValidError()

    if (
      !agriculturalAndVegetationAreasSum(
        agriculturalArea,
        vegetationArea,
        totalArea,
      )
    )
      throw new TotalAreaError()

    const ruralProducer = await this.ruralProducerRepository.create({
      cpf_or_cnpj: cpfOrCnpj,
      producer_name: producerName,
      farm_name: farmName,
      city,
      state,
      total_area: totalArea,
      agricultural_area: agriculturalArea,
      vegetation_area: vegetationArea,
      planted_crops: plantedCrops,
    })

    return {
      ruralProducer,
    }
  }
}
