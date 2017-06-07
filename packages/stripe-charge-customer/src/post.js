const request = require('request')

export class GraphQLServer {
  constructor(opts = {}) {
    let {
      endpoint,
      token
    } = opts
    this.endpoint = endpoint
    this.token = token
  }

  mutate(mutation) {
    return request.post({
      url: this.endpoint,
      headers: {
        'Authorization': this.token,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation
      }),
    })
  }
}