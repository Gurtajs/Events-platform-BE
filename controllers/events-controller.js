const { getAllEventsData, getEventByIdData } = require("../models/events-models")


function getAllEvents(req, res, next) {
  getAllEventsData().then((events) => {
    res.status(200).send({events})
  }).catch(next)
}

function getEventById(req, res, next) {
  const {event_id} = req.params
  getEventByIdData(event_id).then((event) => {
    res.status(200).send({event})
  }).catch(next)
}

module.exports = {getAllEvents, getEventById}