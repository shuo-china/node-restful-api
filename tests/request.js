const methods = require('methods')
const supertest = require('supertest')
const app = require('../app')

let token = ''
function setToken(str) {
  token = str
}

const request = supertest(app)

const cloneRequest = { ...request }

function interceptorsRequest(test) {
  if (token) {
    test.set('Authorization', `Bearer ${token}`)
  }
  return test
}

methods.forEach(method => {
  request[method] = function (...args) {
    const test = cloneRequest[method].apply(this, args)
    interceptorsRequest(test)
    return test
  }
})

module.exports = {
  request,
  setToken
}
