import { prisma } from '@/lib/prisma'
import { PlantedCropsEnum } from '../planted-crops-enum'

export async function createRuralProducerOrganization() {
  const ruralProducer = await prisma.ruralProducer.create({
    data: {
      cpf_or_cnpj: '21859242570',
      producer_name: 'Thomas',
      farm_name: 'Fazendinha',
      city: 'Congonhal',
      state: 'MG',
      total_area: 4000,
      agricultural_area: 1500,
      vegetation_area: 1500,
    },
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

  return {}
}
