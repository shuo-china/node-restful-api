const express = require('express')
const router = express.Router()
const { createToken } = require('../utils/token')
const tokenConfig = require('../config/token')
const { loginValidate } = require('../validate/auth')

router.post('/login', loginValidate, (req, res, next) => {
  const info = { nickname: '硕硕' }

  res.status(201).json({
    token_type: 'Bearer',
    access_token: createToken(info),
    expires_in: tokenConfig.expiresIn
  })
})

module.exports = router
