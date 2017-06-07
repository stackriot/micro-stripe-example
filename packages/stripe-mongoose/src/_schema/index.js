const mongoose = require('mongoose')
const models = require('mongoose-models')
const softDelete = require('mongoose-delete')
let deepPopulate = require('mongoose-deep-populate')(mongoose)

// use new ability to set plugins w options from within mongoose-models
let plugins = {
  // deepPopulate,
  softDelete: [
    softDelete,
    // so we can track who deleted model and when
    {
      deletedBy: true
    }
  ]
}

let pluginsConfig = {
  // plugins
}

function createSchema(name, config) {
  config = Object.assign(config, pluginsConfig)

  return models.create(name, config)
}

module.exports = {
  createSchema
}