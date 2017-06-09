const express = require('express-async');
const app = express()
const {
  Invoicer
} = require('./invoicer')

const config = require('./config')

function xtractData(req) {
  return {
    invoiceId: req.params.invoiceId,
    download: req.params.download
  }
}

function preparePdfContent(res) {
  res.set('content-type', 'application/pdf; charset=utf-8');
}

app.getAsync('/', async(req, res) => {
  preparePdfContent(res)
  let data = xtractData(req)

  const invoicer = new Invoicer(res, config)

  let result = await invoicer.generateInvoice(res, data)
});
