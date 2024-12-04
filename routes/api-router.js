const apiRouter = require('express').Router()
const eventsRouter = require('./events-router')
const usersRouter = require('./users-router')

apiRouter.use("/events", eventsRouter)
apiRouter.use("/users", usersRouter)

module.exports = apiRouter