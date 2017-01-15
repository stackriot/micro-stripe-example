const { json, send } = require('micro')
const request = require('request')
const stripe = require('stripe')('__STRIPE_SECRET_KEY__')

const endpoint = 'https://api.graph.cool/simple/v1/__PROJECT_ID__'
const graphcoolToken = 'Bearer __PERMANENT_ACCESS_TOKEN__'

module.exports = async (req, res) => {
  const data = await json(req)
  const purchase = data.createdNode
  const purchaseId = purchase.id
  const customerId = purchase.user.stripeId

  if (purchase.isPaid) {
    send(res, 400, { error: `Customer ${customerId} could not be charged, because purchase ${purchaseId} was already paid` })
  }

  var charge = stripe.charges.create({
    amount: purchase.amount,
    currency: 'usd',
    description: purchase.description,
    customer: customerId,
  }, (err, charge) => {
    if (err) {
      console.log(err)
      send(res, 400, { error: `Customer ${customerId} could not be charged` })
    } else {
      const mutation = `mutation {
        updatePurchase(id: "${purchaseId}", isPaid: true) {
          id
        }
      }`

      request.post({
        url: endpoint,
        headers: {
          'Authorization' : graphcoolToken,
          'content-type': 'application/json',
        },
        body: JSON.stringify({query: mutation}),
      }).on('error', (e) => {
        send(res, 400, { error: `Customer ${customerId} was charged, but purchase ${purchaseId} was not marked as paid` })
      }).on('response', (response) => {
        send(res, 200, { message: `Customer ${customerId} was charged and purchase ${purchaseId} was marked as paid` })
      })
    }
  })
}