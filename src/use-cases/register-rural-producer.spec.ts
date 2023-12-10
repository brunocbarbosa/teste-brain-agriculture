import { InMemoryRuralProducerRepositry } from '@/repositories/in-memory/in-memory-rural-producer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterRuralProducerUseCase } from './register-rural-producer'
import { RuralProducerAlreadyExistsError } from './errors/rural-producer-already-exists-error'

let ruralProducer: InMemoryRuralProducerRepositry
let sut: RegisterRuralProducerUseCase

describe('Register Rural Use Case', () => {
  beforeEach(() => {
    ruralProducer = new InMemoryRuralProducerRepositry()
    sut = new RegisterRuralProducerUseCase(ruralProducer)
  })

  it('should be able to register', async () => {
    const plantedCropsArray = ['Soja', 'Milho']

    const { ruralProducer } = await sut.execute({
      cpfOrCnpj: '02136548965',
      producerName: 'Thomas',
      farmName: 'Fazendinha',
      city: 'Congonhal',
      state: 'MG',
      totalArea: 4000,
      agriculturalArea: 1500,
      vegetationArea: 1500,
      plantedCrops: plantedCropsArray,
    })

    expect(ruralProducer.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same cpf or cnpj', async () => {
    const plantedCropsArray = ['Soja', 'Milho']

    await sut.execute({
      cpfOrCnpj: '02136548965',
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
        cpfOrCnpj: '02136548965',
        producerName: 'Thomas',
        farmName: 'Fazendinha',
        city: 'Congonhal',
        state: 'MG',
        totalArea: 4000,
        agriculturalArea: 1500,
        vegetationArea: 1500,
        plantedCrops: plantedCropsArray,
      }),
    ).rejects.toBeInstanceOf(RuralProducerAlreadyExistsError)
  })
})
