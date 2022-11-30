const request = require('./request.js')

describe('other', () => {
  it('401', () => {
    return request.get('/user/getUserInfo').then(res => {
      expect(res.status).toBe(401)
      expect(res.body.code).toBe('TOKEN_INVALID')
    })
  })

  it('404', () => {
    return request
      .get('/xxx')
      .setToken()
      .then(res => {
        expect(res.status).toBe(404)
        expect(res.body.code).toBe('ROUTE_NOT_FOUND')
      })
  })
})
