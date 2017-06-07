import {
  Collection
} from '../collection'

export function createAccounts(config, opts) {
  return new Accounts(config, opts)
}

export class Accounts extends Collection {
  constructor(config, opts = {}) {
    super('Accounts', 'accounts', config, opts)
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}