import {
  Collection
} from '../collection'

export function createProducts(config, opts) {
  return new Products(config, opts)
}

export class Products extends Collection {
  constructor(config, opts) {
    super('Product', 'products', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        active: bool,
        attributes: list(),
        caption: name,
        created: date,
        description,
        images: list(),
        name,
        package_dimensions: obj(),
        shippable: bool,
        skus: list(),
        has_more: bool,
        total_count: num(0, 100),
        url,
        updated: date
      },
      required: ['name']
    }
  }
}
