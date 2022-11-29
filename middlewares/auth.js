const { expressjwt: jwt } = require('express-jwt')
const tokenConfig = require('@config/token')
const whiteList = require('@config/whiteList')
const { parseToken } = require('@utils/token')

function auth() {
  return [
    jwt({
      secret: tokenConfig.secret,
      algorithms: ['HS256']
    }).unless({
      path: whiteList
    }),
    function (req, res, next) {
      if ('auth' in req) {
        req.clientInfo = req.auth.info
      }
      next()
    }
  ]
}

function clientInfo() {
  const middleware = function (req, res, next) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = parseToken(token)
      if (decoded) {
        req.clientInfo = decoded.info
      }
    }
    next()
  }

  return middleware
}

module.exports = {
  auth,
  clientInfo
}
