#! /usr/bin/env node

var nrc = require('node-run-cmd');
var keyMap = require('./secrets.json')

Object.keys(keyMap).map(key => {
  var value = keyMap[key]
  var cmd = `now secret add ${key} ${value}`
  console.log(cmd)
  nrc.run(cmd);
})