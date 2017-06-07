import {
  send
} from 'micro'

import {
  createCustomers
} from '@tecla5/stripe-pay'

const customers = createCustomers()

export async function charge(user, stripeToken) {
  try {
    return await customers.create({
      email: user.email,
      description: user.name,
      source: stripeToken.stripeToken
    })
  } catch (err) {
    console.error(err)
    send(res, 400, {
      error: `Stripe customer with card details ${stripeToken.id} could not be created for user ${userId}`
    })
  }
}