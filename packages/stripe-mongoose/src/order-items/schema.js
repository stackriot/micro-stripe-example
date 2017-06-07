const {
  required,
  ref,
  refList
} = require('../_schema/helpers')

module.exports = {
  name: required(String),
  email: required(String),
  description: String
}