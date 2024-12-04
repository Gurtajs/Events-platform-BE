const db = require("../db/connection");

function getUserData(user_id) {
  return db.query("SELECT * FROM users WHERE user_id = $1", [user_id]).then((user)=> {
    const userRow = user.rows[0]
    if (!userRow) {
      return Promise.reject(
        {
          status: 404,
          message: "Not found"
        }
      )
    }
    return userRow
  })
}

module.exports = {
  getUserData
}