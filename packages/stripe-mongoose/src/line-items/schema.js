const {
  required,
  ref,
  refList,
  enums
} = require('../_schema/helpers')

// See: https://stripe.com/docs/api#invoice_line_item_object
module.exports = {
  id: required(String),
  currency: String,
  discountable: Boolean,
  date: Date,
  type: enums('subscription', 'invoiceitem'),
  proration: Boolean,
  quantity: Number,
  subscription: ref('Subscription'),
  // subscription_item: ref('SubscriptionItem'),
  description: String
}