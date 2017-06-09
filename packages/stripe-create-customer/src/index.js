import {
  extractData,
  parse,
  token,
  send,
  json
} from './config'

import {
  create,
  customers,
} from './payment'

import server from './server'

module.exports = async(req, res) => {
  let {
    data,
    query
  } = await extract(req)

  if (token !== query.token) return

  let {
    stripeToken,
    user,
    userId
  } = extractData(data)

  // first, create a new Stripe customer
  let serverUpdate = server.createUpdate(userId)
  payment.customers.onSuccess('create', serverUpdate)

  let customer = await payment.create(user, stripeToken)
}
