var stripe = require('../stripe')
stripe.subscriptions.del("sub_3R3PlB2YlJe84a", {
    at_period_end: true
  },
  function (err, confirmation) {
    // asynchronously called
  }
);