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
      email: "ronaldo@gmail.com"
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
          email:"ronaldo@gmail.com"
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

describe("/api/events", () => {
  test("GET: 200 - should return all events", () => {
    return request(app)
      .get("/api/events")
      .expect(200)
      .then(({ body }) => {
        const events = body.events;
        expect(events.length).toBe(5);
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
  test("GET: 404 - responds with an error message when given an non-existent endpoint", () => {
    return request(app)
      .get("/api/eventss")
      .expect(404)
      .then((body) => {
        expect(body.res.statusMessage).toBe("Not Found");
      });
  });
});

describe("/api/events/:event_id", () => {
  test("should return an event by event id", () => {
    return request(app)
      .get("/api/events/1")
      .expect(200)
      .then(({ body }) => {
        const event = body.event;
        expect(event.event_id).toBe(1);
        expect(event.user_id).toBe(1);
        expect(event.title).toBe("Football match");
        expect(event.description).toBe(
          "Looking for 5 players for a football match"
        );
        expect(event.location).toBe("Birmingham");
        expect(event.capacity).toBe(5);
        expect(event.date).toBe("2024-04-11T23:00:00.000Z");
        expect(event.organiser).toBe("football_master");
      });
  });
  test("GET: 404 - sends an appropriate status and error mesage when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/events/99999")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });
  test("GET: 400 - sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/events/invalidevent")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});

describe("/api/users/:user_id/events", () => {
  test("GET: 200 - should return all events for a user", () => {
    return request(app)
      .get("/api/users/3/events")
      .expect(200)
      .then(({ body }) => {
        const events = body.events;
        expect(events.length).toBe(2);
        events.forEach((event) => {
          expect(event.user_id).toBe(3);
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
  test("GET: 404 - sends an appropriate status and error mesage when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/users/99999/events")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Not found");
      });
  });

  test("GET: 400 - sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/users/invaliduser/events")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});

describe("/api/users/:user_id/events/:event_id", () => {
  test("GET: 200 - should return an event for a user by event id", () => {
    return request(app)
      .get("/api/users/3/events/2")
      .expect(200)
      .then(({ body }) => {
        const event = body.event;
        expect(event.event_id).toBe(2);
        expect(event.user_id).toBe(3);
        expect(event.title).toBe("Running event");
        expect(event.description).toBe("Looking for runners for a charity run");
        expect(event.location).toBe("Birmingham");
        expect(event.capacity).toBe(3);
        expect(event.date).toBe("2024-08-11T23:00:00.000Z");
        expect(event.organiser).toBe("charity_runner");
      });
  });
});

describe("/api/users/:user_id/events", () => {
  test("POST: 201 - should post an event for a user", () => {
    const event = {
      user_id: 2,
      title: "Hiking Trip",
      description:
        "A group hike through the mountains, bring water and snacks.",
      location: "Swiss Alps",
      date: "01/12/2024",
      capacity: 10,
      organiser: "outdoor_enthusiast",
    };
    return request(app)
      .post("/api/users/2/events")
      .send(event)
      .expect(201)
      .then(({ body }) => {
        expect(body.event).toMatchObject({
          user_id: 2,
          title: "Hiking Trip",
          description:
            "A group hike through the mountains, bring water and snacks.",
          location: "Swiss Alps",
          date: "2024-01-12T00:00:00.000Z",
          capacity: 10,
          organiser: "outdoor_enthusiast",
        });
      });
  });
  test("POST: 400 - should return an error message when user object has an incomplete body", () => {
    const event = {
      user_id: 2,
      description:
        "A group hike through the mountains, bring water and snacks.",
      location: "Swiss Alps",
      date: "01/12/2024",
      capacity: 10,
      organiser: "outdoor_enthusiast",
    };
    return request(app)
      .post("/api/users/2/events")
      .send(event)
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toEqual("Bad request");
      });
  });
});

describe("/api/users/:user_id/events/:event_id", () => {
  test("DELETE: 204 - should delete an event for a user by event_id", () => {
    return request(app).delete("/api/users/1/events/1").expect(204);
  });
  test("DELETE: 404 - should return a message when we are trying to delete an event with a valid but non-existent id", () => {
    return request(app)
      .delete("/api/users/1/events/10")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("Event not found");
      });
  });
  test("DELETE 400 - should return an error message when we attempt to delete an event with an invalid id", () => {
    return request(app)
      .delete("/api/users/1/events/invalid")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});

describe("/api/users/emails/:email", () => {
  test("GET: 200 - should return a user by the email", () => {
    return request(app)
      .get("/api/users/emails/gs98@gmail.com")
      .expect(200)
      .then(({ body }) => {
        const user = body.user;
        expect(user.user_id).toBe(1);
        expect(user.first_name).toBe("Gurtaj");
        expect(user.last_name).toBe("Singh");
        expect(user.age).toBe(26);
        expect(user.email).toBe("gs98@gmail.com");
      });
  });
  test("GET: 404 - sends an appropriate status and error mesage when given non-existent email", () => {
    return request(app)
      .get("/api/users/emails/notfound@gmail.com")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("User not found");
      });
  });

  test("GET: 400 - sends an appropriate status and error message when given an invalid email", () => {
    return request(app)
      .get("/api/users/emails/nomail.com")
      .expect(400)
      .then(({ body }) => {
        expect(body.message).toBe("Bad request");
      });
  });
});

