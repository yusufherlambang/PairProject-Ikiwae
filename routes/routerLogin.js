const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.get("/login", Controller.login)
router.post("/login", Controller.loginPost)

module.exports = router