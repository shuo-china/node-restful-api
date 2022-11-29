const jwt = require('jsonwebtoken')
const tokenConfig = require('@config/token')

function createToken(info) {
  const token = jwt.sign({ info }, tokenConfig.secret, {
    expiresIn: tokenConfig.expiresIn
  })

  return token
}

function parseToken(token) {
  try {
    return jwt.verify(token, tokenConfig.secret)
  } catch {
    return null
  }
}

module.exports = {
  createToken,
  parseToken
}
