import {
  Collection
} from '../collection'

import {
  createSubscription
} from './subscription'

export function createSubscriptions(config, opts) {
  return new Subscriptions(config, opts)
}

export class Subscriptions extends Collection {
  constructor(config, opts = {}) {
    super('Subscriptions', 'subscriptions', config, opts)
    this.subscription = createSubscription(config, opts)
  }
}