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

const graphQlServer = new GraphQLServer({
  endpoint,
  token: graphcoolToken
})

function createMutation(purchaseId) {
  return `mutation {
    updatePurchase(id: "${purchaseId}", isPaid: true) {
      id
    }
  }`
}

async function extract(req) {
  const data = await json(req)
  const {
    query
  } = parse(req.url, true)
  return {
    data,
    query
  }
}

function extractData(data) {
  const purchase = data.CardDetails.node
  const purchaseId = purchase.id
  const customerId = purchase.user.stripeId
  return {
    purchase,
    purchaseId,
    customerId
  }
}

const charge = require('./charge')

const {
  parse
} = require('url');

export {
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
}