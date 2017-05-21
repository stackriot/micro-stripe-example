var stripe = require('../stripe')
var subscription = stripe.subscriptions.create({
  customer: customer.id,
  plan: "basic-monthly",
}, function (err, subscription) {
  // asynchronously called
});

module.exports = subscription