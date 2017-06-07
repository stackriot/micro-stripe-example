import stripe from '../stripe'

import {
  Loggable
} from '../loggable'

import {
  createSubscribe
} from './subscribe'

export function createSubscriptions(config, opts) {
  return new Subscriptions(config, opts)
}

export class Subscriptions extends Loggable {
  constructor(config, opts = {}) {
    super(config, opts)
    this.subscriptions = stripe.subscriptions
    this.subscribe = createSubscribe(this, config, opts)
  }

  async update(id, subscription) {
    try {
      return await this.subscriptions.update(id, subscription)
    } catch (err) {
      this.handleError(err, {
        id,
        subscription
      })
    }
  }

  async delete(id, opts = {}) {
    try {
      return await this.subscriptions.del(id, opts)
    } catch (err) {
      this.handleError(err, {
        id,
        opts
      })
    }
  }

  async list(plan) {
    try {
      return await this.subscriptions.list(plan)
    } catch (err) {
      this.handleError(err, plan)
    }
  }
}