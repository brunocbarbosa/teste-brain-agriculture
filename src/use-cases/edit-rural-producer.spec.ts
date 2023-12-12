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
      cpfOrCnpj: '21859242570',
      producerName: 'Thomas',
      farmName: 'Fazendinha',
      city: 'Congonhal',
      state: 'MG',
      totalArea: 4000,
      agriculturalArea: 1500,
      vegetationArea: 1500,
      plantedCrops: plantedCropsArray,
    })

    await sut.execute({
      ruralProducerId: ruralProducer.id,
      producerName: 'José',
      farmName: 'Fazendona',
    })

    expect(ruralProducerRepository.items[0]).toMatchObject({
      producerName: 'José',
      farmName: 'Fazendona',
    })
  })

  it('should not be able to edit if not found rural producer', async () => {
    const plantedCropsArray = [PlantedCropsEnum.soja, PlantedCropsEnum.milho]

    const ruralProducer = await ruralProducerRepository.create({
      cpfOrCnpj: '21859242570',
      producerName: 'Thomas',
      farmName: 'Fazendinha',
      city: 'Congonhal',
      state: 'MG',
      totalArea: 4000,
      agriculturalArea: 1500,
      vegetationArea: 1500,
      plantedCrops: plantedCropsArray,
    })

    await expect(() =>
      sut.execute({
        ruralProducerId: `${ruralProducer.id}-producer`,
      }),
    ).rejects.toBeInstanceOf(RuralProducerNotFoundError)
  })
})
