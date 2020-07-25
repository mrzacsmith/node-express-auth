const router = require('express').Router()

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

router.post('/signup', (req, res, next) => {
  //   next(new Error('test'))
  // console.log(req.body)
  if (!req.body) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    res.status(200).json({ message: 'ok' })
  }
})

router.post('/login', (req, res) => {
  // console.log(req.body)
  if (!req.body) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    res.status(200).json({ message: 'ok' })
  }
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
