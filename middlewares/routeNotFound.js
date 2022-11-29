// 404 handler
class RouteNotFoundError extends Error {
  name = 'RouteNotFoundError'
}

const routeNotFound = function () {
  const middleware = function (req, res, next) {
    throw new RouteNotFoundError()
  }

  return middleware
}

module.exports = routeNotFound
