import {
  send
} from 'micro'

import {
  createSubscriptions
} from '@tecla5/stripe-pay'

function createSubscription(res, data) {
  return new Subscription(res, data)
}

export class Subscription {
  constructor(res, opts = {}) {
    let {} = opts

    this.res = res
    // this.purchase = purchase
    // this.customerId = customerId
    this.subscriptions = createSubscriptions(opts)
  }

  async subscribe() {
    // let purchase = this.purchase
    // let customerId = this.customerId
    try {
      return await this.subscriptions.create({
        amount: purchase.amount,
        description: purchase.description,
        customer: customerId,
      })
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError(err) {
    console.log(err)
    send(this.res, 400, {
      error: `Subscription ${this.customerId} could not be created`
    })

  }
}
