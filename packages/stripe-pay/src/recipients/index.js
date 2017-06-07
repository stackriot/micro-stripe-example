import {
  Collection
} from '../collection'

export function createRecipients(config, opts) {
  return new Recipients(config, opts)
}

export class Recipients extends Collection {
  constructor(config, opts = {}) {
    super('Recipients', 'recipients', config, opts)
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}