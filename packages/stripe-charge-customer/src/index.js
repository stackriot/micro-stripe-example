import {
  createMutation,
  extract,
  extractData,
  graphQlServer,
  parse,
  charge,
  endpoint,
  graphcoolToken,
  token,
  stripe,
  send,
  json
} from './config'

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
  // Add logs during development, but remove for production
  console.log('Purchase', purchase)

  if (purchase.isPaid) {
    send(res, 400, {
      error: `Customer ${customerId} could not be charged, because purchase ${purchaseId} was already paid`
    })
  }
  let charged = await charge(customerId, purchase)
  const mutation = createMutation(purchaseId)

  graphQlServer.mutate(mutation)
    .on('error', (e) => {
      send(res, 400, {
        error: `Customer ${customerId} was charged, but purchase ${purchaseId} was not marked as paid`
      })
    }).on('response', (response) => {
      send(res, 200, {
        message: `Customer ${customerId} was charged and purchase ${purchaseId} was marked as paid`
      })
    })
}