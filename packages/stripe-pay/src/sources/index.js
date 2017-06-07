import {
  Collection
} from '../collection'

export function createSources(config, opts) {
  return new Sources(config, opts)
}

export class Sources extends Collection {
  constructor(config, opts = {}) {
    super('Sources', 'sources', config, opts)
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}