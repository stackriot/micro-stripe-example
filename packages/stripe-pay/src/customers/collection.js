import {
  Collection,
  str,
  num,
  bool,
  obj,
  list,
  money,
  email,
  url,
  date,
  name,
  currency,
  country,
  $id,
  phone,
  description
} from '../collection'

export function createCustomers(config, opts) {
  return new Customers(config, opts)
}

class Customers extends Collection {
  constructor(config, opts = {}) {
    super('Customers', 'customers', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        name,
        email,
        description,
        account_balance: money,
        currency,
        delinquent: bool,
        business_vat_id: str(6, 40)
      },
      required: ['name', 'email']
    }
  }
}
