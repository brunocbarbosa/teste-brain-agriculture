import { CpfOrCnpjIsNotValidError } from '@/use-cases/errors/cpf-or-cnpj-is-not-valid-error'
import { RuralProducerAlreadyExistsError } from '@/use-cases/errors/rural-producer-already-exists-error'
import { TotalAreaError } from '@/use-cases/errors/total-area-error'
import { makeEraseRuralProcerUseCase } from '@/use-cases/factories/make-erase-rural-producer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function erase(req: FastifyRequest, rep: FastifyReply) {
  const eraseRuralproducerSchema = z.object({
    ruralProducerId: z.string().uuid(),
  })

  const { ruralProducerId } = eraseRuralproducerSchema.parse(req.params)

  try {
    const eraseRuralproducerUseCase = makeEraseRuralProcerUseCase()

    await eraseRuralproducerUseCase.execute({
      ruralProducerId,
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
