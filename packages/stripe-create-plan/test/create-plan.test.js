import test from 'ava'

import {
  createPlan
} from '../src/plan'

let plan
test.before(t => {
  plan = createPlan({
    fake: true // use fakeSend
  })
})

test('createPlan', t => {
  t.fail('TODO')
})

test('Plan: construct', t => {
  t.is(typeof plan, 'object')
})
