export class TotalAreaError extends Error {
  constructor() {
    super(
      'The sum of agricultural an vegetations area can`t be bigger than total area!!',
    )
  }
}
