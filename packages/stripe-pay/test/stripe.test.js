import test from 'ava'

import stripe from '../src/stripe'

test('stripe is configured', t => {
  t.truthy(stripe.customers)

  t.is(typeof stripe.customers, 'object')

  t.is(typeof stripe.customers.createSource, 'function')
})
