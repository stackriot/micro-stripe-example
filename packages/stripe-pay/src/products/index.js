import {
  Collection
} from '../collection'

export function createProducts(config, opts) {
  return new Products(config, opts)
}

// return Obj
// ...
// livemode: bool
// skus: list(),
// has_more: bool,
// total_count: num(0, 100),
// created: date,
// updated: date

export class Products extends Collection {
  constructor(config, opts) {
    super('Product', 'products', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        id: $id,
        name,
        active: bool,
        attributes: list(),
        caption: name,
        deactivate_on: list(),
        description,
        images: list(),
        metadata: obj(),
        package_dimensions: obj(),
        shippable: bool,
        url,
      },
      required: ['name']
    }
  }
}
