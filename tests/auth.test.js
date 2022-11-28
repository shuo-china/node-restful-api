const request = require('./request.js')

describe('auth', () => {
  it('401', () => {
    return request.get('/user/getUserInfo').then(res => {
      expect(res.status).toBe(401)
      expect(res.body.code).toBe('TOKEN_INVALID')
    })
  })
})
