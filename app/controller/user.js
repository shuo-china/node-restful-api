const express = require('express')
const md5 = require('md5')
const router = express.Router()
const User = require('../model/user')

router.get('/getUserInfo', async (req, res, next) => {
  res.success(req.clientInfo)
})

router.get('/test', async (req, res, next) => {
  const user = await User.create({
    username: 'admin',
    password: md5('123456'),
    nickname: 'admin'
  })
  res.success(user)
})

module.exports = router
