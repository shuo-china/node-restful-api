const request = require('./request.js')

describe('boundary', () => {
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
