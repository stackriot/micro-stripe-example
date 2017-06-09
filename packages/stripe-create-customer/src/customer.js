import {
  send
} from 'micro'

import {
  createCustomers
} from '@tecla5/stripe-pay'

function createCustomer(res, data) {
  return new Customer(res, data)
}

export class Customer {
  constructor(res, opts = {}) {
    let {
      stripeToken,
      userId
    } = opts

    this.res = res
    this.stripeToken = stripeToken
    this.userId = userId
    this.customers = createCustomers(opts)
  }

  async create(user, stripeToken) {
    try {
      return await customers.create({
        email: user.email,
        description: user.name,
        source: stripeToken.stripeToken
      })
    } catch (err) {
      this.error(err)
    }
  }

  error(err) {
    let stripeToken = this.stripeToken
    console.error(err)
    send(this.res, 400, {
      error: `Stripe customer with card details ${stripeToken.id} could not be created for user ${userId}`
    })
  }
}
