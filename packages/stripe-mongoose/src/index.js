import {
  createCustomers
} from './customers'

export function createStore(opts = {}) {
  return new StripeStore(opts)
}

class StripeStore {
  constructor(opts = {}) {
    this.opts = opts

    this.customers = createCustomers(opts)
    this.invoices = createInvoices(opts)
  }
}