import {
  Collection
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
        amount: $money,
        currency,
        interval: str(2, 5, {
          enum: ['day', 'week', 'month', 'year']
        }),
        interval_count: num(1, 200),
        trial_period_days: num(1, 200)
      },
      required: ['display_name', 'type']
    }
  }
}
