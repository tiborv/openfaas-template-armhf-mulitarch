"use strict"
const getStdin = require('get-stdin')
const isArray = require('isarray')
const isObject = require('isobject')

const handler = require('./function/handler')

getStdin()
  .then(async val => {
    try {
      const res = await handler(val)
      return isArray(res) || isObject(res) 
        ? console.log(JSON.stringify(res))
        : process.stdout.write(`${res}`)
    } catch (err) {
      return console.error(err)
    }
  })
.catch(e => console.error(e.stack))