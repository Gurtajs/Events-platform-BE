const db = require("../connection");
const format = require("pg-format");

const seed = ({ userData, eventsData }) => {
  return db
    .query(`DROP TABLE IF EXISTS events CASCADE;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users CASCADE;`);
    })
    .then(() => {
      return db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          first_name VARCHAR NOT NULL,
          last_name VARCHAR NOT NULL,
          age INT NOT NULL
        )
        `);
    })
    .then(() => {
      return db.query(`
      CREATE TABLE events (
        event_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id),
        title VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        location VARCHAR NOT NULL,
        capacity INT,
        date TIMESTAMP DEFAULT NOW(),
        organiser VARCHAR NOT NULL
      );`);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        "INSERT INTO users ( first_name, last_name, age) VALUES %L;",
        userData.map(({ first_name, last_name, age }) => [
          first_name,
          last_name,
          age,
        ])
      );
      return db.query(insertUsersQueryStr);
    })
    .then(() => {
      const insertEventsQueryStr = format(
        "INSERT INTO events (user_id, title, description, location, capacity, date, organiser) VALUES %L RETURNING *;",
        eventsData.map(
          ({ user_id, title, description, location, capacity, date, organiser }) => [
            user_id,
            title,
            description,
            location,
            capacity,
            date,
            organiser,
          ]
        )
      );
      return db.query(insertEventsQueryStr);
    });
};
module.exports = seed;
