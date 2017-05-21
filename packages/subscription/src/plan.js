var stripe = require('./stripe')
var plan = stripe.plans.create({
  name: "Basic Plan",
  id: "basic-monthly",
  interval: "month",
  currency: "usd",
  amount: 0,
}, function (err, plan) {
  // asynchronously called
});

module.exports = plan