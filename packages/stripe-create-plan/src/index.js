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
  let plan = createPlan(res, xdata)

  plan.create.onSuccess('create', server.update)

  let charged = await plan.create(xdata.plan)
}
