const { request, setToken } = require('./request.js')

beforeAll(() => {
  return request.post('/auth/login').then(res => {
    setToken(res.body.access_token)
  })
})
