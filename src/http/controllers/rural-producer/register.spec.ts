import request from 'supertest'
import { app } from '@/app'
import { describe, afterAll, beforeAll, expect, it } from 'vitest'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'

describe('Register Rural Producer (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const plantedCropsArray = [PlantedCropsEnum.ALGODAO, PlantedCropsEnum.MILHO]

    const res = await request(app.server).post('/rural-producer').send({
      cpfOrCnpj: '21859242570',
      producerName: 'Thomas',
      farmName: 'Fazendinha',
      city: 'Congonhal',
      state: 'MG',
      totalArea: 4000,
      agriculturalArea: 1500,
      vegetationArea: 1500,
      plantedCropsEnum: plantedCropsArray,
    })

    expect(res.statusCode).toEqual(201)
  })
})
