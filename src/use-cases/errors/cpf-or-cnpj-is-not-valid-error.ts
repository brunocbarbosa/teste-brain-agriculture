export class CpfOrCnpjIsNotValidError extends Error {
  constructor() {
    super('Your CPF or CNPJ is not valid!!')
  }
}
