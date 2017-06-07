import {
  OrderItem
} from '../models'

function createOrderItems(opts) {
  return new OrderItems(opts)
}

class OrderItems extends Collection {
  constructor(opts = {}) {
    super(OrderItem, opts)
  }
}