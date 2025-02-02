import { PlantedCrops } from '@/utils/types/planted-crops'
import { RuralProducerWithoutPlantedCrops } from '@/utils/types/rural-producer'
import { RuralProducerRepository } from '../rural-producer-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRuralProducerRepository implements RuralProducerRepository {
  async findAllRuralProducer() {
    return prisma.ruralProducer.findMany()
  }

  async findAllPlantedCrops() {
    return prisma.plantedCrops.findMany()
  }

  async findById(id: string) {
    const teste = await prisma.ruralProducer.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        cpf_or_cnpj: true,
        producer_name: true,
        farm_name: true,
        city: true,
        state: true,
        total_area: true,
        agricultural_area: true,
        vegetation_area: true,
        planted_crops: true,
      },
    })

    return teste
  }

  findByCpfOrCnpj(cpfOrCnpj: string) {
    return prisma.ruralProducer.findUnique({
      where: {
        cpf_or_cnpj: cpfOrCnpj,
      },

      select: {
        id: true,
        cpf_or_cnpj: true,
        producer_name: true,
        farm_name: true,
        city: true,
        state: true,
        total_area: true,
        agricultural_area: true,
        vegetation_area: true,
        planted_crops: true,
      },
    })
  }

  async saveRuralProducer(data: RuralProducerWithoutPlantedCrops) {
    await prisma.ruralProducer.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async savePlantedCrops(data: PlantedCrops[]) {
    data.forEach(async (item) => {
      await prisma.plantedCrops.update({
        where: {
          id: item.id,
        },
        data: {
          name: item.name,
        },
      })
    })
  }

  async createRuralProducer(data: RuralProducerWithoutPlantedCrops) {
    return prisma.ruralProducer.create({
      data,
    })
  }

  async createPlantedCrops(data: PlantedCrops[]) {
    const plantedCrops = await prisma.plantedCrops.createMany({
      data,
    })

    return plantedCrops.count
  }

  async delete(id: string) {
    const deletedRuralProducer = prisma.ruralProducer.delete({
      where: {
        id,
      },
    })

    const deletedPlantedCrops = prisma.plantedCrops.deleteMany({
      where: {
        rural_producer_id: id,
      },
    })

    await prisma.$transaction([deletedPlantedCrops, deletedRuralProducer])
  }
}
