require('module-alias/register')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const {
  logger,
  error,
  extend,
  auth,
  routeNotFound
} = require('@middlewares/index')
const setupRouter = require('@utils/setupRouter')

const app = express()

app.use(cors())
app.use(logger())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(extend())
app.use(auth())
setupRouter(app)

// const modules = fs.readdirSync(__dirname)
// modules.forEach(moduleName => {
//   if (moduleName !== 'index') {
//     require(`./${moduleName}`)
//   }
// })

app.use(routeNotFound())
app.use(error())

module.exports = app
