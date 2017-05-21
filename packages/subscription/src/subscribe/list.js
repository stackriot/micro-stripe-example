var stripe = require('../stripe')
stripe.subscriptions.list({
  plan: "pro-monthly",
}, function (err, subscriptions) {
  // asynchronously called
});