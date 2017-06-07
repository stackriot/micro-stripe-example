import stripe from '../stripe'

import {
  Loggable
} from '../loggable'

export function createOrders() {
  return new Orders()
}

export class Orders extends Loggable {
  constructor(config, opts) {
    super('Orders', opts)
    this.config = config
    this.opts = opts

    this.orders = stripe.orders

    // default in-memory storage
    this.store = {}
  }

  extractId(order) {
    return order.id
  }

  // default in-memory storage
  async storeOrder(order) {
    let id = this.extractId(order)
    this.store[id] = order
  }


  // See: https://stripe.com/docs/api/node#create_order
  // profile
  // currency: 'usd',
  //   items: [
  //     {
  //       type: 'sku',
  //       parent: '-Km0jSQ_dFCM7bkuw242'
  //     }
  //   ],
  //   shipping: {
  //   }
  async create(order) {
    try {
      let validated = await this.validate(order)
      if (!validated) {
        this.handleError('validation error', validated)
      }
      return await this.orders.create(order)
    } catch (err) {
      return err
    }
  }

  async validate(order) {
    return typeof order === 'object'
  }
}