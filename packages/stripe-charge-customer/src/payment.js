import {
  send
} from 'micro'

import {
  createCharges
} from '@tecla5/stripe-pay'

const charges = createCharges({
  currency: 'usd'
})

function createPayment(res, data) {
  return new Payment(res, data)
}

export class Payment {
  constructor(res, {
    customerId,
    purchase
  }) {
    this.res = res
    this.purchase = purchase
    this.customerId = customerId
    this.customers = createCustomers()
    this.charges = charges
  }

  async charge() {
    let purchase = this.purchase
    let customerId = this.customerId
    try {
      return await this.charges.create({
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
      error: `Customer ${this.customerId} could not be charged`
    })

  }
}
