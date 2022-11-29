// log handler
const path = require('path')
const fs = require('fs')
const morganLogger = require('morgan')
const FileStreamRotator = require('file-stream-rotator')

const ENV = process.env.NODE_ENV

function logger() {
  if (ENV === 'production') {
    const logDir = path.resolve('logs')
    fs.existsSync(logDir) || fs.mkdirSync(logDir)

    const accessLogStream = FileStreamRotator.getStream({
      filename: path.join(logDir, 'access-%DATE%.log'),
      frequency: 'daily',
      date_format: 'YYYY-MM-DD'
    })

    return morganLogger('combined', {
      stream: accessLogStream
    })
  } else if (ENV === 'development') {
    return morganLogger('dev')
  } else {
    return (req, res, next) => next()
  }
}

module.exports = logger
