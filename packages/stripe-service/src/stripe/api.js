import {
  send
} from 'micro'

function fakeSend(res, code, opts = {}) {
  return {
    code,
    result: opts.error || opts.message
  }
}

export class StripeApi {
  constructor(res, opts = {}) {
    this.res = res
    this.opts = opts
    this.send = opts.fake ? fakeSend : opts.send || send
    this.create = this.execute.bind(this)
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
      return this.handleError(err)
    }
  }

  handleError(err) {
    console.error(err)
    return this.send(this.res, 400, {
      error: this.errorMsg
    })
  }

  get errorMsg() {
    return `Subscription ${this.data.customerId} could not be created`
  }
}
