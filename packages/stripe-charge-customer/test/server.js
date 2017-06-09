const express = require('express-async')
const action = require('../')
const app = express()

app.getAsync('/', action)
app.listen(3000)

module.exports = app
