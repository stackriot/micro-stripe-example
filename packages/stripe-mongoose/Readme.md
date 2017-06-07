# Stripe Mongoose store (MongoDB)

with Amazon S3 integration and more ;)

## Usage

```js
import { createStore } from '@tecla5/stripe-mongoose'
const store = createStore({
  // mongoose DB options
})

let charges = createCharges(config, opts)

// store invoice in custom store/colletion on successful creation
charges.on('create', store.charges.create)

let charge = await charges.create(chargeDetails)
```

### Stripe customer plugin

See [mongoose-stripe-customers](https://www.npmjs.com/package/mongoose-stripe-customers)

```js
schema.plugin(mongooseStripeCustomers, {
    stripeApiKey: 'XXXXXXXXXXXXXXXX',
    hook: 'save',
    firstNameField: 'first_name',
    lastNameField: 'last_name',
    emailField: 'email',
    metaData: [ '_id', 'phone', 'customerType' ]
});
```

### Attach document in Amazon S3

```js
const mongoose = require('mongoose')
const crate = require('mongoose-crate')
const S3 = require('mongoose-crate-s3')
const path = require('path')

const PostSchema = new mongoose.Schema({
  title: String,
  description: String
})

const conf = {
  s3: {
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: process.env.S3_BUCKET,
    acl: process.env.S3_ACL,
    region: process.env.S3_REGION
  }
}

const s3 = Object.assign({}, conf.s3, {
  // where the file is stored in the bucket - defaults to this function
  path: (attachment) => `/${path.basename(attachment.path)}`
})

PostSchema.plugin(crate, {
  storage: new S3(s3),
  fields: {
    file: {}
  }
})

const Post = mongoose.model('Post', PostSchema)

const post = new Post()
try {
  await post.attach('image', {
    path: '/path/to/image',

    // optionally send these additional headers
    headers: {
      'Content-Type': 'image/png'
  })
  // file is now uploaded and post.file is populated e.g.:
  // post.file.url
} catch(error) {
  // handle error
})
```


## TODO

Refactor to use `@tecla5/stripe-pay` module