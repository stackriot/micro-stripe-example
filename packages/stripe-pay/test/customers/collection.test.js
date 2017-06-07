import test from 'ava'

import {
  createCustomers
} from '../../'

let customers
test.before(t => {
  customers = createCustomers()
})

test('Customers: construct', t => {
  t.is(typeof customers, 'object')
})

test('Customers: create', async t => {
  let profile = {
    name: 'Kris',
    email: 'kris@gmail.com'
  }

  let customer = await customers.create(profile)
  t.is(typeof customer, 'object')
})