import stripe from './stripe'
import {
  Validator
} from 'jsonschema'

import {
  Notifiable
} from './Notifiable'

export {
  str,
  num,
  bool,
  obj,
  list,
  date,
  email,
  money,
  $money,
  name,
  description,
  currency
}
from './util'

export class Collection extends Notifiable {
  // config is used as the baseline object for operations
  // use it to fx set the default currency used, etc
  constructor(name, colName, config, opts) {
    super(name, opts)
    this.config = config
    this.validator = new Validator(opts)

    let collection = stripe[colName]

    if (!collection) {
      this.handleError(`Bad stripe collection: stripe.${colName}`, colName)
    }
    this.collection = collection

    this.methods = {
      list: 'list',
      delete: 'delete',
      create: 'create',
      update: 'update',
      retrieve: 'retrieve'
    }

    // default in-memory storage
    this.store = {}
  }

  extractId(data) {
    return data.email || data.id
  }

  // default in-memory storage
  async storeData(data) {
    let id = this.extractId(data)
    this.store[id] = data
  }

  async retrieve(id) {
    try {
      let method = this.methods.retrieve
      let fun = this.collection[method]
      return await fun(id)
    } catch (err) {
      this.handleError(err, {
        id
      })
    }
  }

  async prepare(data) {
    let base = this.config || {}
    return Object.assign({}, base, data)
  }

  // allow transformation of data
  // f.ex by lookup of ids
  async prepareNew(data) {
    return data
  }

  async update(id, data) {
    try {
      data = await this.prepare(data)
      let validated = await this.validateNew(data)
      if (!validated) {
        this.handleError('validation error', {
          data,
          validated
        })
      }

      let method = this.methods.update
      let fun = this.collection[method]
      let updated = await fun(id, data)
      this.notify('updated', updated)
      return updated
    } catch (err) {
      this.handleError(err, {
        id,
        data
      })
    }
  }

  async delete(id, opts = {}) {
    try {
      let method = this.methods.delete
      let fun = this.collection[method]
      let deleted = await fun(id, opts)
      this.notify('deleted', deleted)
      return deleted
    } catch (err) {
      this.handleError(err, {
        id,
        opts
      })
    }
  }

  // list all orders
  async list(criteria = {}) {
    try {
      let method = this.methods.list
      let fun = this.collection[method]
      return await fun(criteria)
    } catch (err) {
      this.handleError(err, {
        criteria
      })
    }
  }

  // charge:
  // {
  //   amount: 2000,
  //   currency: "usd",
  //   source: "tok_189gHd2eZvKYlo2CAIZMVqrI",
  // }
  async create(data, opts = {}) {
    try {
      data = this.prepare(data)
      let validated = await this.validateNew(data)
      if (!validated) {
        this.handleError('validation error', {
          data,
          validated
        })
      }

      let method = this.methods.create
      let fun = this.collection[method]
      let created = await fun(data)
      this.notify('created', created)
      return created
    } catch (err) {
      this.handleError(err, data)
    }
  }

  async validateNew(data) {
    return this.validateSchema(data)
  }

  validateSchema(data) {
    return this.validator.validate(data, this.schema)
  }

  get schema() {
    this.handleError('Schema not defined')
  }

  async createAll(list) {
    // create multiple plans
    if (Array.isArray(list)) {
      await Promise.all(list.map(async item => await this.create(item)))
    }
  }

}
