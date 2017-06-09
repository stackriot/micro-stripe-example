import {
  parse,
  token,
} from './config'


async function extract(req) {
  const data = await json(req)
  const {
    query
  } = parse(req.url, true)
  return {
    data,
    query
  }
}

export async function xtractData(req, opts = {}) {
  let {
    data,
    query
  } = await extract(req)
  let {
    unpack
  } = opts

  if (token !== query.token) throw Error('Token mismatch')

  return (typeof unpack === 'function') ? unpack(data) : data
}
