import {
  Collection
} from '../collection'

export function createSubscriptionItems(config, opts) {
  return new SubscriptionItems(config, opts)
}

export class SubscriptionItems extends Collection {
  constructor(config, opts = {}) {
    super('SubscriptionItems', 'subscriptionItems', config, opts)
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}