import {
  Order
} from '../models'

function createOrders(opts) {
  return new Orders(opts)
}

class Orders extends Collection {
  constructor(opts = {}) {
    super(Order, opts)
  }
}