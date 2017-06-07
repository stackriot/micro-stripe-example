const {
  required,
  ref,
  refList
} = require('../_schema/helpers')

module.exports = {
  name: required(String),
  email: required(String),
  description: String,
  amount_due: Number,
  attempt_count: Number,
  attempted: Boolean,
  closed: Boolean,
  currency: String,
  date: Date,
  ending_balance: Number,
  forgiven: Boolean,
  charge: ref('Charge'),
  lines: refList('LineItem')
}