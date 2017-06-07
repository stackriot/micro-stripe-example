import test from 'ava'

import {
  createProducts
} from '../../'

let products
test.before(t => {
  products = createProducts()
})

test('Products: construct', t => {
  t.is(typeof products, 'object')
})

test('Products: create', async t => {
  let details = {
    name: 'Kris',
    amount: 1
  }

  let product = await products.create(details)
  t.is(typeof product, 'object')
})