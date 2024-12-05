const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const connection = require("../db/connection");
const data = require("../db/data");
const express = require("express");

afterAll(() => {
  return connection.end();
});

beforeEach(() => {
  return seed(data);
});

describe("/api/users/:user_id", () => {
  test("GET: 200 - should return a user by its id", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then(({ body }) => {
        const user = body.user;
        expect(user.first_name).toBe("Gurtaj");
        expect(user.last_name).toBe("Singh");
        expect(user.age).toBe(26);
      });
  });

  test("GET: 404 - sends an appropriate status and error mesage when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/users/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });

  test("GET: 400 - sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/users/invaliduser")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});

describe("/api/users", () => {
  test("POST: 201 - should post a user", () => {
    const user = {
      first_name: "Cristiano",
      last_name: "Ronaldo",
      age: 39,
    };
    return request(app)
      .post("/api/users")
      .send(user)
      .expect(201)
      .then(({ body }) => {
        expect(body.user).toMatchObject({
          first_name: "Cristiano",
          last_name: "Ronaldo",
          age: 39,
        });
      });
  });
  test("POST: 400 - should return an error message when user object has an incomplete body", () => {
    const user = {
      first_name: "Cristiano",
    };
    return request(app)
      .post("/api/users")
      .send(user)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Bad request");
      });
  });
});

describe('"/api/events', () => {
  test("GET: 200 - should return all events", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        const events = body.events;
        console.log(events);
        expect(events.length).toBe(3);
        events.forEach((event) => {
          expect(typeof event.event_id).toBe("number");
          expect(typeof event.user_id).toBe("number");
          expect(typeof event.title).toBe("string");
          expect(typeof event.description).toBe("string");
          expect(typeof event.location).toBe("string");
          expect(typeof event.capacity).toBe("number");
          expect(typeof event.date).toBe("string");
          expect(typeof event.organiser).toBe("string");
        });
      });
  });
});
