import {
  send
} from 'micro'

import {
  createCharges
} from '@tecla5/stripe-pay'

const charges = createCharges({
  currency: 'usd'
})

export async function charge(customerId, purchase) {
  try {
    return await charges.create({
      amount: purchase.amount,
      description: purchase.description,
      customer: customerId,
    })
  } catch (err) {
    console.log(err)
    send(res, 400, {
      error: `Customer ${customerId} could not be charged`
    })
  }
}