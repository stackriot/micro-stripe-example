import test from 'ava'

import {
  createOrders
} from '../../'

let orders
test.before(t => {
  orders = createOrders()
})

test('Orders: construct', t => {
  t.is(typeof orders, 'object')
})

test('Orders: create', async t => {
  let details = {
    name: 'Kris',
    amount: 1
  }

  let order = await orders.create(details)
  t.is(typeof order, 'object')
})