import { makeGetInfosRuralProcerUseCase } from '@/use-cases/factories/make-get-infos-rural-producer-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getInfos(req: FastifyRequest, rep: FastifyReply) {
  const eraseRuralproducerUseCase = makeGetInfosRuralProcerUseCase()

  await eraseRuralproducerUseCase.execute()

  return rep.status(201).send()
}
