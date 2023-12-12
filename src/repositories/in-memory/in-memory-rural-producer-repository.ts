import { RuralProducer } from '@/utils/types/rural-producer'
import { RuralProducerRepository } from '../rural-producer-repository'
import { randomUUID } from 'node:crypto'
import { PlantedCrops } from '@/utils/types/planted-crops'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'

export class InMemoryRuralProducerRepositry implements RuralProducerRepository {
  public items: RuralProducer[] = []
  public plantedCropsItems: PlantedCrops[] = []

  async findById(id: string) {
    const ruralProducer = this.items.find((item) => item.id === id)
    const plantedCrops: PlantedCrops[] = []

    for (const plantedCrop of this.plantedCropsItems) {
      if (plantedCrop.ruralProducerId === id) {
        plantedCrops.push(plantedCrop)
      }
    }

    if (!ruralProducer || !plantedCrops) return null

    return {
      ruralProducer,
      plantedCrops,
    }
  }

  async findByCpfOrCnpj(cpfOrCnpj: string) {
    const ruralProducer = this.items.find(
      (item) => item.cpfOrCnpj === cpfOrCnpj,
    )

    if (!ruralProducer) return null

    const plantedCrops: PlantedCrops[] = []

    for (const plantedCrop of this.plantedCropsItems) {
      if (plantedCrop.ruralProducerId === ruralProducer.id) {
        plantedCrops.push(plantedCrop)
      }
    }

    if (!plantedCrops) return null

    return {
      ruralProducer,
      plantedCrops,
    }
  }

  async save(ruralProducer: RuralProducer, plantedCrops: PlantedCrops[]) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === ruralProducer.id,
    )

    this.items[itemIndex] = ruralProducer

    plantedCrops.forEach((crop) => {
      const itemIndex = this.plantedCropsItems.findIndex(
        (item) => item.id === crop.id,
      )

      this.plantedCropsItems[itemIndex] = crop
    })
  }

  async create(ruralProducer: RuralProducer, plantedCrops: PlantedCropsEnum[]) {
    const ruralProducerData = {
      id: randomUUID(),
      cpfOrCnpj: ruralProducer.cpfOrCnpj,
      producerName: ruralProducer.producerName,
      farmName: ruralProducer.farmName,
      city: ruralProducer.city,
      state: ruralProducer.state,
      totalArea: ruralProducer.totalArea,
      agriculturalArea: ruralProducer.agriculturalArea,
      vegetationArea: ruralProducer.vegetationArea,
    }

    this.items.push(ruralProducerData)

    const plantedCropsData = plantedCrops.map((crop) => {
      const plantedCrop = {
        id: randomUUID(),
        ruralProducerId: ruralProducerData.id,
        name: crop,
      }

      this.plantedCropsItems.push(plantedCrop)

      return plantedCrop
    })

    return {
      ruralProducerData,
      plantedCropsData,
    }
  }

  async delete(ruralProducer: RuralProducer, plantedCrops: PlantedCrops[]) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === ruralProducer.id,
    )

    plantedCrops.forEach((crop) => {
      const itemIndex = this.plantedCropsItems.findIndex(
        (item) => item.id === crop.id,
      )

      this.plantedCropsItems.splice(itemIndex, 1)
    })

    this.items.splice(itemIndex, 1)
  }
}
