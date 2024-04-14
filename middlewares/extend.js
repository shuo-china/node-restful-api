// mount property
function extend() {
  const middleware = function (req, res, next) {
    res.success = (data, message = '') => {
      const result = { errorCode: '', message, data }
      return res.json(result)
    }
    res.error = (errorCode, message = '', detail) => {
      const result = { errorCode, message }

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
