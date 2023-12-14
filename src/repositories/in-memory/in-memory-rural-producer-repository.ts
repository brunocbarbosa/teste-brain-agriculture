import {
  RuralProducer,
  RuralProducerWithoutPlantedCrops,
} from '@/utils/types/rural-producer'
import { RuralProducerRepository } from '../rural-producer-repository'
import { randomUUID } from 'node:crypto'
import { PlantedCrops } from '@/utils/types/planted-crops'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'

export class InMemoryRuralProducerRepositry implements RuralProducerRepository {
  public items: RuralProducerWithoutPlantedCrops[] = []
  public plantedCropsItems: PlantedCrops[] = []

  async findAllRuralProducer() {
    return this.items
  }

  async findAllPlantedCrops() {
    return this.plantedCropsItems
  }

  async findById(id: string) {
    const ruralProducer = this.items.find((item) => item.id === id)

    let producer: RuralProducer

    if (ruralProducer) {
      producer = {
        id,
        cpf_or_cnpj: ruralProducer.cpf_or_cnpj,
        producer_name: ruralProducer.producer_name,
        farm_name: ruralProducer.farm_name,
        city: ruralProducer.city,
        state: ruralProducer.state,
        total_area: ruralProducer.total_area,
        agricultural_area: ruralProducer.agricultural_area,
        vegetation_area: ruralProducer.vegetation_area,
        planted_crops: this.plantedCropsItems,
      }
      return producer
    }

    return null
  }

  async findByCpfOrCnpj(cpfOrCnpj: string) {
    const ruralProducer = this.items.find(
      (item) => item.cpf_or_cnpj === cpfOrCnpj,
    )

    let producer: RuralProducer

    if (ruralProducer) {
      producer = {
        id: ruralProducer.id,
        cpf_or_cnpj: cpfOrCnpj,
        producer_name: ruralProducer.producer_name,
        farm_name: ruralProducer.farm_name,
        city: ruralProducer.city,
        state: ruralProducer.state,
        total_area: ruralProducer.total_area,
        agricultural_area: ruralProducer.agricultural_area,
        vegetation_area: ruralProducer.vegetation_area,
        planted_crops: this.plantedCropsItems,
      }
      return producer
    }

    return null
  }

  async saveRuralProducer(data: RuralProducerWithoutPlantedCrops) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    this.items[itemIndex] = data
  }

  async savePlantedCrops(data: PlantedCrops[], ruralProducerId: string) {
    this.plantedCropsItems.forEach((item, index) => {
      if (item.id === ruralProducerId) {
        item.name = data[index].name
      }
    })
  }

  async createRuralProducer(data: RuralProducerWithoutPlantedCrops) {
    const ruralProducer = {
      id: randomUUID(),
      cpf_or_cnpj: data.cpf_or_cnpj,
      producer_name: data.producer_name,
      farm_name: data.farm_name,
      city: data.city,
      state: data.state,
      total_area: data.total_area,
      agricultural_area: data.agricultural_area,
      vegetation_area: data.vegetation_area,
    }

    this.items.push(ruralProducer)

    return ruralProducer
  }

  async createPlantedCrops(plantedCrops: PlantedCrops[]) {
    plantedCrops.forEach((crop) => {
      const plantedCrop = {
        id: randomUUID(),
        rural_producer_id: crop.rural_producer_id,
        name: crop.name,
      }

      this.plantedCropsItems.push(plantedCrop)
    })

    const count = this.plantedCropsItems.length

    return count
  }

  async delete(id: string) {
    const itemIndex = this.items.findIndex((item) => item.id === id)
    const plantedCropsItemIndex = this.plantedCropsItems.findIndex(
      (item) => item.rural_producer_id === id,
    )

    this.plantedCropsItems.splice(plantedCropsItemIndex, 2)
    this.items.splice(itemIndex, 1)
  }
}
