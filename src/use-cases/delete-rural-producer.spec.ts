import { InMemoryRuralProducerRepositry } from '@/repositories/in-memory/in-memory-rural-producer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteRuralProducerUseCase } from './delete-rural-producer'
import { RuralProducerNotFoundError } from './errors/rural-producer-not-found-error'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'

let ruralProducerRepository: InMemoryRuralProducerRepositry
let sut: DeleteRuralProducerUseCase

describe('Edit Rural Producer Use Case', () => {
  beforeEach(() => {
    ruralProducerRepository = new InMemoryRuralProducerRepositry()
    sut = new DeleteRuralProducerUseCase(ruralProducerRepository)
  })

  it('should be able to delete', async () => {
    const plantedCropsArray = [PlantedCropsEnum.soja, PlantedCropsEnum.milho]

    const ruralProducer = await ruralProducerRepository.create({
      cpf_or_cnpj: '21859242570',
      producer_name: 'Thomas',
      farm_name: 'Fazendinha',
      city: 'Congonhal',
      state: 'MG',
      total_area: 4000,
      agricultural_area: 1500,
      vegetation_area: 1500,
      planted_crops: plantedCropsArray,
    })

    await sut.execute({
      ruralProducerId: ruralProducer.id,
    })

    expect(ruralProducerRepository.items).toHaveLength(0)
    expect(ruralProducerRepository.plantedCropsItems).toHaveLength(0)
  })

  it('should not be able to delete if not found rural producer', async () => {
    const plantedCropsArray = [PlantedCropsEnum.soja, PlantedCropsEnum.milho]

    const ruralProducer = await ruralProducerRepository.create({
      cpf_or_cnpj: '21859242570',
      producer_name: 'Thomas',
      farm_name: 'Fazendinha',
      city: 'Congonhal',
      state: 'MG',
      total_area: 4000,
      agricultural_area: 1500,
      vegetation_area: 1500,
      planted_crops: plantedCropsArray,
    })

    await expect(() =>
      sut.execute({
        ruralProducerId: `${ruralProducer.id}-producer`,
      }),
    ).rejects.toBeInstanceOf(RuralProducerNotFoundError)
  })
})
