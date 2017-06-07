import {
  Invoice
} from '../models'

function createInvoices(opts) {
  return new Invoices(opts)
}

class Invoices extends Collection {
  constructor(opts = {}) {
    super(Invoice, opts)
  }

  async pay() {
    this.handleError('Invoices.pay: TODO')
  }
}