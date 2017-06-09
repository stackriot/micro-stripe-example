import {
  ServerApi
} from '@tecla5/stripe-service'

export function createServerApi(res, data = {}) {
  return new Api(res, data)
}

export class Api extends ServerApi {
  constructor(res, data = {}) {
    super(res, data)
    this.plan = data.plan
  }

  // TODO: add more plan details
  get mutation() {
    return `mutation {
      updatePlan(
        id: "${this.plan.id}"
        name: "${this.plan.name}"
      ) {
        id
      }
    }`
  }

  isSubscribed() {
    send(this.res, 400, {
      error: this.alreadySubscribedMsg
    })
  }

  get errorMsg() {
    return `Subscription ${this.subscriptionId} could not be subscribed to by ${this.customerId}`
  }

  get successMsg() {
    return `Subscription ${this.subscriptionId} was subscribed to by ${this.customerId}`
  }
}
