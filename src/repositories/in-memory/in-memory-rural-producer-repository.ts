import { RuralProducer } from '@/utils/types/rural-producer'
import { RuralProducerRepository } from '../rural-producer-repository'
import { randomUUID } from 'node:crypto'
import { PlantedCrops } from '@/utils/types/planted-crops'

export class InMemoryRuralProducerRepositry implements RuralProducerRepository {
  public items: RuralProducer[] = []
  public plantedCropsItems: PlantedCrops[] = []

  async findById(id: string) {
    const ruralProducer = this.items.find((item) => item.id === id)

    if (!ruralProducer) return null

    return ruralProducer
  }

  async findByCpfOrCnpj(cpfOrCnpj: string) {
    const ruralProducer = this.items.find(
      (item) => item.cpf_or_cnpj === cpfOrCnpj,
    )

    if (!ruralProducer) return null

    return ruralProducer
  }

  async save(data: RuralProducer) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)

    this.items[itemIndex] = data

    this.plantedCropsItems.forEach((item, index) => {
      item.name = data.planted_crops[index]
    })
  }

  async create(data: RuralProducer) {
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
      planted_crops: data.planted_crops,
    }

    this.items.push(ruralProducer)

    ruralProducer.planted_crops.forEach((crop) => {
      const plantedCrop = {
        id: randomUUID(),
        ruralProducerId: ruralProducer.id,
        name: crop,
      }

      this.plantedCropsItems.push(plantedCrop)
    })

    return ruralProducer
  }

  async delete(data: RuralProducer) {
    const itemIndex = this.items.findIndex((item) => item.id === data.id)
    const plantedCropsItemIndex = this.plantedCropsItems.findIndex(
      (item) => item.ruralProducerId === data.id,
    )

    this.plantedCropsItems.splice(plantedCropsItemIndex, 2)
    this.items.splice(itemIndex, 1)
  }
}
