import {
  xtractData
} from '@tecla5/stripe-api'

import {
  unpack
} from './util'

import {
  createServerApi
} from './graphql/api'

import {
  createPlan
} from './plan'

module.exports = async(req, res) => {
  let xdata
  try {
    xdata = await xtractData(req, unpack)
  } catch (err) {
    return
  }

  let serverApi = createServerApi(res, xdata)
  let plan = createPlan(res, xdata)

  plan.create.onSuccess('create', serverApi.update)

  let charged = await plan.execute(xdata)
}
