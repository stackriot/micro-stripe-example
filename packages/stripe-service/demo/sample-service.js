import {
  xtractData
} from './util'

import {
  createServer
} from './server'

module.exports = async(req, res) => {
  let xdata
  try {
    xdata = await xtractData(req)
  } catch (err) {
    return
  }

  let server = createServer(res, xdata)

  console.log('TODO: use stripe-pay', {
    data: xdata
  })
  // call stripe API via stripe-pay

  // let payment = createPayment(res, xdata)
  // payment.charges.onSuccess('create', server.update)
  // let charged = await payment.execute(xdata)
}
