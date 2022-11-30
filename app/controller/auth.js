// permission blocking
const express = require('express')
const router = express.Router()
const md5 = require('md5')
const { createToken } = require('@utils/token')
const User = require('../model/user')
const { loginValidate } = require('../validate/auth')

router.post('/login', loginValidate, async (req, res, next) => {
  const where = {
    username: req.body.username,
    password: md5(req.body.password)
  }

  const attributes = ['id', 'username', 'nickname']

  const user = await User.findOne({ where, attributes })

  if (user === null) {
    res.status(403).error('username or password incorrect', 'LOGIN_FAIL')
    return
  }

  res.status(201).json({
    token_type: 'Bearer',
    access_token: createToken(user)
  })
})

module.exports = router
