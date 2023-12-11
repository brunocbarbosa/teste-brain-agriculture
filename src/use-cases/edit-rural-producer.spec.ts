import { InMemoryRuralProducerRepositry } from '@/repositories/in-memory/in-memory-rural-producer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { EditRuralProducerUseCase } from './edit-rural-producer'

let ruralProducerRepository: InMemoryRuralProducerRepositry
let sut: EditRuralProducerUseCase

describe('Edit Rural Use Case', () => {
  beforeEach(() => {
    ruralProducerRepository = new InMemoryRuralProducerRepositry()
    sut = new EditRuralProducerUseCase(ruralProducerRepository)
  })

  it('should be able to register', async () => {
    const plantedCropsArray = ['Soja', 'Milho']

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
})
