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

test('Accounts: construct', t => {
  t.is(typeof accounts, 'object')
})
