import stripe from '../stripe'

import {
  Loggable
} from '../loggable'

export function createCustomer(profile, opts) {
  return new Customer(profile, opts)
}
export class Customer extends Loggable {
  constructor(profile, opts) {
    super('Customer', opts)
    this.profile = profile

    // in-memory by default
    this.plans = {}

    this.on('planCreated', this.storePlan)
  }

  get id() {
    return this.profile.id
  }

  extractPlanId(plan) {
    return plan.id
  }

  async storePlan(plan) {
    let id = extractPlanId(plan)
    this.plans[id] = plan
    return plan
  }

  async subscribeTo(plan, items) {
    try {
      let subscription = this._createSubscription(plan, items)
      let created = await subscriptions.create(subscription)
      this.publish('planCreated', created)
      return created
    } catch (err) {
      this.handleError(err)
    }
  }

  _createSubscription(plan, items) {
    return Object.assign({}, plan, {
      customer: this.id,
      items
    })
  }
}