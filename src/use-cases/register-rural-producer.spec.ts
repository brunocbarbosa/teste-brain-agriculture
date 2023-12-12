import { InMemoryRuralProducerRepositry } from '@/repositories/in-memory/in-memory-rural-producer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterRuralProducerUseCase } from './register-rural-producer'
import { RuralProducerAlreadyExistsError } from './errors/rural-producer-already-exists-error'
import { CpfOrCnpjIsNotValidError } from './errors/cpf-or-cnpj-is-not-valid-error'
import { TotalAreaError } from './errors/total-area-error'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'

let ruralProducer: InMemoryRuralProducerRepositry
let sut: RegisterRuralProducerUseCase

describe('Register Rural Use Case', () => {
  beforeEach(() => {
    ruralProducer = new InMemoryRuralProducerRepositry()
    sut = new RegisterRuralProducerUseCase(ruralProducer)
  })

  it('should be able to register', async () => {
    const plantedCropsArray = [PlantedCropsEnum.algodao, PlantedCropsEnum.milho]

    const { ruralProducer } = await sut.execute({
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

    expect(ruralProducer.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same cpf or cnpj', async () => {
    const plantedCropsArray = [PlantedCropsEnum.algodao, PlantedCropsEnum.milho]

    await sut.execute({
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
        cpfOrCnpj: '21859242570',
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

  it('should not be able to register with invalid CPF or CNPJ', async () => {
    const plantedCropsArray = [PlantedCropsEnum.algodao, PlantedCropsEnum.milho]

    await expect(() =>
      sut.execute({
        cpfOrCnpj: '2185924257025',
        producerName: 'Thomas',
        farmName: 'Fazendinha',
        city: 'Congonhal',
        state: 'MG',
        totalArea: 4000,
        agriculturalArea: 1500,
        vegetationArea: 1500,
        plantedCrops: plantedCropsArray,
      }),
    ).rejects.toBeInstanceOf(CpfOrCnpjIsNotValidError)
  })

  it('should not be able to register if the sum of agricultural and vegetation is bigger than total area', async () => {
    const plantedCropsArray = [PlantedCropsEnum.algodao, PlantedCropsEnum.milho]

    await expect(() =>
      sut.execute({
        cpfOrCnpj: '21859242570',
        producerName: 'Thomas',
        farmName: 'Fazendinha',
        city: 'Congonhal',
        state: 'MG',
        totalArea: 2000,
        agriculturalArea: 1500,
        vegetationArea: 1500,
        plantedCrops: plantedCropsArray,
      }),
    ).rejects.toBeInstanceOf(TotalAreaError)
  })
})
