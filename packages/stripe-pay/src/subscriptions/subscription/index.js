import {
  createBitcoin
}
from './bitcoin'

export class Subscription extends Loggable {
  constructor(config, opts = {}) {
    super(config, opts)
    this.bitcoin = createBitcoin(this)
  }

  async bitcoin(payment) {
    let subscribed = await this.bitcoin.subscribe(payment)
    return subscribed
  }
}