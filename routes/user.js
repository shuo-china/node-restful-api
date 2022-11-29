const express = require('express')
const router = express.Router()

router.get('/getUserInfo', async (req, res, next) => {
  res.json(req.clientInfo)
})

module.exports = router
