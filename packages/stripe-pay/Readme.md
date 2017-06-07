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

### Invoice

Usage:

```js
let invoices = createInvoices(config, opts)

// store invoice in custom store/colletion on successful creation
invoices.on('create', store.invoices.create)

let invoice = await invoices.create(invoiceDetails)
```

Docs:

- [Invoices](https://stripe.com/docs/api#invoices)
- [Invoice items](https://stripe.com/docs/api#invoiceitems)

### Plan

Usage:

```js
let plans = createPlans(config, opts)

// store invoice in custom store/colletion on successful creation
plans.on('create', store.plans.create)

let plan = await plans.create(planDetails)
```

Docs:

- [Plans](https://stripe.com/docs/api#plans)

### Subscribe

## Testing

[subscriptions testing](https://stripe.com/docs/subscriptions/testing)