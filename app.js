require('module-alias/register')
const express = require('express')
require('express-async-errors')
const path = require('path')
const cookieParser = require('cookie-parser')
const { logger, error, auth, extend, routeNotFound } = require('@middlewares')

const app = express()

app.use(logger())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(extend())
app.use(auth())

const userRouter = require('@app/routes/user')
const authRouter = require('@app/routes/auth')

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.use(routeNotFound())
app.use(error())

module.exports = app
