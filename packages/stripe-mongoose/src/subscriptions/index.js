import {
  Subscription
} from '../models'

function createSubscriptions(opts) {
  return new Subscriptions(opts)
}

class Subscriptions extends Collection {
  constructor(opts = {}) {
    super(Subscription, opts)
  }
}