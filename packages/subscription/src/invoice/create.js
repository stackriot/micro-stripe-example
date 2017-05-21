var stripe = require('../stripe')
stripe.invoiceItems.create({
  customer: "cus_3R1W8PG2DmsmM9",
  amount: 1000,
  currency: "usd",
  description: "One-time setup fee",
}, function (err, invoiceItem) {
  // asynchronously called
});