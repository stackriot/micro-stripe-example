import {
  createPayment
} from './payment'

import {
  xtractData,
} from './util'

import server from './server'

module.exports = async(req, res) => {
  let xdata = await xtractData(req)

  let server = createServer(res, xdata)
  let payment = createPayment(res, xdata)

  // on create Stripe customer success, try to update server User with stripe token ID
  payment.customers.onSuccess('create', server.update)

  // create a new Stripe customer
  let customer = await payment.create(user, stripeToken)
}
