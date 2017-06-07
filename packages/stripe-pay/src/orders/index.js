import {
  Collection
} from '../collection'

export function createOrders(config, opts) {
  return new Orders(config, opts)
}

export class Orders extends Collection {
  constructor(config, opts) {
    super('Orders', 'orders', config, opts)
  }

  // https://stripe.com/docs/api/node#pay_order
  // ("or_1ARzqV2eZvKYlo2CQ9w8eFiZ", {
  //   source: "tok_189gHa2eZvKYlo2CCf8EJpS3" // obtained with Stripe.js
  // }
  async pay(id, source) {
    try {
      // TODO: lookup order by id
      // TODO: lookup source by id
      await this.validatePayment(id, source)

      let paid = await this.orders.pay(id, {
        source
      })
      this.notify('paid', paid)
      return paid
    } catch (err) {
      this.handleError(err, {
        id,
        order
      })
    }
  }

  // TODO
  async validatePayment(id, source) {
    return true
  }

  // validate order being created
  async validateNew(data) {
    return typeof data === 'object'
  }
}