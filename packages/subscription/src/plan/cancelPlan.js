var stripe = require('../stripe')
stripe.subscriptions.del("sub_3R3PlB2YlJe84a",
  function (err, confirmation) {
    // asynchronously called
  }
);