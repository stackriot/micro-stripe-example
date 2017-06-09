import {
  StripeApi
} from '@tecla5/stripe-service'

import {
  createCharges
} from '@tecla5/stripe-pay'

function createPayment(res, data) {
  return new Payment(res, data)
}

export class Payment extends StripeApi {
  constructor(res, opts = {}) {
    super(res, opts)
    let {
      customerId,
      purchase
    } = opts

    this.purchase = purchase
    this.customerId = customerId
    this.customers = createCharges(opts)
    this.charges = charges
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
