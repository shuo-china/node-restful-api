// permission blocking
const express = require('express')
const router = express.Router()
const { createToken } = require('@utils/token')
const { exec } = require('@db/mysql')
const { isEmpty, pick } = require('lodash')
const md5 = require('md5')
const { loginValidate } = require('../validate/auth')

router.post('/login', loginValidate, async (req, res, next) => {
  const data = await exec(
    'SELECT * FROM `kr_manager` WHERE `username` = ? AND `password` = ?',
    [req.body.username, md5(req.body.password)]
  )

  if (isEmpty(data)) {
    res.status(403).error('username or password incorrect', 'LOGIN_FAIL')
    return
  }

  const userInfo = pick(data[0], ['id', 'username', 'nickname'])

  res.status(201).json({
    token_type: 'Bearer',
    access_token: createToken(userInfo)
  })
})

module.exports = router
