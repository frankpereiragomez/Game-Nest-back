import "../../../loadEnvironment";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase";
import mongoose from "mongoose";
import Videogame from "../../../database/models/Videogame.js";
import {
  badRequestResponse,
  invalidToken,
  okCreateResponse,
  okResponse,
} from "../../utils/responseData/responseData";
import app from "../../index.js";
import paths from "../../utils/paths/paths.js";
import { newVideogameMock, realTokenMock } from "../../../mocks/mocks.js";
import videogamesMock from "../../../data/videogames.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Videogame.deleteMany();
});

beforeEach(async () => {
  await Videogame.create(videogamesMock);
});

beforeEach(() => {
  jest.clearAllMocks();
});

const expectedStatusCode = okResponse.statusCode;

describe("Given a GET '/videogames' endpoint", () => {
  describe("When it receives a request with a valid authorization", () => {
    test("Then it should responde with a 200 status code and a list of videogames", async () => {
      const response = await request(app)
        .get(paths.videogamesController)
        .set("Authorization", `Bearer ${realTokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.videogames).toHaveLength(2);
    });
  });
});

describe("Given a DELETE '/videogames' endpoint", () => {
  describe("When it receives a request with an videogameId and a valid token", () => {
    test("Then it should return the response's method status code with 200", async () => {
      const expectedMessage = "videogame deleted";
      const response = await request(app)
        .delete(
          `${paths.videogamesController}/${videogamesMock[0]._id.toString()}`
        )
        .set("Authorization", `Bearer ${realTokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a POST '/videogames/create' endpoint", () => {
  describe("When it receives a request with an userId and a body with a videogame", () => {
    test("Then it should return the response's method status with 201 and json", async () => {
      const response = await request(app)
        .post(`${paths.videogamesController}/create`)
        .set("Authorization", `Bearer ${realTokenMock}`)
        .send(newVideogameMock)
        .expect(okCreateResponse.statusCode);

      expect(response.body.videogame.name).toBe(newVideogameMock.name);
    });
  });

  describe("When it receives a request with a wrong user credentials and a body with a videogame", () => {
    test("Then it should return a status code 401 and a 'Invalid token' error message", async () => {
      const response = await request(app)
        .post(`${paths.videogamesController}/create`)
        .set("Authorization", "Bearer fklasj24352sfjasdfajosif")
        .send(newVideogameMock)
        .expect(invalidToken.statusCode);

      expect(response.body.message).toBe(invalidToken.message);
    });
  });

  describe("When it receives a request with a userId and a body with a  wrong videogame form", () => {
    test("Then it should return a status code 400 and a 'Bad request' error message", async () => {
      const response = await request(app)
        .post(`${paths.videogamesController}/create`)
        .set("Authorization", `Bearer ${realTokenMock}`)
        .send({ ...newVideogameMock, company: "Nintnedo" })
        .expect(badRequestResponse.statusCode);

      expect(response.body.message).toBe(badRequestResponse.message);
    });
  });
});
