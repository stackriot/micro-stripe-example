import {
  xtractData
} from './util'

import {
  createServer
} from './server'

import {
  createPayment
} from './payment'

module.exports = async(req, res) => {
  let xdata
  try {
    xdata = await xtractData(req)
  } catch (err) {
    return
  }

  let server = createServer(res, xdata)
  let payment = createPayment(res, xdata)

  if (xdata.purchase.isPaid) {
    server.isPaid()
  }
  payment.charges.onSuccess('create', server.update)

  let charged = await payment.charge(customerId, purchase)
}
