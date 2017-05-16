#! /usr/bin/env node

var nrc = require('node-run-cmd');
var keyMap = require('./secrets.json')

if (!keyMap) {
  throw Error('missing key file: secrets.json')
}

var commands = Object.keys(keyMap).map(key => {
  var value = keyMap[key]
  return `now secret add ${key} ${value}`
})

console.log(commands.join('\n'))
nrc.run(commands, {
  verbose: true,
}).then(function (exitCodes) {
  console.log('exits', exitCodes);
}, function (err) {
  console.log('Error: ', err);
});