import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducerNotFoundError } from './errors/rural-producer-not-found-error'

interface deleteRuralProducerUseCaseRequest {
  ruralProducerId: string
}

interface deleteRuralProducerUseCaseResponse {}

export class DeleteRuralProducerUseCase {
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async execute({
    ruralProducerId,
  }: deleteRuralProducerUseCaseRequest): Promise<deleteRuralProducerUseCaseResponse> {
    const producerRural =
      await this.ruralProducerRepository.findById(ruralProducerId)

    if (!producerRural) throw new RuralProducerNotFoundError()

    await this.ruralProducerRepository.delete(producerRural)

    return {}
  }
}
