import {
  Collection
} from '../collection'

export function createSkus(config, opts) {
  return new Skus(config, opts)
}

export class Skus extends Collection {
  constructor(config, opts = {}) {
    super('Skus', 'skus', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        id: $id,
        currency,
        inventory: obj(),
        price: $money,
        product: $id,
        active: boolean,
        attributes: obj(),
        image: url,
        metadata: obj(),
        package_dimensions: obj()
      },
      required: ['currency', 'inventory', 'price', 'product']
    }
  }
}
