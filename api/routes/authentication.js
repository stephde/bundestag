const { Router } = require('express')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../db/user')

module.exports = (passport) => {
  const router = Router()
  // configure passport.js to use the local strategy
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      console.log('Inside local strategy callback')
      const user = await User.findOne({email: email}).exec()
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log('Local strategy returned true')
        return done(null, user)
      } else {
        console.error('Authentication Failure')
        return done(null, false, {err: 'Authentication Failure'})
      }
    }
  ))

  // tell passport how to serialize the user
  passport.serializeUser((user, done) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user)
  })

  passport.deserializeUser(async (user, done) => {
    // const user = await User.findById(id).exec()
    done(null, user)
  })

  router.get('/login', (req, res) => {
    console.log('Inside GET /login callback')
    console.log(req.sessionID)
    res.send(`You got the login page!\n`)
  })

  router.post('/login', function (req, res, next) {
    console.log('Inside POST /login callback')
    passport.authenticate('local', (err, user, info) => {
      if (err || ! user) {
          console.error(`Authentication failed due to: ${err}`)
          return res.status(401).send(err)
      }

      req.login(user, (err) => {
        if (err) {
          console.error(`Authentication failed due to: ${err}`)
          return res.status(401).send(err)
        }

        //ToDo: update login timestamp
        return res.send('You were authenticated & logged in!\n')
      })
    })(req, res, next)
  })

  router.get('/authtest', (req, res, next) => {
    console.log(`User authenticated? ${req.isAuthenticated()}`)
    if (req.isAuthenticated()) {
      res.send('you hit the authentication endpoint\n')
    } else {
      res.send('Mind your own Business')
    }
  })

  return router
}
