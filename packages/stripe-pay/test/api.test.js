import test from 'ava'

import {
  createCustomer,
  createCustomers,
  createInvoices,
  createPlans,
  createOrders,
  createProducts,
  createCharges,
  createSkus,
  createSources,
  createTransfers,
  createRecipients,
  createSubscriptions,
  createSubscriptionItems
}
from '../'

let factories = [
  createCustomer,
  createCustomers,
  createInvoices,
  createPlans,
  createOrders,
  createProducts,
  createCharges,
  createSkus,
  createSources,
  createTransfers,
  createRecipients,
  createSubscriptions,
  createSubscriptionItems
]

test('api', t => {
  factories.map(f => {
    t.is(typeof f, 'function')
  })
})