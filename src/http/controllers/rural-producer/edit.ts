import { PlantedCropsEnum } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeEditRuralProducerUseCase } from '@/use-cases/factories/make-edit-rural-producer-use-case'
import { RuralProducerNotFoundError } from '@/use-cases/errors/rural-producer-not-found-error'

export async function edit(req: FastifyRequest, rep: FastifyReply) {
  const editRuralProducerParamSchema = z.object({
    ruralProducerId: z.string().uuid(),
  })

  const editRuralProducerBodySchema = z.object({
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
          id: z.string(),
          rural_producer_id: z.string(),
          name: z.nativeEnum(PlantedCropsEnum),
        }),
      )
      .optional(),
  })

  const { ruralProducerId } = editRuralProducerParamSchema.parse(req.params)

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
  } = editRuralProducerBodySchema.parse(req.body)

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
