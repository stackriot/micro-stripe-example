const {
  json,
  send
} = require('micro')

const stripe = require('stripe')(process.env.STRIPE_SECRET)
const log = process.env.LOG
require('now-logs')(log);

const endpoint = process.env.ENDPOINT
const graphcoolToken = `Bearer ${process.env.GC_PAT}`
const token = process.env.TOKEN
const charge = require('./charge')
const {
  parse
} = require('url');

function createMutation(userId, customer) {
  return `mutation {
    updateUser(id: "${userId}", stripeId: "${customer.id}") {
      id
    }
  }`
}

const graphQlServer = new GraphQLServer({
  endpoint,
  token: graphcoolToken
})

function extractData(data) {
  const stripeToken = data.Purchase.node
  const user = stripeToken.stripeTokenToUser
  const userId = user.id
  return {
    stripeToken,
    user,
    userId
  }
}

export {
  graphQlServer,
  createMutation,
  extractData,
  parse,
  charge,
  endpoint,
  graphcoolToken,
  token,
  stripe,
  send,
  json
}