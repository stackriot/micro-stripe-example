var stripe = require('../stripe')
let multi = {}
multi.basic = stripe.subscriptions.create({
  customer: "cus_91elFtZU3tt11g",
  items: [{
      plan: "basic-monthly",
    },
    {
      plan: "additional-license",
      quantity: 2,
    },
  ]
}, function (err, subscription) {
  // asynchronously called
});

multi.taxed = stripe.subscriptions.create({
  customer: "cus_91elFtZU3tt11g",
  coupon: "free-period",
  tax_percent: 6.34,
  trial_end: 1495971161,
  items: [{
      plan: "basic-monthly",
    },
    {
      plan: "additional-license",
      quantity: 2,
    },
  ]
}, function (err, subscription) {
  // asynchronously called
});

module.exports = multi