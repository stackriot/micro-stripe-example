import {
  Collection,
  str,
  num,
  bool,
  obj,
  list,
  $id
} from '../collection'

export function createCharges(config, opts) {
  return new Charges(config, opts)
}

class Charges extends Collection {
  constructor(config, opts = {}) {
    super('Charge', 'charges', opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        amount: $money,
        amount_refunded: $money,
        description,
        balance_transaction: $id,
        captured: bool,
        currency,
        destination: str(2, 255),
        dispute: str(2, 255),
        customer: $id,
        failure_code: str(5, 20),
        failure_message: str(5, 100),
        fraud_details: obj(),
        invoice: $id,
        on_behalf_of: str(5, 100),
        order: $id,
        outcome: obj(),
        paid: bool,
        receipt_email: email,
        receipt_number: $id,
        refunded: bool,
        refunds: list(),
        review: $id,
        shipping: obj(),
        source: $id,
        source_transfer: $id,
        statement_descriptor: str(5, 40),
        status: str(2, 10, {
          enum: ['succeeded', 'pending', 'failed']
        }),
        transfer: $id,
        transfer_group: $id
      },
      required: ['amount', 'status']
    }
  }
}
