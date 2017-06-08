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

  get schema() {
    return {
      type: 'object',
      properties: {
        amount_due: $money,
        application_fee: $money,
        attempt_count: num(0, 20),
        attempted: bool,
        charge: $id,
        closed: bool,
        currency,
        customer: $id,
        date,
        description,
        discount: obj(),
        ending_balance: money,
        forgiven: bool,
        lines: list(),
        paid: bool,
        period_end: date,
        period_start: date,
        receipt_number: $id,
        starting_balance: money,
        statement_descriptor: description,
        subscription: $is,
        subscription_proration_date: date,
        subtotal: $money,
        tax: $money,
        tax_percent: percent,
        total: $money,
        webhooks_delivered_at: date
      },
      required: ['amount_due', 'total']
    }
  }
}
