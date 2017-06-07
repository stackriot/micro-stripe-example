const {
  required,
  ref,
  refList
} = require('../_schema/helpers')

module.exports = {
  id: required(String),
  currency: String,
  discountable: Boolean,
  date: Date,
  type: enum('subscription'),
  proration: Boolean,
  quantity: Integer,
  subscription: ref('Subscription'),
  // subscription_item: ref('SubscriptionItem'),
  description: String
}