import {
  Collection
} from '../collection'

export function createReversals(config, opts) {
  return new Reversals(config, opts)
}

export class Reversals extends Collection {
  constructor(config, opts = {}) {
    super('Reversals', 'transfers', config, opts)

    this.methods = {
      list: 'listReversal',
      delete: 'deleteReversal',
      create: 'createReversal',
      update: 'updateReversal',
      retrieve: 'retrieveReversal'
    }
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}