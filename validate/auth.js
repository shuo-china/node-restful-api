const { body } = require('express-validator')
const { validate } = require('../middlewares/validate')

const loginValidate = [body('username').notEmpty(), body('password').notEmpty()]

module.exports = {
  loginValidate: validate(loginValidate)
}
