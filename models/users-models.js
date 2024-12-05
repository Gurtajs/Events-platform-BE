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

module.exports = {
  getAllUsersData,
  getUserData,
  postUserData,

};
