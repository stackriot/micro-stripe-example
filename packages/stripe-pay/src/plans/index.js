import {
  Collection
} from '../collection'

export function createPlans(config, opts) {
  return new Plans(config, opts)
}

export class Plans extends Collection {
  constructor(config, opts = {}) {
    super('Plans', 'plans', config, opts)
  }

  async validateNew(data) {
    return typeof data === 'object'
  }
}