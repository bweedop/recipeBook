const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const recipesRouter = require('./controllers/recipes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('Connecting to ', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: false,
  })
  .then(() => {
    console.log( 'Connected to MongoDB')
  })
  .catch((error) => {
    console.log( 'error connecting to MongoDB: ', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/recipes', recipesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app