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

// amount_refunded: $money,
// description,
// balance_transaction: $id,
// captured: bool,

// destination: str(2, 255),
// dispute: str(2, 255),
// customer: $id,
// failure_code: str(5, 20),
// failure_message: str(5, 100),
// fraud_details: obj(),
// invoice: $id,
// on_behalf_of: str(5, 100),
// order: $id,
// outcome: obj(),
// paid: bool,
// receipt_email: email,
// receipt_number: $id,
// refunded: bool,
// refunds: list(),
// review: $id,
// shipping: obj(),
// source: $id,
// source_transfer: $id,
// statement_descriptor: str(5, 40),
// status: str(2, 10, {
//   enum: ['succeeded', 'pending', 'failed']
// }),
// transfer: $id,
// transfer_group: $id

class Charges extends Collection {
  constructor(config, opts = {}) {
    super('Charge', 'charges', opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        amount: $money,
        currency,
        application_fee: $money, //connect only
        capture: bool,
        description,
        destination: $id, //connect only
        transfer_group: $id, //connect only
        on_behalf_of: $id, //connect only
        metadata: obj(),
        receipt_email: email,
        shipping: obj(),
        customer: $id,
        source: $id,
        statement_descriptor: description
      },
      required: ['amount', 'currency']
    }
  }
}
