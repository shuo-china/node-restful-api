const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const tokenConfig = require('../config/token')

router.get('/login', (req, res, next) => {
  const payload = { nickname: '硕硕' }

  const token = jwt.sign(payload, tokenConfig.secret, {
    expiresIn: tokenConfig.expiresIn
  })

  res.status(201).json({
    token_type: 'Bearer',
    access_token: token,
    expires_in: tokenConfig.expiresIn
  })
})

module.exports = router
