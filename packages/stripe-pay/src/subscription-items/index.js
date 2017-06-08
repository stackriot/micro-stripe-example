import {
  Collection
} from '../collection'

export function createSubscriptionItems(config, opts) {
  return new SubscriptionItems(config, opts)
}

export class SubscriptionItems extends Collection {
  constructor(config, opts = {}) {
    super('SubscriptionItems', 'subscriptionItems', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        plan: $id,
        subscription: $id,
        prorate: bool,
        proration_date,
        quantity: num(0, 100)
      },
      required: ['plan', 'subscription']
    }
  }
}
