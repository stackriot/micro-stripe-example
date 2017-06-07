import {
  Collection
} from '../collection'

export function createCharges(config, opts) {
  return new Charges(config, opts)
}

class Charges extends Collection {
  constructor(config, opts = {}) {
    super('Charge', 'charges', opts)
  }
}