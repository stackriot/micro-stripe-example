import {
  send
} from 'micro'

export class StripeApi {
  constructor(res, opts = {}) {
    this.res = res
    this.opts = opts
  }

  // to allow filter/enrich data before sent to action
  prepare(data) {
    return data
  }

  async execute(data) {
    try {
      data = this.prepare(data)
      return await this.action(data)
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError(err) {
    console.error(err)
    this.send(this.res, 400, {
      error: this.errorMsg
    })
  }

  get errorMsg() {
    return `Subscription ${this.data.customerId} could not be created`
  }
}
