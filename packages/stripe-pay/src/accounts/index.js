import {
  Collection,
  str,
  num,
  bool,
  obj,
  list,
  name,
  url,
  currency,
  email,
  country,
  phone,
  description
} from '../collection'

export function createAccounts(config, opts) {
  return new Accounts(config, opts)
}

// business_name: name,
// business_logo: str(5, 120),
// business_url: url,
// charges_enabled: bool,
// country,
// debit_negative_balances: bool,
// decline_charge_on: obj(),
// default_currency: currency,
// details_submitted: bool,
// display_name: name,
// email: email,
// external_accounts: list(),
// legal_entity: obj(),
// payout_schedule: obj(),
// payout_statement_descriptor: description,
// payouts_enabled: bool,
// product_description: description,
// statement_descriptor: description,
// support_email: email,
// support_phone: phone,
// timezone: str(2, 5),
// tos_acceptance: obj(),
// type: str(2, 10, {
//   enum: ['standard', 'express', 'custom']
// }),
// verification: obj()

export class Accounts extends Collection {
  constructor(config, opts = {}) {
    super('Accounts', 'accounts', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        country,
        email,
        type: str(3, 6, {
          enum: ['custom', 'standard']
        }),

      },
      required: ['display_name', 'type']
    }
  }
}
