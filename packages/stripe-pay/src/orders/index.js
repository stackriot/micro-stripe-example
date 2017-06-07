import stripe from '../stripe'

import {
  Loggable
} from '../loggable'

export function createOrders(config, opts) {
  return new Orders(config, opts)
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


  async retrieve(id) {
    try {
      return await this.orders.retrieve(id)
    } catch (err) {
      this.handleError(err, {
        id
      })
    }
  }

  async update(id, order) {
    try {
      return await this.orders.update(id, order)
    } catch (err) {
      this.handleError(err, {
        id,
        order
      })
    }
  }

  // https://stripe.com/docs/api/node#pay_order
  // ("or_1ARzqV2eZvKYlo2CQ9w8eFiZ", {
  //   source: "tok_189gHa2eZvKYlo2CCf8EJpS3" // obtained with Stripe.js
  // }
  async pay(id, source) {
    try {
      return await this.orders.pay(id, {
        source
      })
    } catch (err) {
      this.handleError(err, {
        id,
        order
      })
    }
  }

  // list all orders
  async list(criteria = {}) {
    try {
      return await this.orders.list(criteria)
    } catch (err) {
      this.handleError(err, {
        criteria
      })
    }
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