import {
  send,
  graphQlServer,
  createMutation
} from './config'

// TODO: don't create customer if stripe id already exists
export function createUpdate(userId) {
  return function (customer) {
    // then update user with obtained Stripe customer id
    const mutation = createMutation(userId, customer)
    let mathingUser = graphQlServer.find(customer)


    graphQlServer.mutate(mutation)
      .on('error', (e) => {
        send(res, 400, {
          error: `User ${userId} could not be updated`
        })
      }).on('response', (response) => {
        send(res, 200, {
          message: `User ${userId} was successfully registered at Stripe`
        })
      })
  }
}
