import {
  send
} from 'micro'

import {
  createCustomers
} from '@tecla5/stripe-pay'

function createPayment(res, data) {
  return new Payment(res, data)
}

export class Payment {
  constructor(res, {
    stripeToken,
    userId
  }) {
    this.res = res
    this.stripeToken = stripeToken
    this.userId = userId
    this.customers = createCustomers()
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
