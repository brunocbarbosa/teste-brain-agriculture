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

    await sut.execute({
      ruralProducerId: ruralProducer.id,
      producerName: 'José',
      farmName: 'Fazendona',
    })

    expect(ruralProducerRepository.items[0]).toMatchObject({
      producer_name: 'José',
      farm_name: 'Fazendona',
    })
  })

  it('should not be able to edit if not found rural producer', async () => {
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

    await sut.execute({
      ruralProducerId: ruralProducer.id,
      producerName: 'José',
      farmName: 'Fazendona',
    })

    await expect(() =>
      sut.execute({
        ruralProducerId: `${ruralProducer.id}-producer`,
      }),
    ).rejects.toBeInstanceOf(RuralProducerNotFoundError)
  })
})
