const logger = require('./logger')

const errorHandler = (err, req, res, next) => {
  console.log(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformed ID' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).send({ error: err.message })
  }

  next(err)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown Endpoint' })
}

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  requestLogger
}
