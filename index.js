const express = require('express')
const bodyParser = require('body-parser')
const { recipes, users, sessions } = require('./routes')
const passport = require('./config/auth')

const port = process.env.PORT || 3030

let app = express()

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())


  .use(function(req, res, next) { //or .use(cors()) and install/require CORS
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    next()
  })

  // Our recipes routes
  .use(sessions)
  .use(users)
  .use(recipes)



  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // final error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
