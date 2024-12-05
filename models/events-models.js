const db = require("../db/connection");

function getAllEventsData() {
  return db.query(`SELECT * FROM events`).then((events)=> {
    return events.rows
  })
}

module.exports = {getAllEventsData}