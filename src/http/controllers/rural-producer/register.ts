import { CpfOrCnpjIsNotValidError } from '@/use-cases/errors/cpf-or-cnpj-is-not-valid-error'
import { RuralProducerAlreadyExistsError } from '@/use-cases/errors/rural-producer-already-exists-error'
import { TotalAreaError } from '@/use-cases/errors/total-area-error'
import { makeRegisterRuralProcerUseCase } from '@/use-cases/factories/make-register-rural-producer-use-case'
import { PlantedCropsEnum } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerRuralProducerSchema = z.object({
    cpfOrCnpj: z.string(),
    producerName: z.string(),
    farmName: z.string(),
    city: z.string(),
    state: z.string(),
    totalArea: z.coerce.number(),
    agriculturalArea: z.coerce.number(),
    vegetationArea: z.coerce.number(),
    plantedCropsEnum: z.nativeEnum(PlantedCropsEnum).array(),
  })

  const {
    cpfOrCnpj,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    agriculturalArea,
    vegetationArea,
    plantedCropsEnum,
  } = registerRuralProducerSchema.parse(req.body)

  try {
    const registerRuralProducerUseCase = makeRegisterRuralProcerUseCase()

    await registerRuralProducerUseCase.execute({
      cpfOrCnpj,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      agriculturalArea,
      vegetationArea,
      plantedCropsEnum,
    })
  } catch (error) {
    if (error instanceof RuralProducerAlreadyExistsError) {
      return rep.status(409).send({
        message: error.message,
      })
    }
    if (error instanceof CpfOrCnpjIsNotValidError) {
      return rep.status(409).send({
        message: error.message,
      })
    }
    if (error instanceof TotalAreaError) {
      return rep.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return rep.status(201).send()
}
