import {
  json,
  send
} from 'micro'

import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_SECRET)
const log = process.env.LOG
import nowLog from 'now-logs'
nowLog(log)

import {
  parse
} from 'url'

export {
  parse,
  stripe,
  send,
  json
}
