import test from 'ava'

import {
  createPlans
} from '../../'

let plans
test.before(t => {
  plans = createPlans()
})

test('Plans: construct', t => {
  t.is(typeof plans, 'object')
})

test('Plans: create', async t => {
  let details = {
    name: 'Kris',
    amount: 1
  }

  let plan = await plans.create(details)
  t.is(typeof plan, 'object')
})