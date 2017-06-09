import {
  ServerApi
} from '@tecla5/stripe-service'

export function createServerApi(res, data = {}) {
  return new Api(res, data)
}

export class Api extends ServerApi {
  constructor(res, data = {}) {
    super(res, data)
    let {
      stripeToken,
      userId
    } = data
    this.stripeToken = stripeToken
    this.userId = userId
  }

  get mutation() {
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
    this.graphQlServer.mutate(this.mutation)
      .on('error', this.handleError)
      .on('response', this.handleSuccess)
  }

  get errorMsg() {
    `User ${this.userId} could not be updated`
  }

  get successMsg() {
    `User ${this.userId} was successfully registered at Stripe`
  }
}
