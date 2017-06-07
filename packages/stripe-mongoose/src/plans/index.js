import {
  Plan
} from '../models'

function createPlans(opts) {
  return new Plans(opts)
}

class Plans extends Collection {
  constructor(opts = {}) {
    super(Plan, opts)
  }
}