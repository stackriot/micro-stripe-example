import {
  send
} from 'micro'

import {
  createPlans
} from '@tecla5/stripe-pay'

function createPlan(res, data) {
  return new Plan(res, data)
}

export class Plan {
  constructor(res, opts = {}) {
    let {
      plan
    } = opts

    this.res = res
    this.plan = plan
    this.plans = createPlans(opts)
  }

  async create() {
    // let purchase = this.purchase
    // let customerId = this.customerId
    try {
      return await this.plans.create(this.plan)
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError(err) {
    console.log(err)
    send(this.res, 400, {
      error: `Plan ${this.plan.name} could not be created`
    })

  }
}
