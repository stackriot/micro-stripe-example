import {
  ServerApi
} from '@tecla5/stripe-service'

export function createServerApi(res, data = {}) {
  return new Api(res, data)
}

// TODO: don't create customer if stripe id already exists
export class Api extends ServerApi {
  constructor(res, data = {}) {
    super(res, data)
    let {
      purchase,
      purchaseId,
      customerId
    } = data

    this.customerId = customerId
    this.purchase = purchase
    this.purchaseId = purchaseId || purchase.id
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
    this.graphQlServer.mutate(this.mutation)
      .on('error', this.handleError)
      .on('response', this.handleSuccess)
  }

  get errorMsg() {
    return `Customer ${this.customerId} was charged, but purchase ${this.purchaseId} was not marked as paid`
  }

  get successMsg() {
    return `Customer ${this.customerId} was charged and purchase ${this.purchaseId} was marked as paid`
  }
}
