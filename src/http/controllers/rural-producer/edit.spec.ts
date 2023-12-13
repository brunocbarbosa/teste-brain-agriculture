import request from 'supertest'
import { app } from '@/app'
import { describe, afterAll, beforeAll, expect, it } from 'vitest'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'
import { prisma } from '@/lib/prisma'
import { PlantedCrops } from '@/utils/types/planted-crops'

describe('Edit Rural Producer (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit', async () => {
    const plantedCropsArray = [PlantedCropsEnum.ALGODAO, PlantedCropsEnum.MILHO]

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

    const data: PlantedCrops[] = []

    plantedCropsArray.forEach((item) => {
      let obj

      if (ruralProducer.id) {
        obj = {
          name: item,
          rural_producer_id: ruralProducer.id,
        }

        data.push(obj)
      }
    })

    await prisma.plantedCrops.createMany({
      data,
    })

    console.log('ruralProducer: ', ruralProducer)

    const res = await request(app.server)
      .put(`/rural-producer/${ruralProducer.id}`)
      .send({
        cpf_or_cnpj: '21859242570',
        producer_name: 'Thomas',
        farm_name: 'Fazendinha',
        city: 'Congonhal',
        state: 'MG',
      })

    expect(res.statusCode).toEqual(204)
  })
})
