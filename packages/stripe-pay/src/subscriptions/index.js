import {
  Collection
} from '../collection'

import {
  createSubscription
} from './subscription'

export function createSubscriptions(config, opts) {
  return new Subscriptions(config, opts)
}

export class Subscriptions extends Collection {
  constructor(config, opts = {}) {
    super('Subscriptions', 'subscriptions', config, opts)
    this.subscription = createSubscription(config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        application_fee_percent: percent,
        cancel_at_period_end: bool,
        canceled_at: date,
        current_period_end: date,
        current_period_start: date,
        customer: $id,
        discount: obj(),
        ended_at: date,
        items: list(),
        plan: obj(),
        quantity: num(1, 100),
        start: date,
        status: str(2, 8, {
          enum: ['trialing', 'active', 'past_due', 'canceled', 'unpaid']
        }),
        tax_percent: percent,
        trial_end: date,
        trial_start: date
      },
      required: ['display_name', 'type']
    }
  }

  //
}
