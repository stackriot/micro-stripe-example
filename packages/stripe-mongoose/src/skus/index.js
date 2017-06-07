import {
  Sku
} from '../models'

function createSkus(opts) {
  return new Skus(opts)
}

class Skus extends Collection {
  constructor(opts = {}) {
    super(Sku, opts)
  }
}