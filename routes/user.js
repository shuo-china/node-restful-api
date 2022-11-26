const express = require('express')
const router = express.Router()

router.get('/getUserInfo', (req, res, next) => {
  res.json(req.auth.info)
})

module.exports = router
