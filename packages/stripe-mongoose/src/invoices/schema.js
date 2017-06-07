const {
  required,
  ref,
  refList
} = require('../_schema/helpers')

module.exports = {
  name: required(String),
  email: required(String),
  description: String,
  amount_due: Integer,
  attempt_count: Integer,
  attempted: Boolean,
  closed: Boolean,
  currency: String,
  date: Date,
  ending_balance: Integer,
  forgiven: Boolean,
  charge: ref('Charge'),
  lines: refList('LineItem')
}