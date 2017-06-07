export class Subscribe extends Loggable {
  constructor(subscriptions, config, opts) {
    super(config, opts)
    this.subscriptions = subscriptions
    this.bitcoin = createBitcoin(this)
  }

  async account() {
    return await this.subscriptions.create({
      customer: customer.id,
      plan: "basic-monthly",
    })
  }

  async bitcoin(payment) {}
}