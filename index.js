const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  //   console.log(res)
  res.send('Node is running using Express')
})

app.get('/status', (req, res) => {
  res.status(200).json({
    message: 'ok',
    status: 200,
  })
})

app.post('/signup', (req, res, next) => {
  //   next(new Error('test'))
  // console.log(req.body)
  if (!req.body) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    res.status(200).json({ message: 'ok' })
  }
})

app.post('/login', (req, res) => {
  // console.log(req.body)
  if (!req.body) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    res.status(200).json({ message: 'ok' })
  }
})

app.post('/logout', (req, res) => {
  // console.log(req.body)
  if (!req.body) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    res.status(200).json({ message: 'ok' })
  }
})

app.post('/token', (req, res) => {
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

app.post('/forgot-password', (req, res) => {
  if (!req.body || !req.body.email) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    const { email } = req.body
    res.status(200).json({
      message: `forgot password requested for email: ${email}`,
      status: 200,
    })
  }
})

app.post('/reset-password', (req, res) => {
  if (!req.body || !req.body.email) {
    res.status(400).json({ message: 'invalid', status: 400 })
  } else {
    const { email } = req.body
    res.status(200).json({
      message: `password request requested for email: ${email}`,
      status: 200,
    })
  }
})

// catch all other routes

app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found', status: 404 })
})

// handle errors

app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status || 500).json({ error: error.message, status: 500 })
})

const PORT = 5755

app.listen(PORT, () => {
  console.log(`\n** Server is running on port ${PORT} ** \n`)
})
