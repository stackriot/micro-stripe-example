import test from 'ava'

import {
  createCustomer,
  createCustomers,
  createInvoices,
  createPlans,
  createOrders,
  createProducts
}
from '../'

let factories = [
  createCustomer,
  createCustomers,
  createInvoices,
  createPlans,
  createOrders,
  createProducts
]

test('api', t => {
  factories.map(f => {
    t.is(typeof f, 'function')
  })
})