import factories from './factories'

export function createStore(opts = {}) {
  return new StripeStore(opts)
}

const entities = [
  'customers',
  'invoices'
]


class StripeStore {
  constructor(opts = {}) {
    this.opts = opts

    entities.map(entity => {
      let className = _.classify(entity)
      let factoryMethod = `create${className}`
      let factoryFun = factories[factoryMethod]
      this[entity] = factoryFun(opts)
    })
  }
}