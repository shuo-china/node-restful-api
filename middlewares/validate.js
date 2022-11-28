const { validationResult } = require('express-validator')

class ValidateError extends Error {
  name = 'ValidateError'
  constructor(errors) {
    super()
    this.errors = errors
  }
}

function validate(chain) {
  const middleware = function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      throw new ValidateError(errors.array())
    }
    next()
  }

  return chain.concat(middleware)
}

module.exports = {
  validate
}
