const db = require("../db/connection");

function getAllEventsData() {
  return db.query(`SELECT * FROM events`).then((events)=> {
    return events.rows
  })
}

function getEventByIdData(event_id) {
  return db.query(`SELECT * FROM events WHERE event_id = $1`, [event_id]).then((event) => {
    const eventRow = event.rows[0]
    if (!eventRow) {
      return Promise.reject({
        status: 404,
        message: "Not found"
      })
    }
    return eventRow
  })
}


module.exports = {getAllEventsData, getEventByIdData}