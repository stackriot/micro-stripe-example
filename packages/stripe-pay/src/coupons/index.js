import {
  Collection,
  $id,
  money,
  currency,
  name,
  description
} from '../collection'

export function createCoupons(config, opts) {
  return new Coupons(config, opts)
}

export class Coupons extends Collection {
  constructor(config, opts = {}) {
    super('Coupons', 'coupons', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        id: $id,
        duration: str(3, 10, {
          enum: ['forever', 'once', 'repeating']
        }),
        amount_off: $money,
        currency,
        duration_in_months: num(1, 12),
        max_redemptions: num(1, 10),
        metadata: obj(),
        percent_off: percent,
        redeem_by: date
      },
      required: ['duration', 'currency', 'interval', 'name']
    }
  }
}
