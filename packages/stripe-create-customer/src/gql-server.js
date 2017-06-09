import request from 'request'

const endpoint = process.env.ENDPOINT
const graphcoolToken = `Bearer ${process.env.GC_PAT}`

export const graphQlServer = new GraphQLServer({
  endpoint,
  token: graphcoolToken
})

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
