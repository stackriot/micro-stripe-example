import test from 'ava'

import {
  createSubscription
} from '../src/subscription'

let subscription
test.before(t => {
  subscription = createSubscription({
    fake: true // use fakeSend
  })
})

test('createSubscription', t => {
  t.fail('TODO')
})

test('Subscription: construct', t => {
  t.is(typeof subscription, 'object')
})
