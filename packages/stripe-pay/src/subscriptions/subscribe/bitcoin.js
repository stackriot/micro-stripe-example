export class Bitcoin extends Loggable {
  constructor() {
    this.receiver = stripe.bitcoinReceiver
  }

  async subscribe(payment) {
    let receiver = await this.receiver.createReceiver(payment)
    let poll = await this.receiver.pollReceiver(receiver.id)
    return {
      receiver,
      poll
    }
  }
}