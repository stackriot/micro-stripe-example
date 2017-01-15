const { json, send } = require('micro')
const request = require('request')
const stripe = require('stripe')('__STRIPE_SECRET_KEY__')

const endpoint = 'https://api.graph.cool/simple/v1/__PROJECT_ID__'
const graphcoolToken = 'Bearer __PERMANENT_ACCESS_TOKEN__'

module.exports = async (req, res) => {
  const data = await json(req)
  const cardDetails = data.createdNode
  const cardDetailsId = cardDetails.id

  const user = cardDetails.user
  const userId = user.id


  // first, create a new Stripe customer
  stripe.customers.create({
      email: user.email,
      description: user.name,
      source: cardDetails.cardToken
    }, (err, customer) => {
      if (err) {
        console.log(err)
        send(res, 400, { error: `Stripe customer with card details ${cardDetailsId} could not be created for user ${userId}` })
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
            'Authorization' : graphcoolToken,
            'content-type': 'application/json',
          },
          body: JSON.stringify({query: updateUser}),
        }).on('error', (e) => {
          send(res, 400, { error: `User ${userId} could not be updated` })
        }).on('response', (response) => {
          send(res, 200, { message: `User ${userId} was successfully registered at Stripe` })
        })
      }
    }
  )
}