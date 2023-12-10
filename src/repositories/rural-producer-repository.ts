import { RuralProducer } from '@/utils/rural-producer'

export interface RuralProducerRepository {
  findByCpfOrCnpj(cpfOrCnpj: string): Promise<RuralProducer | null>
  create(data: RuralProducer): Promise<RuralProducer>
}
