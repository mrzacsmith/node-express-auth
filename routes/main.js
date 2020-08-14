const router = require('express').Router()
const passport = require('passport')
const { response } = require('express')

router.get('/', (req, res) => {
  //   console.log(res)
  res.send('Node is running using Express')
})

router.get('/status', (req, res) => {
  res.cookie('testing', 'test')
  res.status(200).json({
    message: 'ok',
    status: 200,
  })
})

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  (req, res, next) => {
    //   next(new Error('test'))
    // console.log(req.body)
    res.status(200).json({ message: 'signup was successful', status: 200 })
  }
)

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (error, user) => {
    try {
      if (error) {
        return next(error)
      }
      if (!user) {
        return next(new Error('email and password are required'))
      }
      req.login(user, { session: false }, (err) => {
        if (err) return next(err)
        return res.status(200).json({ user, status: 200 })
      })
    } catch (err) {
      console.log(err)
      return next(err)
    }
  })(req, res, next)
})

router.post('/logout', (req, res) => {
  // console.log(req.body)
  if (!req.body) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    res.status(200).json({ message: 'ok' })
  }
})

router.post('/token', (req, res) => {
  if (!req.body || !req.body.refreshToken) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    const { refreshToken } = req.body
    res.status(200).json({
      message: `refresh token requested for token: ${refreshToken}`,
      status: 200,
    })
  }
})

module.exports = router
