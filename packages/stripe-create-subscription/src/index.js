import {
  xtractData
} from '@tecla5/stripe-api'

import {
  createSubscription
} from './subscription'

import {
  unpack
} from './util'

import {
  createServerApi
} from './graphql/api'

module.exports = async(req, res) => {
  let xdata
  try {
    xdata = await xtractData(req, {
      unpack
    })
  } catch (err) {
    return
  }

  let serverApi = createServerApi(res, xdata)
  let subscription = createSubscription(res, xdata)
  subscription.subscriptions.onSuccess('create', serverApi.update)

  let subscribed = await subscription.subscribe(xdata)
}
