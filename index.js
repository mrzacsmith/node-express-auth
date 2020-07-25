require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const mainRoutes = require('./routes/main')
const pwdRoutes = require('./routes/password')

const app = express()
app.use(helmet())
app.use(cookieParser()) // before cors
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes
app.use('/', mainRoutes)
app.use('/', pwdRoutes)

// catch all other route
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found', status: 404 })
})

// handle errors

app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.status || 500).json({ error: error.message, status: 500 })
})

const PORT = process.env.PORT || 5755

app.listen(PORT, () => {
  console.log(`\n** Server is running on port ${PORT} ** \n`)
})
