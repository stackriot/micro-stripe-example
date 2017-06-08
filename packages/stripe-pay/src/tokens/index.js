import {
  Collection,
  str,
  num,
  bool,
  obj,
  list,
  name,
  url,
  currency,
  email,
  country,
  phone,
  description
} from '../collection'

export function createTokens(config, opts) {
  return new Tokens(config, opts)
}

export class Tokens extends Collection {
  constructor(config, opts = {}) {
    super('Tokens', 'tokens', config, opts)
  }

  get schema() {
    return {
      type: 'object',
      properties: {
        card: $id,
        customer: $id
      },
      required: []
    }
  }
}
