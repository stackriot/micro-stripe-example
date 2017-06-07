export class Collection {
  constructor(model, opts = {}) {
    this.opts = opts
    this.model = model
  }

  async create(data) {
    return await this.model.create(data)
  }

  async find(criteria) {
    return await this.model.find(criteria)
  }

  async list(criteria) {
    return await this.model.list(criteria)
  }

  async query(query) {
    return await this.model.query(query)
  }

  async delete(criteria) {
    return await this.model.delete(criteria)
  }
}