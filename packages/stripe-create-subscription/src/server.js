import {
  send,
} from 'micro'

import {
  graphQlServer
} from './gql-server'

export function createServer(res, data = {}) {
  return new Server(res, data)
}

// TODO: don't create customer if stripe id already exists
export class Server {
  constructor(res, data = {}) {
    let {
      subscription,
      subscriptionId,
      customerId
    } = data
    this.subscriptionId = subscriptionId
    this.subscription = subscription
    this.customerId = customerId || subscription.id
    this.graphQlServer = graphQlServer
  }

  get mutation() {
    return `mutation {
      updateSubscription(id: "${this.subscriptionId}", isSubscribed: true) {
        id
      }
    }`
  }

  update() {
    this.graphQlServer.mutate(this.mutation)
      .on('error', this.handleError)
      .on('response', this.handleSuccess)
  }

  isSubscribed() {
    send(this.res, 400, {
      error: this.alreadySubscribedMsg
    })
  }

  handleError(err) {
    send(res, 400, {
      error: this.errorMsg
    })
  }

  handleSuccess(response) {
    send(res, 200, {
      message: this.successMsg
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
