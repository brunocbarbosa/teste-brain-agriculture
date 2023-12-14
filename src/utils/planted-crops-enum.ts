export const PlantedCropsEnum: {
  SOJA: 'SOJA'
  MILHO: 'MILHO'
  ALGODAO: 'ALGODAO'
  CAFE: 'CAFE'
  CANA_DE_ACUCAR: 'CANA_DE_ACUCAR'
} = {
  SOJA: 'SOJA',
  MILHO: 'MILHO',
  ALGODAO: 'ALGODAO',
  CAFE: 'CAFE',
  CANA_DE_ACUCAR: 'CANA_DE_ACUCAR',
}

export type PlantedCropsEnum =
  (typeof PlantedCropsEnum)[keyof typeof PlantedCropsEnum]
