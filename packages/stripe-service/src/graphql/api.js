import {
  send,
} from 'micro'

import {
  graphQlServer
} from './gql-server'

export function createServerApi(res, data = {}) {
  return new ServerApi(res, data)
}

// TODO: don't create customer if stripe id already exists
export class ServerApi {
  constructor(res, data = {}) {
    this.data = data
    this.send = send
    this.graphQlServer = graphQlServer
  }

  get mutation() {
    throw 'mutation: Must be implemented by subclass'
  }

  // TODO: use graphQL client
  update(data) {
    this.graphQlServer.mutate(this.mutation)
      .on('error', this.handleError)
      .on('response', this.handleSuccess)
  }

  handleError(err) {
    this.send(this.res, 400, {
      error: this.errorMsg
    })
  }

  handleSuccess(response) {
    this.send(this.res, 200, {
      message: this.successMsg
    })
  }

  get errorMsg() {
    throw 'errorMsg: Must be implemented by subclass'
  }

  get successMsg() {
    throw 'successMsg: Must be implemented by subclass'
  }
}
