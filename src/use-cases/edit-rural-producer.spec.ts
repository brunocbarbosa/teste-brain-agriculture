import { InMemoryRuralProducerRepositry } from '@/repositories/in-memory/in-memory-rural-producer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditRuralProducerUseCase } from './edit-rural-producer'
import { RuralProducerNotFoundError } from './errors/rural-producer-not-found-error'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'

let ruralProducerRepository: InMemoryRuralProducerRepositry
let sut: EditRuralProducerUseCase

describe('Edit Rural Use Case', () => {
  beforeEach(() => {
    ruralProducerRepository = new InMemoryRuralProducerRepositry()
    sut = new EditRuralProducerUseCase(ruralProducerRepository)
  })

  it('should be able to Edit', async () => {
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

    const plantedCropsArrayEdit = [
      PlantedCropsEnum.algodao,
      PlantedCropsEnum.milho,
    ]

    await sut.execute({
      ruralProducerId: ruralProducer.id,
      producerName: 'José',
      farmName: 'Fazendona',
      plantedCrops: plantedCropsArrayEdit,
    })

    expect(ruralProducerRepository.items[0]).toMatchObject({
      producer_name: 'José',
      farm_name: 'Fazendona',
      planted_crops: [PlantedCropsEnum.algodao, PlantedCropsEnum.milho],
    })
    expect(ruralProducerRepository.plantedCropsItems[0]).toMatchObject({
      name: 'ALGODAO',
    })
    expect(ruralProducerRepository.plantedCropsItems[1]).toMatchObject({
      name: 'MILHO',
    })
  })

  it('should not be able to edit if not found rural producer', async () => {
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
