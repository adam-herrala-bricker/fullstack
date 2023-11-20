const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");

const api = supertest(app);

//user variables for tests
const typicalUser = {
  name: "Kevin M.",
  username: "kevin.m",
  password: "password",
};

const tooShortPW = {
  name: "Shorty",
  username: "short_1",
  password: "pw",
};

const noPassword = {
  name: "Travis",
  username: "travis.1",
};

const tooShortUN = {
  name: "Shorty, Jr.",
  username: "SJ",
  password: "password",
};

const noUsername = {
  name: "Travis",
  password: "password",
};

//reset test DB before each test
beforeEach(async () => {
  await User.deleteMany({});
});

//test for everything going right
describe("well-formed requests", () => {
  test("good request returned as json", async () => {
    await api
      .post("/api/users")
      .send(typicalUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
});

//tests where something goes wrong
describe("tests where an error is raised", () => {
  test("reject duplicate username", async () => {
    await api.post("/api/users").send(typicalUser);

    await api.post("/api/users").send(typicalUser).expect(400);
  });
  test("reject password shorter than 3 characters", async () => {
    await api.post("/api/users").send(tooShortPW).expect(400);
  });
  test("reject missing password", async () => {
    await api.post("/api/users").send(noPassword).expect(400);
  });
  test("reject username shorter than 3 characters", async () => {
    await api.post("/api/users").send(tooShortUN).expect(400);
  });
  test("reject missing username", async () => {
    await api.post("/api/users").send(noUsername).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
