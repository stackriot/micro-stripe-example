import stripe from '../stripe'

import {
  Loggable
} from '../loggable'

export function createProducts(config, opts) {
  return new Products(config, opts)
}

export class Products extends Loggable {
  constructor(config, opts) {
    super('Product', opts)
    this.products = stripe.products
  }

  // create
  async create(product) {}
  // retrieve
  async retrieve(id) {

  }

  // update
  async update(id, product) {}

  // delete
  async delete(id) {}

  // list
  async list(criteria) {}
}