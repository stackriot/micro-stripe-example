import {
  createCustomer
} from './customer'

import {
  xtractData,
} from './util'

import server from './server'

module.exports = async(req, res) => {
  let xdata
  try {
    xdata = await xtractData(req)
  } catch (err) {
    return
  }

  let server = createServer(res, xdata)
  let customer = createCustomer(res, xdata)

  // on create Stripe customer success, try to update server User with stripe token ID
  payment.customers.onSuccess('create', server.update)

  // create a new Stripe customer
  let created = await payment.create(user, stripeToken)
}
