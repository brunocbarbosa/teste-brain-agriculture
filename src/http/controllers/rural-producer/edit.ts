import { PlantedCropsEnum } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeEditRuralProducerUseCase } from '@/use-cases/factories/make-edit-rural-producer-use-case'
import { RuralProducerNotFoundError } from '@/use-cases/errors/rural-producer-not-found-error'

export async function edit(req: FastifyRequest, rep: FastifyReply) {
  console.log(req.body)
  const editRuralProducerSchema = z.object({
    ruralProducerId: z.string().uuid(),
    cpfOrCnpj: z.string().optional(),
    producerName: z.string().optional(),
    farmName: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    totalArea: z.coerce.number().optional(),
    agriculturalArea: z.coerce.number().optional(),
    vegetationArea: z.coerce.number().optional(),
    plantedCrops: z
      .array(
        z.object({
          rural_producer_id: z.string(),
          name: z.nativeEnum(PlantedCropsEnum),
        }),
      )
      .optional(),
  })

  const { ruralProducerId } = editRuralProducerSchema.parse(req.params)

  console.log('ruralProducerId: ', ruralProducerId)

  const {
    cpfOrCnpj,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    agriculturalArea,
    vegetationArea,
    plantedCrops,
  } = editRuralProducerSchema.parse(req.body)

  console.log('city: ', city)

  try {
    const editRuralProducerUseCase = makeEditRuralProducerUseCase()

    await editRuralProducerUseCase.execute({
      ruralProducerId,
      cpfOrCnpj,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      agriculturalArea,
      vegetationArea,
      plantedCrops,
    })
  } catch (error) {
    if (error instanceof RuralProducerNotFoundError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return rep.status(204).send()
}
