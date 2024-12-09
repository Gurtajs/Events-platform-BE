const { getAllUsers, getUser, postUser, getAllEventsByUser, getEventByUser, postEventByUser, deleteEventByUser, getUserByEmail } = require('../controllers/users-controller')

const usersRouter = require('express').Router()

usersRouter.route('/').get(getAllUsers).post(postUser)
usersRouter.get('/:user_id', getUser)
usersRouter.route('/:user_id/events').get(getAllEventsByUser).post(postEventByUser)
usersRouter.route('/:user_id/events/:event_id').get(getEventByUser).delete(deleteEventByUser)
usersRouter.route('/emails/:email').get(getUserByEmail)

module.exports = usersRouter
