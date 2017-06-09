import {
  createMutation,
  extract,
  extractData,
  parse,
  token,
  stripe,
  send,
  json
} from './config'

import {
  createServer
} from './server'

import payment from './payment'

module.exports = async(req, res) => {
  let {
    data,
    query
  } = await extract(req)

  if (token !== query.token) return
  let {
    purchase,
    purchaseId,
    customerId
  } = extractData(data)

  let server = createServer(customerId, purchase)

  if (purchase.isPaid) {
    server.error()
  }
  payment.charges.onSuccess('create', server.update)

  let charged = await payment.charge(customerId, purchase)
}
