import { PlantedCropsEnum } from '@/utils/planted-crops-enum'
import { PlantedCrops } from '@/utils/types/planted-crops'
import { RuralProducer } from '@/utils/types/rural-producer'
import { RuralProducerRepository } from '../rural-producer-repository'
import { prisma } from '@/lib/prisma'

export class PrismaRuralProducerRepository implements RuralProducerRepository {
  async findById(id: string) {
    const ruralProducer = await prisma.ruralProducer.findUnique({
      where: {
        id,
      },
    })

    const plantedCropsQuery = await prisma.ruralProducer.findMany({
      where: {
        id,
      },

      select: {
        Planted_Crops: true,
      },
    })

    const plantedCrops = plantedCropsQuery

    // if (!ruralProducer || !plantedCrops) return null

    return {
      ruralProducer,
      plantedCrops,
    }
  }

  findByCpfOrCnpj(cpfOrCnpj: string): Promise<{
    ruralProducer: RuralProducer
    plantedCrops: PlantedCrops[]
  } | null> {
    throw new Error('Method not implemented.')
  }

  save(data: RuralProducer, plantedCrops: PlantedCrops[]): Promise<void> {
    throw new Error('Method not implemented.')
  }

  create(
    data: RuralProducer,
    plantedCrops: PlantedCropsEnum[],
  ): Promise<{
    ruralProducerData: RuralProducer
    plantedCropsData: PlantedCrops[]
  }> {
    throw new Error('Method not implemented.')
  }

  delete(data: RuralProducer, plantedCrops: PlantedCrops[]): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
