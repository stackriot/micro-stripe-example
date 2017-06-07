const {
  required,
  ref,
  refList,
  enums
} = require('../_schema/helpers')

module.exports = {
  id: required(String),
  name: String,
  amount: Number,
  currency: String,
  interval: enums('day', 'week', 'month', 'year'),
  interval_count: Number,
  description: String,
  statement_descriptor: String,
  trial_period_days: Number
}