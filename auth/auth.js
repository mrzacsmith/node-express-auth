const passport = require('passport')
const localStrategy = require('passport-local')

// handling user registration
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      console.log(email, password)
      console.log(req.body)

      const { username } = req.body
      if (username && username !== 'error') {
        return done(null, { name: 'joe' })
      } else {
        return done(new Error('invalid user'))
      }
    }
  )
)

// handle user login
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      if (email !== 'joe@test.com') {
        return done(new Error('user not found'), false)
      }
      if (password !== 'test') {
        return done(new Error('invalid password'), false)
      }
      return done(null, { name: 'joe' })
    }
  )
)
