import { InMemoryRuralProducerRepositry } from '@/repositories/in-memory/in-memory-rural-producer-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'
import { GetInfosRuralProducerUseCase } from './get-infos-rural-producer'

let ruralProducerRepository: InMemoryRuralProducerRepositry
let sut: GetInfosRuralProducerUseCase

describe('Get Rural Producer Infos Use Case', () => {
  beforeEach(() => {
    ruralProducerRepository = new InMemoryRuralProducerRepositry()
    sut = new GetInfosRuralProducerUseCase(ruralProducerRepository)
  })

  it('should be able get all data', async () => {
    const ruralProducer = await ruralProducerRepository.createRuralProducer({
      cpf_or_cnpj: '21859242570',
      producer_name: 'Thomas',
      farm_name: 'Fazendinha',
      city: 'Congonhal',
      state: 'MG',
      total_area: 4000,
      agricultural_area: 1500,
      vegetation_area: 1500,
    })

    const plantedCropsObj = [
      {
        rural_producer_id: ruralProducer.id,
        name: PlantedCropsEnum.CAFE,
      },
      {
        rural_producer_id: ruralProducer.id,
        name: PlantedCropsEnum.MILHO,
      },
    ]

    await ruralProducerRepository.createPlantedCrops(plantedCropsObj)

    const res = await sut.execute()

    expect(res.totalAgriculturalArea).greaterThan(0)
    expect(res.totalFarms).greaterThan(0)
    expect(res.totalAreaSum).greaterThan(0)
  })
})
