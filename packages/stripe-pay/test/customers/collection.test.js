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
  try {
    let customer = await customers.create(profile)
    console.log({
      customer
    })
    t.is(typeof customer, 'object')
  } catch (err) {
    t.fail(err.message)
  }
})
