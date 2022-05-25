//! bcrypt di hook profile

// const bcryptjs = require('bcryptjs')

// hooks: {
//       beforeCreate : (instance) => {
//         instance.username = instance.username.toLowerCase()

//         const salt = bcryptjs.genSaltSync(10)
//         const hash = bcryptjs.hashSync(instance.password, salt)

//         instance.password = hash
//       },
//     }

//! handle bcrypt & session pada controller post login
  // const bcryptjs = require('bcryptjs')

  // static loginPost(req, res) {
  //   const {username, password } = req.body

  //   user.findOne({ where: { username }})
  //   .then(user => {
  //     if (user) {
  //       const isValidPassword = bcryptjs.compareSync(password, user.password) //? true/false
  
  //       if (isValidPassword) {
  //         req.session.userId = user.id 
  //         req.session.role = user.role //! jika ada role

  //         return res.redirect('/')
  //       } else {
  //         const error = "Invalid username / password"
  //         return res.redirect(`/login?error=${error}`)
  //       }   

  //     } else {
  //       const error = "Invalid username / password"
  //       return res.redirect(`/login?error=${error}`)
  //     }
  //   })
  //   .catch(err => {
  //     res.send(err)
  //   })
  // }


//! handle session pada app/index.js

// const session = require('express-session')

// app.use(session({
//   secret: `kepoo yaaa`,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     sameSite: true
//   }
// }))


//! handle session logout pada ctrl getLogOut & indexRouter
//(DI ROUTER)

// router.get('/logout', Controller.getLogOut)


//(di CTRL)
// static getLogOut(req, res) {
//   req.session.destroy((err => {
//     if (err) {
//       res.send(err)
//     } else {
//       res.redirect('/login')
//     }
//   }))
// }


//! session & middleware pada routeIndex dipasang setelah route login

// router.use(function (req, res, next) {
//   if (!req.session.userId) {
//     const error = `Please Login First!!!`

//     res.redirect(`/login?error=${error}`)
//   } else {
//     next()
//   }
// })




    