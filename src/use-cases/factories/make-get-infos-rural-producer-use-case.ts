import { PrismaRuralProducerRepository } from '@/repositories/prisma/prisma-rural-producer-repository'
import { GetInfosRuralProducerUseCase } from '../get-infos-rural-producer'

export function makeGetInfosRuralProcerUseCase() {
  const prismaContestRepository = new PrismaRuralProducerRepository()
  const useCase = new GetInfosRuralProducerUseCase(prismaContestRepository)

  return useCase
}
