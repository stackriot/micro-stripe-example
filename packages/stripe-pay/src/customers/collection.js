import {
  Collection
} from '../collection'

export function createCustomers(config, opts) {
  return new Customers(config, opts)
}

class Customers extends Collection {
  constructor(config, opts = {}) {
    super('Customers', 'customers', config, opts)
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}