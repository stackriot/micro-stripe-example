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
  createCustomer
} from './customer'

module.exports = async(req, res) => {
  let xdata
  try {
    xdata = await xtractData(req)
  } catch (err) {
    return
  }

  let serverApi = createServerApi(res, xdata)
  let customer = createCustomer(res, xdata)

  // on create Stripe customer success, try to update server User with stripe token ID
  customer.customers.onSuccess('create', serverApi.update)

  // create a new Stripe customer
  let created = await customer.execute(xdata)
}
