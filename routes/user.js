const express = require('express')
const router = express.Router()
const { exec } = require('../db/mysql')

router.get('/getUserInfo', (req, res, next) => {
  exec('select * from kr_manager').then(data => {
    res.json(data)
  })
})

module.exports = router
