const logger = require('./logger')
const error = require('./error')
const { auth } = require('./auth')
const extend = require('./extend')
const routeNotFound = require('./routeNotFound')

module.exports = {
  logger,
  error,
  auth,
  extend,
  routeNotFound
}
