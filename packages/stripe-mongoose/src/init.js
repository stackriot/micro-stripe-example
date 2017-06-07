var path = require('path')
var models = require('mongoose-models')
let mongoose = require('mongoose')
mongoose.Promise = global.Promise;

// Register plugins
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const findOrCreate = require('mongoose-findorcreate')
const softDelete = require('mongoose-delete')
const times = require('mongoose-delete')

mongoose.plugin(deepPopulate)
mongoose.plugin(findOrCreate)
mongoose.plugin(softDelete)

// created and lastUpdated timestamps
// https://www.npmjs.com/package/mongoose-times
mongoose.plugin(times)

module.exports = function (config) {
  // console.log('models init', config)
  if (models.init) {
    models.init({
      url: config.url || 'mongodb://localhost/dbname',
      types: ['email', 'url', 'uuid'],
      debug: true,
      modelPath: path.resolve(__dirname, 'schemas'),
      modelIgnorePattern: 'index'
    })
  } else {
    console.log('it is called twice re-init')
  }

  return {
    models,
    mongoose,
  }
}