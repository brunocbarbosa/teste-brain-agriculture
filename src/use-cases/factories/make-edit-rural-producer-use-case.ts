import { PrismaRuralProducerRepository } from '@/repositories/prisma/prisma-rural-producer-repository'
import { EditRuralProducerUseCase } from '../edit-rural-producer'

export function makeEditRuralProducerUseCase() {
  const prismaRuralProducerRepository = new PrismaRuralProducerRepository()
  const useCase = new EditRuralProducerUseCase(prismaRuralProducerRepository)

  return useCase
}
