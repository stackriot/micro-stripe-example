const stream = require('stream')
const createPdfInvoice = require('stripe-pdf-invoice')

export class Invoicer {
  constructor(res, opts = {}) {
    this.opts = opts
    this.res = res
    this.pdfInvoice = createPdfInvoice(process.env.STRIPE_SECRET, this.stripeOpts)
  }

  get defaults() {
    return {
      invoice: {},
      stripe: {}
    }
  }

  get stripeOpts() {
    return Object.assign({}, this.opts.stripe || {}, this.defaults.stripe || {})
  }

  get invoiceOpts() {
    return Object.assign({}, this.opts.invoice || {}, this.defaults.invoice || {})
  }

  async generateInvoice(opts = {}) {
    let {
      invoiceId,
      download
    } = opts
    return new Promise((resolve, reject) => {
      pdfInvoice.generate(invoiceId, invoiceOpts, this.invoiceHandler({
        download,
        resolve,
        reject
      }));
    })
  }

  invoiceHandler(opts = {}) {
    let {
      resolve,
      reject,
      download
    } = opts

    return function (error, pdfname, stream) {
      if (reject) reject(error)

      //Force download
      if (download) {
        this.res.set('Content-Disposition', 'attachment; filename=' + pdfname + '.pdf')
        resolve ? resolve({
          download: true
        }) : undefined
      } else {
        let piped = stream.pipe(res)
        resolve ? resolve(piped) : undefined
      }
    }
  }
}
