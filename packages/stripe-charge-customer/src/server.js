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
  constructor(res, {
    purchase,
    purchaseId,
    customerId
  }) {
    this.customerId = customerId
    this.purchase = purchase
    this.purchaseId = purchaseId || purchase.id
    this.graphQlServer = graphQlServer
  }

  isPaid() {
    let customerId = this.customerId
    let purchaseId = this.purchaseId
    send(this.res, 400, {
      error: `Customer ${this.customerId} could not be charged, because purchase ${this.purchaseId} was already paid`
    })
  }

  get mutation() {
    return `mutation {
      updatePurchase(id: "${this.purchaseId}", isPaid: true) {
        id
      }
    }`
  }


  update() {
    let customerId = this.customerId
    let purchaseId = this.purchaseId

    this.graphQlServer.mutate(this.mutation)
      .on('error', this.handleError)
      .on('response', this.handleSuccess)
  }

  handleError(err) {
    send(res, 400, {
      error: `Customer ${this.customerId} was charged, but purchase ${this.purchaseId} was not marked as paid`
    })
  }

  handleSuccess(response) {
    send(res, 200, {
      message: `Customer ${this.customerId} was charged and purchase ${this.purchaseId} was marked as paid`
    })
  }
}
