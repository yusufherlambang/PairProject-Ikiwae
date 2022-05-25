const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get("/register", Controller.register)
router.post("/register", Controller.registerPost)

module.exports = router