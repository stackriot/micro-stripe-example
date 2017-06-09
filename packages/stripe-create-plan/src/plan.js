import {
  StripeApi
} from '@tecla5/stripe-service'

import {
  createPlans
} from '@tecla5/stripe-pay'

export function createPlan(res, data) {
  return new Plan(res, data)
}

export class Plan extends StripeApi {
  constructor(res, opts = {}) {
    super(res, opts)
    this.plan = opts.plan
    this.plans = createPlans(opts)
    this.action = this.plans.create
  }

  prepare(data) {
    return this.plan
  }

  get errorMsg() {
    return `Plan ${this.plan.name} could not be created`
  }
}
