const models = require('mongoose-models')
const schemas = [
  'Customer',
  'Invoice',
  'Order',
  'Plan',
  'Product',
  'Subscription',
]

let exported = schemas.reduce((acc, model) => {
  acc[model] = models.require(model)()
  return acc
}, {})

module.exports = exported