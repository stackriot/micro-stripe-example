import {
  Collection
} from '../collection'

export function createReversals(config, opts) {
  return new Reversals(config, opts)
}

export class Reversals extends Collection {
  constructor(config, opts = {}) {
    super('Reversals', 'transfers', config, opts)

    this.methods = {
      list: 'listReversal',
      delete: 'deleteReversal',
      create: 'createReversal',
      update: 'updateReversal',
      retrieve: 'retrieveReversal'
    }
  }

  // https://stripe.com/docs/api#create_transfer_reversal
  get schema() {
    return {
      type: 'object',
      properties: {
        id: $id,
        amount: $money,
        description,
        metadata: obj(),
        refund_application_fee: bool,
      },
      required: ['id']
    }
  }
}
