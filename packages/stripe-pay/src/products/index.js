import {
  Collection
} from '../collection'

export function createProducts(config, opts) {
  return new Products(config, opts)
}

export class Products extends Loggable {
  constructor(config, opts) {
    super('Product', 'products', config, opts)
  }
}