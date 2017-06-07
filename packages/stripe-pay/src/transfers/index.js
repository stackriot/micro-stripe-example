import {
  Collection
} from '../collection'

export function createTransfers(config, opts) {
  return new Transfers(config, opts)
}

export class Transfers extends Collection {
  constructor(config, opts = {}) {
    super('Transfers', 'transfers', config, opts)
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}