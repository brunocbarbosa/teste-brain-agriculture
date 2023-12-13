import { PrismaRuralProducerRepository } from '@/repositories/prisma/prisma-rural-producer-repository'
import { DeleteRuralProducerUseCase } from '../delete-rural-producer'

export function makeEraseRuralProcerUseCase() {
  const prismaContestRepository = new PrismaRuralProducerRepository()
  const useCase = new DeleteRuralProducerUseCase(prismaContestRepository)

  return useCase
}
