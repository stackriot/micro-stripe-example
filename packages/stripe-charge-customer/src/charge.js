import {
  StripeApi
} from '@tecla5/stripe-service'

import {
  createCharges
} from '@tecla5/stripe-pay'

function createCharge(res, data) {
  return new Charge(res, data)
}

export class Charge extends StripeApi {
  constructor(res, opts = {}) {
    super(res, opts)
    let {
      customerId,
      purchase
    } = opts

    this.purchase = purchase
    this.customerId = customerId
    this.charges = createCharges(opts)
    this.action = charges.create
  }

  prepare(data) {
    let purchase = this.purchase
    return {
      amount: purchase.amount,
      description: purchase.description,
      customer: this.customerId,
    }
  }

  get errorMsg() {
    return `Customer ${this.customerId} could not be charged`
  }
}
