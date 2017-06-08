import test from 'ava'

import {
  createAccounts,
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
  // createRecipients, - DEPRECATED
  createSubscriptions,
  createSubscriptionItems
}
from '../'

let factories = [
  createAccounts,
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
  // createRecipients, - DEPRECATED
  createSubscriptions,
  createSubscriptionItems
]

test('api', t => {
  factories.map(f => {
    t.is(typeof f, 'function')
  })
})
