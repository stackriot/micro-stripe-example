import test from 'ava'

import {
  createSubscriptions
} from '../../'

let subscriptions
test.before(t => {
  subscriptions = createSubscriptions()
})

test('Subscriptions: construct', t => {
  t.is(typeof subscriptions, 'object')
})

test('Subscriptions: create', async t => {
  let details = {
    name: 'Kris',
    amount: 1
  }

  let subscription = await subscriptions.create(details)
  t.is(typeof subscription, 'object')
})