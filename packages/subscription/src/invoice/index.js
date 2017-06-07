import stripe from '../stripe'

class Invoice extends Loggable {
  constructor(config, opts = {}) {
    super(config, opts)
  }
  // order:
  // {
  //   customer: "cus_3R1W8PG2DmsmM9",
  //   amount: 1000,
  //   currency: "usd",
  //   description: "One-time setup fee",
  // }
  async create(order, opts = {}) {
    try {
      return await stripe.invoiceItems.create(order)
    } catch (err) {
      return err
    }
  }
}