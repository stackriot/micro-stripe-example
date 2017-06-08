# Stripe Subscriptions

Stripe Subscription services.

## Pre-requisites

Go to your Stripe account and find your Stripe secret, fx in [authentication](https://stripe.com/docs/api#authentication)

```js
var stripe = require("stripe")(
  "sk_test_AQokikJOvDFgeHlWgH4gjey3"
);
```

Now export the secret as a System Variable, f.ex by adding it to `~/.bash_profile`

```bash
export STRIPE_SECRET="sk_test_AQokikJOvDFgeHlWgH4gjey3"
```

Now start a new Terminal session and the variable `STRIPE_SECRET` should be (globally) defined and accessible from Node.js environment as `process.env.STRIPE_SECRET`

## Promises

Stripe already [supports promises](https://github.com/stripe/stripe-node#using-promises)

## Entities

Currently support the following:

- Charges
- Customers
- Orders
- Invoices
- Plans
- Products
- Charges
- Skus
- Sources
- Transfers
- Recipients

Usage:

```js
import {
  createCustomers,
  createInvoices,
  createPlans,
  createOrders,
  createProducts,
  createCharges,
  createSkus,
  createSources,
  createTransfers,
  createRecipients
}
from '@tecla5/stripe-pay'
```

### Customers

Usage:

```js
let customers = createCustomers(config, opts)

// store invoice in custom store/colletion on successful creation
customers.on('create', store.customers.create)

let customer = await customers.create(customerDetails)
```

Docs:

- [Customers](https://stripe.com/docs/api#customers)

### Invoices

Usage:

```js
let invoices = createInvoices(config, opts)

// store invoice in custom store/colletion on successful creation
invoices.on('created', store.invoices.create)
invoices.onAll(['created', 'updated'], invoices.created.send)

let invoice = await invoices.create(invoiceDetails)
```

Note: You can NOT `delete` an invoice

Docs:

- [Invoices](https://stripe.com/docs/api#invoices)
- [Invoice items](https://stripe.com/docs/api#invoiceitems)

### Plans

Usage:

```js
let plans = createPlans(config, opts)

// store invoice in custom store/colletion on successful creation
plans.on('create', store.plans.create)

let plan = await plans.create(planDetails)
```

Docs:

- [Plans](https://stripe.com/docs/api#plans)

### Charges

Usage:

```js
let charges = createCharges(config, opts)

// store invoice in custom store/colletion on successful creation
charges.on('create', store.charges.create)

let charge = await charges.create(chargeDetails)
```

Docs:

- [Charges](https://stripe.com/docs/api#charges)

### SKUs

[Stock Keeping Units](https://en.wikipedia.org/wiki/Stock_keeping_unit)

Usage:

```js
let skus = createSkus(config, opts)

// store invoice in custom store/colletion on successful creation
skus.on('create', store.skus.create)

let sku = await skus.create(chargeDetails)
```

Docs:

- [Charges](https://stripe.com/docs/api#charges)

### Subscriptions

Usage:

```js
let subscriptions = createSubscriptions(config, opts)

// store invoice in custom store/colletion on successful creation
subscriptions.on('create', store.subscriptions.create)

let subscription = await plans.create(subscriptionDetails)
```

Docs:

- [Subscriptions](https://stripe.com/docs/api#subscriptions)
- [Subscriptions testing](https://stripe.com/docs/subscriptions/testing)

## Browser: Stripe as promised

[stripe-as-promised](https://www.npmjs.com/package/stripe-as-promised) is for using [Stripe.js](https://stripe.com/docs/stripe.js) in browsers with promises. The browser library only contains a small subset of functions.

It is based on [stripe-errback](https://github.com/bendrucker/stripe-errback/blob/master/index.js) using [pify](https://www.npmjs.com/package/pify)

```js
var stripeErrback = require('stripe-errback')
var dot = require('dot-prop')
var pify = require('pify')

module.exports = promisify

function promisify (stripe, Promise) {
  stripeErrback.methods.async.forEach(function (path) {
    var fn = dot.get(stripe, path)
    dot.set(stripe, path, pify(fn, Promise))
  })

  return stripe
}
```

We need to enhance promise support across most of the stripe API, by extending [stripe-errback](https://github.com/bendrucker/stripe-errback)

```js
var methods = stripeErrback.methods = {
  async: [
    'card.createToken',
    'bankAccount.createToken',
    'piiData.createToken',
    'bitcoinReceiver.createReceiver',
    'bitcoinReceiver.pollReceiver',
    'bitcoinReceiver.getReceiver'
  ],
  sync: [
    'setPublishableKey',
    'card.validateCardNumber',
    'card.validateExpiry',
    'card.validateCVC',
    'card.cardType',
    'bankAccount.validateRoutingNumber',
    'bankAccount.validateAccountNumber',
    'bitcoinReceiver.cancelReceiverPoll'
  ]
}
```

## License

MIT