import { PrismaRuralProducerRepository } from '@/repositories/prisma/prisma-rural-producer-repository'
import { EditRuralProducerUseCase } from '../edit-rural-producer'

export function makeEditRuralProducerUseCase() {
  const prismaContestRepository = new PrismaRuralProducerRepository()
  const useCase = new EditRuralProducerUseCase(prismaContestRepository)

  return useCase
}
