import {
  Collection
} from '../collection'

export function createInvoices(config, opts) {
  return new Invoices(config, opts)
}

class Invoices extends Collection {
  constructor(config, opts = {}) {
    super('Invoice', 'invoices', config, opts)
  }

  async delete(id) {
    this.handleError('Invoices can NOT be deleted', id)
  }

  // amount_due
  // application_fee
}
