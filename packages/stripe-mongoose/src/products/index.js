import {
  Product
} from '../models'

function createProducts(opts) {
  return new Products(opts)
}

class Products extends Collection {
  constructor(opts = {}) {
    super(Product, opts)
  }
}