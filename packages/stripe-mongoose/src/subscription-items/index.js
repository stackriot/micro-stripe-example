import {
  SubscriptionItem
} from '../models'

function createSubscriptionItems(opts) {
  return new SubscriptionItems(opts)
}

class SubscriptionItems extends Collection {
  constructor(opts = {}) {
    super(SubscriptionItem, opts)
  }
}