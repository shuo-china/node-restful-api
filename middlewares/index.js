const logger = require('./logger')
const error = require('./error')
const extend = require('./extend')
const { auth } = require('./auth')
const routeNotFound = require('./routeNotFound')

module.exports = {
  logger,
  error,
  extend,
  auth,
  routeNotFound
}
