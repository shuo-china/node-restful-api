// error handler
const { upperFirst, lowerFirst } = require('lodash')

function error() {
  const middleware = function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).error('TOKEN_INVALID', err.message)
    } else if (err.name === 'RouteNotFoundError') {
      res.status(404).error('ROUTE_NOT_FOUND', 'Route does not exist')
    } else if (err.name === 'ValidateError') {
      const { errors } = err
      const message = `${upperFirst(errors[0].param)} is ${lowerFirst(
        errors[0].msg
      )}`
      res.error('PARAM_ERROR', message, errors)
    } else {
      res.status(500).error('SERVER_ERROR', err.message)
    }
  }

  return middleware
}

module.exports = error
