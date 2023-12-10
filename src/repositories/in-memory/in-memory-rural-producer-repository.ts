import { RuralProducer } from '@/utils/rural-producer'
import { RuralProducerRepository } from '../rural-producer-repository'
import { randomUUID } from 'node:crypto'
import { PlantedCrops } from '@/utils/planted-crops'

export class InMemoryRuralProducerRepositry implements RuralProducerRepository {
  public items: RuralProducer[] = []
  public plantedCropsItems: PlantedCrops[] = []

  async findByCpfOrCnpj(cpfOrCnpj: string) {
    const ruralProducer = this.items.find(
      (item) => item.cpfOrCnpj === cpfOrCnpj,
    )

    if (!ruralProducer) return null

    return ruralProducer
  }

  async create(data: RuralProducer) {
    const ruralProducer = {
      id: randomUUID(),
      cpfOrCnpj: data.cpfOrCnpj,
      producerName: data.producerName,
      farmName: data.farmName,
      city: data.city,
      state: data.state,
      totalArea: data.totalArea,
      agriculturalArea: data.agriculturalArea,
      vegetationArea: data.vegetationArea,
      plantedCrops: data.plantedCrops,
    }

    this.items.push(ruralProducer)

    // ruralProducer.plantedCrops.forEach((crop) => {
    //   const plantedCrop = {
    //     id: randomUUID(),
    //     ruralProducerId: ruralProducer.id,
    //     name: crop,
    //   }

    //   this.plantedCropsItems.push(plantedCrop)
    // })

    return ruralProducer
  }
}
