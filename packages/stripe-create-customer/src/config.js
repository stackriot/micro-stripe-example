const {
  json,
  send
} = require('micro')

const stripe = require('stripe')(process.env.STRIPE_SECRET)
const log = process.env.LOG
require('now-logs')(log);

const token = process.env.TOKEN
const {
  parse
} = require('url');

export {
  extractData,
  parse,
  token,
  stripe,
  send,
  json
}
