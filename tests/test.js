const app = require("../app");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const connection = require("../db/connection");
const data = require("../db/data");
const express = require("express");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return connection.end();
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
});
