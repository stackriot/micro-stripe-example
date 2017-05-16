const {
  json,
  send
} = require('micro')
const request = require('request')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
const log = process.env.LOG
require('now-logs')(log);

const endpoint = process.env.ENDPOINT
const graphcoolToken = `Bearer ${process.env.GC_PAT}`
const token = process.env.TOKEN

console.log('Init chargeCustomer.js');

module.exports = async(req, res) => {
  const data = await json(req)
  const {
    parse
  } = require('url');
  const {
    query
  } = parse(req.url, true)

  if (token === query.token) {
    const purchase = data.createdNode
    const purchaseId = purchase.id
    const customerId = purchase.purchaseToUser.stripeId

    // Add logs during development, but remove for production
    console.log('Purchase Object');
    console.log(purchase);

    if (purchase.isPaid) {
      send(res, 400, {
        error: `Customer ${customerId} could not be charged, because purchase ${purchaseId} was already paid`
      })
    }

    var charge = stripe.charges.create({
      amount: purchase.amount,
      currency: 'usd',
      description: purchase.description,
      customer: customerId,
    }, (err, charge) => {
      if (err) {
        console.log(err)
        send(res, 400, {
          error: `Customer ${customerId} could not be charged`
        })
      } else {
        const mutation = `mutation {
          updatePurchase(id: "${purchaseId}", isPaid: true) {
            id
          }
        }`

        request.post({
          url: endpoint,
          headers: {
            'Authorization': graphcoolToken,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            query: mutation
          }),
        }).on('error', (e) => {
          send(res, 400, {
            error: `Customer ${customerId} was charged, but purchase ${purchaseId} was not marked as paid`
          })
        }).on('response', (response) => {
          send(res, 200, {
            message: `Customer ${customerId} was charged and purchase ${purchaseId} was marked as paid`
          })
        })
      }
    })
  }
}