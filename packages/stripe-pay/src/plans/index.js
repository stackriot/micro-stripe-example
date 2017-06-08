import {
  Collection,
  $id,
  money,
  currency,
  name,
  description
} from '../collection'

export function createPlans(config, opts) {
  return new Plans(config, opts)
}

export class Plans extends Collection {
  constructor(config, opts = {}) {
    super('Plans', 'plans', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        id: $id,
        name,
        amount: $money,
        currency,
        interval: str(2, 5, {
          enum: ['day', 'week', 'month', 'year']
        }),
        interval_count: num(1, 200),
        metadata: obj(),
        statement_descriptor: description,
        trial_period_days: num(1, 200)
      },
      required: ['id', 'amount', 'currency', 'interval', 'name']
    }
  }
}
