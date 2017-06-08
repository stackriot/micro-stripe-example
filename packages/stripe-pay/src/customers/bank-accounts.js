import {
  Collection
} from '../collection'

export function createBankAccounts(config, opts) {
  return new BankAccounts(config, opts)
}

export class BankAccounts extends Collection {
  constructor(config, opts = {}) {
    super('BankAccounts', 'customers', config, opts)

    this.methods = {
      list: 'listSource',
      delete: 'deleteSource',
      create: 'createSource',
      update: 'updateSource',
      retrieve: 'retrieveSource'
    }
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        source: $id,
        metadata: obj()
      },
      required: ['source']
    }
  }
}
