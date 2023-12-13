import { CpfOrCnpjIsNotValidError } from '@/use-cases/errors/cpf-or-cnpj-is-not-valid-error'
import { RuralProducerAlreadyExistsError } from '@/use-cases/errors/rural-producer-already-exists-error'
import { TotalAreaError } from '@/use-cases/errors/total-area-error'
import { makeEraseRuralProcerUseCase } from '@/use-cases/factories/make-erase-rural-producer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function erase(req: FastifyRequest, rep: FastifyReply) {
  const registerContestSchema = z.object({
    ruralProducerId: z.string(),
  })

  const { ruralProducerId } = registerContestSchema.parse(req.params)

  try {
    const registerContestUseCase = makeEraseRuralProcerUseCase()

    await registerContestUseCase.execute({
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
