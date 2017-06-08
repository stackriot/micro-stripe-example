import {
  Collection
} from '../collection'

export function createTransfers(config, opts) {
  return new Transfers(config, opts)
}

export class Transfers extends Collection {
  constructor(config, opts = {}) {
    super('Transfers', 'transfers', config, opts)
  }

  // https://stripe.com/docs/api#create_transfer
  get schema() {
    return {
      type: 'object',
      properties: {
        amount: $money,
        currency,
        destination: $id,
        metadata: obj(),
        source_transaction: $id
      },
      required: ['amount', 'currency', 'destination']
    }
  }
}
