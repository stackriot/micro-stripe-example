const {
  required,
  ref,
  refList,
  Mixed
} = require('../_schema/helpers')

module.exports = {
  id: required(String),
  email: String,
  amount: Number,
  amount_returned: Number,
  // charge: ref('Charge'),
  customer: ref('Customer'),
  currency: String,
  description: String,
  items: refList('OrderItem'),
  selected_shipping_method: String,
  shipping_methods: Array,
  shipping: Mixed,
  status: String
}