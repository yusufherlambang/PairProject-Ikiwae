const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()
const routerLogin = require('./routerLogin')
const routerLogout = require('./routerLogout')
const routerProduct = require('./routerProduct')
const routerRegister = require('./routerRegister')
const routerTransaction = require('./routerTransaction')


router.get('/', Controller.home)

router.use(routerRegister)

router.use(routerLogin)

router.use(routerLogout)


router.use(function (req, res, next) {

  if (!req.session.userId) {
    const error = `Please Login First!!!`

    res.redirect(`/login?error=${error}`)
  } else {
    next()
    
  }
})

const isAdmin = function (req, res, next) {

  if (req.session.userId && !req.session.admin ) {
    const error = `you don't have permission`

    res.redirect(`/?error=${error}`)
  } else {
    next()
    
  }
}

router.use(routerTransaction)

router.get("/admin", isAdmin, Controller.admin);

router.get("/admin/addprod", Controller.addProd);
router.post("/admin/addprod", Controller.addProdPost);

router.get("/profile/:id", Controller.profile);

router.get("/editqty/:idTrx", Controller.editQty);
router.post("/editqty/:idTrx", Controller.editQtyPost);

router.get("/payment/:idTrx", Controller.payment);



router.get("/invoice", Controller.invoice)

router.get('/profile/:id/delete', Controller.deleteProfile)

router.get("/:id/detail", Controller.detailProd)

module.exports = router