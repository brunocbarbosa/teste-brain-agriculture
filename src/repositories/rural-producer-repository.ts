import { RuralProducer } from '@/utils/types/rural-producer'

export interface RuralProducerRepository {
  findById(id: string): Promise<RuralProducer | null>
  findByCpfOrCnpj(cpfOrCnpj: string): Promise<RuralProducer | null>
  save(data: RuralProducer): Promise<void>
  create(data: RuralProducer): Promise<RuralProducer>
}
