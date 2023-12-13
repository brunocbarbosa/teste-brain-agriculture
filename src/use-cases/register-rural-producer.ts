import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducerWithoutPlantedCrops } from '@/utils/types/rural-producer'
import { RuralProducerAlreadyExistsError } from './errors/rural-producer-already-exists-error'
import {
  agriculturalAndVegetationAreasSum,
  checkCpfAndCnpjIsValid,
} from '@/utils/functions'
import { CpfOrCnpjIsNotValidError } from './errors/cpf-or-cnpj-is-not-valid-error'
import { TotalAreaError } from './errors/total-area-error'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'
import { PlantedCrops } from '@/utils/types/planted-crops'

interface registerRuralProducerUseCaseRequest {
  cpfOrCnpj: string
  producerName: string
  farmName: string
  city: string
  state: string
  totalArea: number
  agriculturalArea: number
  vegetationArea: number
  plantedCropsEnum: PlantedCropsEnum[]
}

interface registerRuralProducerUseCaseResponse {
  ruralProducer: RuralProducerWithoutPlantedCrops
  plantedCropsCount: number
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
    plantedCropsEnum,
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

    const ruralProducer =
      await this.ruralProducerRepository.createRuralProducer({
        cpf_or_cnpj: cpfOrCnpj,
        producer_name: producerName,
        farm_name: farmName,
        city,
        state,
        total_area: totalArea,
        agricultural_area: agriculturalArea,
        vegetation_area: vegetationArea,
      })

    const plantedCropsData: PlantedCrops[] = []

    plantedCropsEnum.forEach((item) => {
      let obj

      if (ruralProducer.id) {
        obj = {
          name: item,
          rural_producer_id: ruralProducer.id,
        }

        plantedCropsData.push(obj)
      }
    })

    const plantedCropsCount =
      await this.ruralProducerRepository.createPlantedCrops(plantedCropsData)

    return {
      ruralProducer,
      plantedCropsCount,
    }
  }
}
