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
    super(config, opts)
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
      return await this.plans.create(plan)
    } catch (err) {
      this.handleError(err, plan)
    }
  }
}