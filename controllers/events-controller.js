const { getAllEventsData } = require("../models/events-models")


function getAllEvents(req, res, next) {
  getAllEventsData().then((events) => {
    res.status(200).send({events})
  }).catch(next)
}

module.exports = {getAllEvents}