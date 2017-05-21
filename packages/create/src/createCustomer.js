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

console.log('Init createCustomer.js');

module.exports = async(req, res) => {
  const data = await json(req)
  const {
    parse
  } = require('url');
  const {
    query
  } = parse(req.url, true)

  if (token === query.token) {
    const stripeToken = data.Purchase.node
    const user = stripeToken.stripeTokenToUser
    const userId = user.id
    // Add logs during development, but remember to remove them for production
    console.log('Stripe Token object');
    console.log(stripeToken);

    // TODO: don't create customer if stripe id already exists

    // first, create a new Stripe customer
    stripe.customers.create({
      email: user.email,
      description: user.name,
      source: stripeToken.stripeToken
    }, (err, customer) => {
      if (err) {
        console.log(err)
        send(res, 400, {
          error: `Stripe customer with card details ${stripeToken.id} could not be created for user ${userId}`
        })
      } else {
        // then update user with obtained Stripe customer id
        const updateUser = `mutation {
            updateUser(id: "${userId}", stripeId: "${customer.id}") {
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
            query: updateUser
          }),
        }).on('error', (e) => {
          send(res, 400, {
            error: `User ${userId} could not be updated`
          })
        }).on('response', (response) => {
          send(res, 200, {
            message: `User ${userId} was successfully registered at Stripe`
          })
        })
      }
    })
  }
}