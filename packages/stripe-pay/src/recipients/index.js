import {
  Collection
} from '../collection'

export function createRecipients(config, opts) {
  return new Recipients(config, opts)
}

// Recent versions of the Stripe API no longer support Recipients.
// If you have not yet migrated, you should so immediately.
// Until you complete your migration, you should upgrade to version
// 2017-02-14 of the Stripe API but do not advance to newer versions
// released after that date.

export class Recipients extends Collection {
  constructor(config, opts = {}) {
    super('Recipients', 'recipients', config, opts)
  }
}
