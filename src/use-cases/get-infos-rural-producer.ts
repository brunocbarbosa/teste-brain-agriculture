import { RuralProducerRepository } from '@/repositories/rural-producer-repository'
import { RuralProducerNotFoundError } from './errors/rural-producer-not-found-error'
import { PlantedCropsNotFoundError } from './errors/planted-crops-not-found-error copy'
import { PlantedCropsEnum } from '@/utils/planted-crops-enum'

interface StateGraficTotal {
  state: string
  total: number
}
interface PlantedCropsTotal {
  name: PlantedCropsEnum
  total: number
}

interface getinfosRuralProducerUseCaseResponse {
  totalFarms: number
  totalAreaSum: number
  totalAgriculturalArea: number
  totalVegetationArea: number
  stateGraficTotal: StateGraficTotal[]
  plantedCropsTotal: PlantedCropsTotal[]
}

export class GetInfosRuralProducerUseCase {
  constructor(private ruralProducerRepository: RuralProducerRepository) {}

  async execute(): Promise<getinfosRuralProducerUseCaseResponse> {
    const ruralProducers =
      await this.ruralProducerRepository.findAllRuralProducer()

    if (!ruralProducers) throw new RuralProducerNotFoundError()

    const plantedCrops =
      await this.ruralProducerRepository.findAllPlantedCrops()

    if (!plantedCrops) throw new PlantedCropsNotFoundError()

    const totalFarms: number = ruralProducers.length

    let totalAreaSum = 0

    let totalAgriculturalArea = 0
    let totalVegetationArea = 0

    const stateGraficTotal: StateGraficTotal[] = [
      {
        state: 'AC',
        total: 0,
      },
      {
        state: 'AL',
        total: 0,
      },
      {
        state: 'AP',
        total: 0,
      },
      {
        state: 'AM',
        total: 0,
      },
      {
        state: 'BA',
        total: 0,
      },
      {
        state: 'CE',
        total: 0,
      },
      {
        state: 'GO',
        total: 0,
      },
      {
        state: 'MA',
        total: 0,
      },
      {
        state: 'MT',
        total: 0,
      },
      {
        state: 'MS',
        total: 0,
      },
      {
        state: 'MG',
        total: 0,
      },
      {
        state: 'PA',
        total: 0,
      },
      {
        state: 'PB',
        total: 0,
      },
      {
        state: 'PR',
        total: 0,
      },
      {
        state: 'PE',
        total: 0,
      },
      {
        state: 'PI',
        total: 0,
      },
      {
        state: 'RJ',
        total: 0,
      },
      {
        state: 'RN',
        total: 0,
      },
      {
        state: 'RS',
        total: 0,
      },
      {
        state: 'RO',
        total: 0,
      },
      {
        state: 'RR',
        total: 0,
      },
      {
        state: 'AC',
        total: 0,
      },
      {
        state: 'SC',
        total: 0,
      },
      {
        state: 'SP',
        total: 0,
      },
      {
        state: 'SE',
        total: 0,
      },
      {
        state: 'TO',
        total: 0,
      },
      {
        state: 'DF',
        total: 0,
      },
    ]

    const plantedCropsTotal: PlantedCropsTotal[] = [
      {
        name: 'ALGODAO',
        total: 0,
      },
      {
        name: 'CAFE',
        total: 0,
      },
      {
        name: 'CANA_DE_ACUCAR',
        total: 0,
      },
      {
        name: 'MILHO',
        total: 0,
      },
      {
        name: 'SOJA',
        total: 0,
      },
    ]

    ruralProducers.forEach((ruralProducer) => {
      totalAreaSum += ruralProducer.total_area
      stateGraficTotal.forEach((state) => {
        if (state.state === ruralProducer.state) {
          state.total += 1
        }
      })
      totalAgriculturalArea += ruralProducer.agricultural_area
      totalVegetationArea += ruralProducer.vegetation_area
    })

    plantedCrops.forEach((plantedCrop) => {
      plantedCropsTotal.forEach((crop) => {
        if (crop.name === plantedCrop.name) {
          crop.total += 1
        }
      })
    })

    return {
      totalFarms,
      totalAreaSum,
      totalAgriculturalArea,
      totalVegetationArea,
      stateGraficTotal,
      plantedCropsTotal,
    }
  }
}
