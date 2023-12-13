import { PrismaRuralProducerRepository } from '@/repositories/prisma/prisma-rural-producer-repository'
import { RegisterRuralProducerUseCase } from '../register-rural-producer'

export function makeRegisterRuralProcerUseCase() {
  const prismaContestRepository = new PrismaRuralProducerRepository()
  const useCase = new RegisterRuralProducerUseCase(prismaContestRepository)

  return useCase
}
