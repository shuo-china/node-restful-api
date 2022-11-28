const request = require('./request.js')

describe('user', () => {
  it('getUserInfo', () => {
    return request
      .get('/user/getUserInfo')
      .setToken()
      .then(res => {
        expect(res.status).toBe(200)
      })
  })
})
