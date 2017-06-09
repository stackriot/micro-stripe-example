import {
  StripeApi
} from '@tecla5/stripe-service'

import {
  createCustomers
} from '@tecla5/stripe-pay'

function createCustomer(res, data) {
  return new Customer(res, data)
}

export class Customer extends StripeApi {
  constructor(res, opts = {}) {
    super(res, opts)
    let {
      stripeToken,
      userId
    } = opts

    this.stripeToken = stripeToken
    this.userId = userId

    this.customers = createCustomers(opts)
    this.action = customers.create
  }

  prepare(data) {
    let {
      user,
      stripeToken
    } = data
    return {
      email: user.email,
      description: user.name,
      source: stripeToken.stripeToken
    }
  }

  get errorMsg() {
    return `Stripe customer with card details ${stripeToken.id} could not be created for user ${userId}`
  }
}
