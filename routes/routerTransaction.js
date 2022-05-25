const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

router.post("/transaction/:idProd", Controller.transactionPost)
router.get("/transaction/:idProd", Controller.transaction)
router.get("/cancelTrx/:idTrx", Controller.calcelTransaction);

module.exports = router