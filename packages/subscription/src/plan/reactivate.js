var stripe = require('../stripe')
stripe.subscriptions.update("sub_5aR9kvK8NAwzIU", {
  plan: "pro-monthly",
}, function (err, subscription) {
  // asynchronously called
});