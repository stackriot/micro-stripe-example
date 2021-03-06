const {
  required,
  ref,
  refList
} = require('../_schema/helpers')

module.exports = {
  id: required(String),
  plan: ref('Plan'),
  quantity: Number
}