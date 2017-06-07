import stripe from '../stripe'

import {
  Loggable
} from '../loggable'

import {
  createSubscriptions
} from './subscriptions'

export function createPlan(config, opts) {
  return new Plan(config, opts)
}

export class Plan extends Loggable {
  constructor(config, opts = {}) {
    super('Plan', opts)
    this.plans = stripe.plans
  }

  // plan desc
  // {
  //   name: "Basic Plan",
  //   id: "basic-monthly",
  //   interval: "month",
  //   currency: "usd",
  //   amount: 0,
  // }
  async create(plan) {
    try {
      let created = await this.plans.create(plan)
      this.publish('plan:created', created)
      return created
    } catch (err) {
      this.handleError(err, plan)
    }
  }

  async createAll(plans) {
    // create multiple plans
    if (Array.isArray(plan)) {
      await Promise.all(plan.map(async p => await this.create(p)))
    }
  }
}