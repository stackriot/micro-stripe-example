import {
  Collection
} from '../collection'

export function createSkus(config, opts) {
  return new Skus(config, opts)
}

export class Skus extends Collection {
  constructor(config, opts = {}) {
    super('Skus', 'skus', config, opts)
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}