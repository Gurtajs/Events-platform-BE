const { getAllUsers, getUser, postUser, getAllEventsByUser, getEventByUser, postEventByUser } = require('../controllers/users-controller')

const usersRouter = require('express').Router()

usersRouter.route('/').get(getAllUsers).post(postUser)
usersRouter.get('/:user_id', getUser)
usersRouter.route('/:user_id/events').get(getAllEventsByUser)
usersRouter.get('/:user_id/events/:event_id', getEventByUser)


module.exports = usersRouter
