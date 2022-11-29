// mount property
function extend() {
  const middleware = function (req, res, next) {
    res.error = (message, code, detail) => {
      const result = { message }

      if (typeof code !== 'undefined') {
        result.code = code
      }

      if (typeof detail !== 'undefined') {
        result.detail = detail
      }

      return res.json(result)
    }
    next()
  }

  return middleware
}

module.exports = extend
