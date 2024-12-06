const db = require("../db/connection");

function getAllUsersData() {
  return db.query("SELECT * FROM users").then((users) => {
    return users.rows
  })
}

function getUserData(user_id) {
  return db
    .query("SELECT * FROM users WHERE user_id = $1", [user_id])
    .then((user) => {
      const userRow = user.rows[0];
      if (!userRow) {
        return Promise.reject({
          status: 404,
          message: "Not found",
        });
      }
      return userRow;
    });
}

function postUserData(user) {
  const {first_name, last_name, age} = user
  if (!first_name | !last_name | !age) {
    return Promise.reject({status:400, message:"Bad request"})
  }
  return db.query(
    `INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *`, [first_name, last_name, age]
  ).then((user) => {
    return user.rows[0]
  })
}

function getAllEventsByUserData(user_id) {
  return db.query(`SELECT * FROM events WHERE user_id = $1`, [user_id]).then((events) => {
    console.log(events.rows)
    const eventRows = events.rows
    if (eventRows.length === 0) {
      return Promise.reject({
        status: 404,
        message: "Not found"
      })
    }
    return eventRows
  })
}

function getEventByUserData(user_id, event_id) {
  return db.query(`SELECT * FROM events WHERE user_id=$1 AND event_id=$2`, [user_id, event_id]).then((event) => {
    const eventRows = event.rows[0]
    if (eventRows.length===0) {
      return Promise.reject({
        status: 404,
        message: "Not found"
      })
    }
    return eventRows
  })
}

function postEventByUserData(event) {
  const {user_id, title, description, location, date, capacity, organiser} = event
  if (!user_id | !title | !description | !location | !date | !capacity | !organiser) {
    return Promise.reject({status:400, message:"Bad request"})
  }
  return db.query(`INSERT INTO events (user_id, title, description, location, date, capacity, organiser) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [user_id, title, description, location, date, capacity, organiser]).then((event) => {
    return event.rows[0]
  })
}

function deleteEventByUserData(user_id, event_id) {
  return db.query("DELETE FROM events WHERE user_id=$1 AND event_id=$2 RETURNING *", [user_id, event_id]).then((event) => {
      if (event.rows.length === 0) {
        return Promise.reject({status: 400, message: "Event not found"})
      }
    })
}

module.exports = {
  getAllUsersData,
  getUserData,
  postUserData,
  getAllEventsByUserData,
  getEventByUserData, 
  postEventByUserData,
  deleteEventByUserData
};
