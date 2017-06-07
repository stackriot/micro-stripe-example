const {
  required,
  ref,
  refList,
  enums
} = require('../_schema/helpers')

module.exports = {
  id: required(String),
  cancel_at_period_end: Boolean,
  canceled_at: Date,
  current_period_start: Date,
  current_period_end: Date,
  customer: ref('Customer'),
  discount: Mixed,
  ended_at: Date,
  items: refList('SubscriptionItem'),
  plan: ref('Plan'),
  quantity: Number,
  start: Date,
  status: enums('trialing', 'active', 'past_due', 'canceled', 'unpaid'),
  tax_percent: Number,
  trial_end: Date,
  trial_start: Date
}