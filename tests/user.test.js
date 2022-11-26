const { request } = require('./request.js')

it('/user/getUserInfo', () => {
  return request.get('/user/getUserInfos').then(res => {
    expect(res.status).toBe(200)
  })
})
