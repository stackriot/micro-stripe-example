import stripe from '../stripe'

import {
  Loggable
} from '../loggable'

export function createCustomer() {
  return new Customer()
}
export class Customer extends Loggable {
  constructor(profile, opts) {
    super('Customer', opts)
    this.profile = profile
  }

  get id() {
    return this.profile.id
  }

  async subscribeTo(plan, items) {
    try {
      let subscription = this._createSubscription(plan, items)
      return await subscriptions.create(subscription)
    } catch (err) {
      this.handleError(err)
    }
  }

  _createSubscription(plan, items) {
    return Object.assign({}, plan, {
      customer: this.id,
      items
    })
  }
}