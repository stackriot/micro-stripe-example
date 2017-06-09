import {
  xtractData
} from './util'

import {
  createServerApi
} from './graphql/api'

import {
  createCharge
} from './charge'

module.exports = async(req, res) => {
  let xdata
  try {
    xdata = await xtractData(req)
  } catch (err) {
    return
  }

  let serverApi = createServerApi(res, xdata)
  let charge = createCharge(res, xdata)

  if (xdata.purchase.isPaid) {
    server.isPaid()
  }
  charge.charges.onSuccess('create', serverApi.update)
  let charged = await charge.create(xdata)
}
