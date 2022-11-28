const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('./middlewares/logger')
const error = require('./middlewares/error')
const { auth } = require('./middlewares/auth')
const extend = require('./middlewares/extend')
const routeNoutFound = require('./middlewares/routeNotFound')

const app = express()

app.use(logger())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(extend())
app.use(auth())

const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.use(routeNoutFound())
app.use(error())

module.exports = app
