const {
  required,
  ref,
  refList
} = require('../_schema/helpers')

module.exports = {
  id: required(String),
  name: required(String),
  description: String,
  active: Boolean,
  attributes: Array,
  caption: String,
  images: Array,
  shippable: Boolean,
  package_dimensions: Mixed,
  skus: refList('Sku'),
  url: String
}