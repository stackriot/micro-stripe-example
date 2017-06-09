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
  constructor(res, {
    stripeToken,
    userId
  }) {
    this.res = res
    this.stripeToken = stripeToken
    this.userId = userId
    this.graphQlServer = graphQlServer
  }

  get userMutation() {
    return `mutation {
    updateUser(
      id: "${this.userId}",
      stripeId: "${this.customerId}"
    ) {
        id
      }
    }`
  }

  get userQuery() {
    return `query {
      User(
        id: "${this.userId}"
        stripeId: "${this.customerId}"
      }
    }`
  }

  set customer(_customer) {
    this.customer = _customer
    this.customerId = _customer.id
  }

  // TODO use async/await promise instead!!!
  // TODO: use apollo or lokka client via apollo-auth-conn and lokka-auth-conn
  async update(customer) {
    this.customer = customer
    // test if user with stripeId already present
    // let matchingUser = await graphQlServer.query(this.userQuery)
    // if (matchingUser) {
    //   return
    // }
    // then update user with obtained Stripe customer id
    this.graphQlServer.mutate(this.userMutation)
      .on('error', this.handleError)
      .on('response', this.handleSuccess)
  }

  handleSuccess(response) {
    send(this.res, 200, {
      message: this.successMsg
    })
  }

  handleError(err) {
    send(this.res, 400, {
      error: this.errorMsg
    })
  }

  get errorMsg() {
    `User ${this.userId} could not be updated`
  }

  get successMsg() {
    `User ${this.userId} was successfully registered at Stripe`
  }
}
