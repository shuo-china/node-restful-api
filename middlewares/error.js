// error handler
const { upperFirst, lowerFirst } = require('lodash')

function error() {
  const middleware = function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).error(err.message, 'TOKEN_INVALID')
    } else if (err.name === 'RouteNotFoundError') {
      res.status(404).error('Route does not exist', 'ROUTE_NOT_FOUND')
    } else if (err.name === 'ValidateError') {
      const { errors } = err
      const message = `${upperFirst(errors[0].param)} is ${lowerFirst(
        errors[0].msg
      )}`
      res.status(422).error(message, 'PARAM_ERROR', errors)
    } else {
      res.status(500).error(err.message, 'SERVER_ERROR')
    }
  }

  return middleware
}

module.exports = error
