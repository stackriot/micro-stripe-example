const {
  required,
  ref,
  refList
} = require('../_schema/helpers')

// See: https://stripe.com/docs/api#customer_object
module.exports = {
  id: required(String),
  name: required(String),
  email: required(String),
  description: String,
  account_balance: Integer,
  currency: String,
  delinquent: Boolean,
  business_vat_id: String,
  sources: refList('Sources'),
  subscriptions: refList('Subscriptions')
}