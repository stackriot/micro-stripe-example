import {
  Loggable
} from '../../loggable'

export class Bitcoin extends Loggable {
  constructor(config, opts) {
    super('Bitcoin', opts)
    this.receiver = stripe.bitcoinReceiver
  }

  async subscribe(payment) {
    try {

      let receiver = await this.receiver.createReceiver(payment)
      let poll = await this.receiver.pollReceiver(receiver.id)
      return {
        receiver,
        poll
      }
    } catch (err) {
      return err
    }
  }
}