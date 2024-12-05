const {getAllEvents, getEventById} = require('../controllers/events-controller')

const eventsRouter = require('express').Router()

eventsRouter.route('/').get(getAllEvents)
eventsRouter.get('/:event_id', getEventById)

module.exports = eventsRouter