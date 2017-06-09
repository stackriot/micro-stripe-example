import {
  send
} from 'micro'

import {
  graphQlServer
} from './gql-server'

export function createServer(res, data = {}) {
  return new Server(res, data)
}

export class Server {
  constructor(res, data = {}) {
    let {
      plan
    } = data
    this.plan = plan
    this.graphQlServer = graphQlServer
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

  get errorMsg() {
    return `Subscription ${this.subscriptionId} could not be subscribed to by ${this.customerId}`
  }

  get successMsg() {
    return `Subscription ${this.subscriptionId} was subscribed to by ${this.customerId}`
  }
}
