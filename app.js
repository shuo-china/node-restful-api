const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const FileStreamRotator = require('file-stream-rotator')
const fs = require('fs')
const { expressjwt: jwt } = require('express-jwt')
const tokenConfig = require('./config/token')

const app = express()

// log handler
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  app.use(logger('dev'))
} else {
  const logDir = path.join(__dirname, 'logs')
  fs.existsSync(logDir) || fs.mkdirSync(logDir)

  const accessLogStream = FileStreamRotator.getStream({
    filename: path.join(logDir, 'access-%DATE%.log'),
    frequency: 'daily',
    date_format: 'YYYY-MM-DD'
  })

  app.use(
    logger('combined', {
      stream: accessLogStream
    })
  )
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// token verify
app.use(
  jwt({
    secret: tokenConfig.secret,
    algorithms: ['HS256']
  }).unless({
    path: ['/auth']
  })
)

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')

app.use('/', indexRouter)
app.use('/auth', authRouter)

// 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      code: 'TOKEN_INVALID',
      message: err.message
    })
    return
  }

  res.status(500).send('Something broke!')
})

module.exports = app
