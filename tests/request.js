const methods = require('methods')
const supertest = require('supertest')
const app = require('../app')
const { createToken } = require('../utils/token')

const mockUserInfo = {
  nickname: 'Aaron',
  age: 18
}

let token = ''

const request = supertest(app)
const cloneRequest = { ...request }

function interceptorsRequest(test) {
  test.setToken = () => {
    if (!token) {
      token = createToken(mockUserInfo)
    }
    test.set('Authorization', `Bearer ${token}`)
    return test
  }

  return test
}

methods.forEach(method => {
  request[method] = function () {
    const test = cloneRequest[method].apply(this, arguments)
    interceptorsRequest(test)
    return test
  }
})

module.exports = request
