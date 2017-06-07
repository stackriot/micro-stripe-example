const {
  required,
  ref,
  refList
} = require('../_schema/helpers')

module.exports = {
  id: required(String),
  active: Boolean,
  currency: String,
  image: String,
  inventory: Mixed,
  package_dimensions: Mixed,
  price: Number,
  product: ref('Product')
}