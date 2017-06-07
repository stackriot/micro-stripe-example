const models = require('mongoose-models')
const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

// See: Validation
// http://mongoosejs.com/docs/validation.html
function required(type, opts = {}) {
  return Object.assign({}, opts, {
    type,
    required: true
  })
}

function ref(objType, opts = {}) {
  return Object.assign({}, opts, {
    type: ObjectId,
    ref: objType
  })
}

function refC(objType, opts = {}) {
  return Object.assign({}, opts, {
    type: models.types.ObjectId,
    ref: {
      $circular: objType
    }
  })
}

function refList(objType, opts = {}) {
  return Object.assign({}, opts, {
    type: [ObjectId],
    ref: objType
  })
}

function refListC(objType, opts = {}) {
  return Object.assign({}, opts, {
    type: [models.types.ObjectId],
    ref: {
      $circular: objType
    }
  })
}

function enums(list, opts = {}) {
  return Object.assign({}, opts, {
    type: String,
    enum: list
  })
}

const name = required(String, {
  min: 6,
  max: 20
})

const description = {
  type: String,
  min: 6,
  max: 80
}

module.exports = {
  required,
  name,
  description,
  ref,
  refList,
  enums
}