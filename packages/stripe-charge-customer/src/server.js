import {
  send,
  graphQlServer,
  createMutation
} from './config'

export function createServer(purchaseId, customerId) {
  return new Server(purchaseId, customerId)
}

// TODO: don't create customer if stripe id already exists
export class Server {
  constructor(purchaseId, customerId) {
    this.mutation = createMutation(purchaseId)
    this.graphQlServer = graphQlServer
  }

  error() {
    let customerId = this.customerId
    let purchaseId = this.purchaseId
    send(res, 400, {
      error: `Customer ${customerId} could not be charged, because purchase ${purchaseId} was already paid`
    })
  }


  update() {
    let customerId = this.customerId
    let purchaseId = this.purchaseId

    this.graphQlServer.mutate(this.mutation)
      .on('error', (e) => {
        send(res, 400, {
          error: `Customer ${customerId} was charged, but purchase ${purchaseId} was not marked as paid`
        })
      }).on('response', (response) => {
        send(res, 200, {
          message: `Customer ${customerId} was charged and purchase ${purchaseId} was marked as paid`
        })
      })
  }
}
