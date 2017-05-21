var stripe = require('./stripe')
var customer = stripe.customers.create({
  email: "jenny.rosen@example.com",
}, function (err, customer) {
  // asynchronously called
});

module.exports = customer