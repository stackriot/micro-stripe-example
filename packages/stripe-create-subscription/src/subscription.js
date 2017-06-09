import {
  createSubscriptions
} from '@tecla5/stripe-pay'

import {
  StripeApi
} from '@tecla5/stripe-service'

function createSubscription(res, data) {
  return new Subscription(res, data)
}

export class Subscription extends StripeApi {
  constructor(res, opts = {}) {
    super(res, opts)
    this.subscriptions = createSubscriptions(opts)
    this.action = this.subscriptions.create
  }

  get errorMsg() {
    return `Subscription ${this.data.customerId} could not be created`
  }
}
