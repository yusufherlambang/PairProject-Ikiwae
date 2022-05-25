const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/logout', Controller.getLogOut)

module.exports = router