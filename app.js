const express = require('express')
const app = express()
const port = 3002
const routes = require('./routes')

const session = require('express-session')


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: `kepoo yaaa`,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use(routes)

app.listen(port, () => {
  console.log(`Listening App ${port}`)
})