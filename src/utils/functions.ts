export function checkCpfAndCnpjIsValid(CpforCnpj: string) {
  if (CpforCnpj.length !== 11 && CpforCnpj.length !== 14) return false

  if (CpforCnpj.length === 11) {
    if (
      CpforCnpj === '00000000000' ||
      CpforCnpj === '11111111111' ||
      CpforCnpj === '22222222222' ||
      CpforCnpj === '33333333333' ||
      CpforCnpj === '44444444444' ||
      CpforCnpj === '55555555555' ||
      CpforCnpj === '66666666666' ||
      CpforCnpj === '77777777777' ||
      CpforCnpj === '88888888888' ||
      CpforCnpj === '99999999999'
    ) {
      return false
    }
  } else {
    if (
      CpforCnpj === '00000000000000' ||
      CpforCnpj === '11111111111111' ||
      CpforCnpj === '22222222222222' ||
      CpforCnpj === '33333333333333' ||
      CpforCnpj === '44444444444444' ||
      CpforCnpj === '55555555555555' ||
      CpforCnpj === '66666666666666' ||
      CpforCnpj === '77777777777777' ||
      CpforCnpj === '88888888888888' ||
      CpforCnpj === '99999999999999'
    ) {
      return false
    }
  }

  return true
}

export function agriculturalAndVegetationAreasSum(
  agriculturalArea: number,
  vegetationArea: number,
  totalArea: number,
) {
  if (agriculturalArea + vegetationArea > totalArea) return false

  return true
}
