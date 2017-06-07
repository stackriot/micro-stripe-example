import {
  LineItem
} from '../models'

function createLineItems(opts) {
  return new LineItems(opts)
}

class LineItems extends Collection {
  constructor(opts = {}) {
    super(LineItem, opts)
  }
}