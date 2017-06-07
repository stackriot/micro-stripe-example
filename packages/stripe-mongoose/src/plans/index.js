import {
  Customer
} from '../models'

function createCustomers(opts) {
  return new Customers(opts)
}

class Customers extends Collection {
  constructor(opts = {}) {
    super(Customer, opts)
  }
}