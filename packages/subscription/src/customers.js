import stripe from '../stripe'

import {
  Loggable
} from '../loggable'

export function createCustomers() {
  return new Customers()
}

export class Customers extends Loggable {
  constructor(config, opts) {
    super('Customer', opts)
    this.config = config
    this.opts = opts

    // default in-memory storage
    this.customers = {}
  }

  extractId(customer) {
    return customer.email
  }

  // default in-memory storage
  async storeCustomer(customer) {
    let id = this.extractId(customer)
    this.customers[id] = customer
  }

  // profile
  // {
  //   email: "jenny.rosen@example.com",
  // }
  async create(profile) {
    try {
      let validated = await this.validate(profile)
      if (!validated) {
        this.handleError('validation error', validated)
      }
      return await stripe.customers.create(profile)
    } catch (err) {
      return err
    }
  }

  async validate(profile) {
    return typeof profile === 'object'
  }
}