import test from 'ava'

import {
  createAccounts
} from '../../'

let accounts
test.before(t => {
  accounts = createAccounts()
})

test('Accounts: construct', t => {
  t.is(typeof accounts, 'object')
})

test('Accounts: create', async t => {
  let accountDetails = {
    name: 'Kris'
  }
  try {
    let account = await accounts.create(accountDetails)
    console.log({
      account
    })
    t.is(typeof account, 'object')
  } catch (err) {
    t.fail(err.message)
  }
})
