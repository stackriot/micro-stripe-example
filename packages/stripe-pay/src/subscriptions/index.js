import {
  Collection
} from '../collection'

import {
  createSubscription
} from './subscription'

export function createSubscriptions(config, opts) {
  return new Subscriptions(config, opts)
}

// return Object
// cancel_at_period_end: bool,
// canceled_at: date,
// current_period_end: date,
// current_period_start: date,
// discount: obj(),
// ended_at: date,
// status: str(2, 8, {
//   enum: ['trialing', 'active', 'past_due', 'canceled', 'unpaid']
// }),
// start: date,
// trial_start: date

export class Subscriptions extends Collection {
  constructor(config, opts = {}) {
    super('Subscriptions', 'subscriptions', config, opts)
    this.subscription = createSubscription(config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        customer: $id,
        application_fee_percent: percent,
        coupon: $id,
        items: list(),
        metadata: obj(),
        plan: $id,
        quantity: num(1, 100),
        source: $id,
        tax_percent: percent,
        trial_end: date,
        trial_period_days: num(0, 200),
      },
      required: ['customer', 'display_name', 'type']
    }
  }
}
