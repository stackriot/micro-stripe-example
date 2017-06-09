import {
  ServerApi
} from '@tecla5/stripe-service'

export function createServerApi(res, data = {}) {
  return new Api(res, data)
}

// TODO: use apollo-auth-conn or similar (ie. update stripe-service Server)
export class Api extends ServerApi {
  constructor(res, data = {}) {
    super(res, data)
    let {
      subscription,
      subscriptionId,
      customerId
    } = data
    this.subscriptionId = subscriptionId
    this.subscription = subscription
    this.customerId = customerId || subscription.id
  }

  get mutation() {
    return `mutation {
      updateSubscription(id: "${this.subscriptionId}", isSubscribed: true) {
        id
      }
    }`
  }

  isSubscribed() {
    this.send(this.res, 400, {
      error: this.alreadySubscribedMsg
    })
  }

  get alreadySubscribedMsg() {
    return `Subscription ${this.subscriptionId} is already subscribed to by ${this.customerId}`
  }

  get errorMsg() {
    return `Subscription ${this.subscriptionId} could not be subscribed to by ${this.customerId}`
  }

  get successMsg() {
    return `Subscription ${this.subscriptionId} was subscribed to by ${this.customerId}`
  }
}
