import "../../../loadEnvironment";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDatabase";
import mongoose from "mongoose";
import Videogame from "../../../database/models/Videogame.js";
import { okResponse } from "../../utils/responseData/responseData";
import app from "../../index.js";
import paths from "../../utils/paths/paths.js";
import { realTokenMock } from "../../../mocks/mocks.js";
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

describe("Given a GET '/videogames' endpoint", () => {
  beforeEach(async () => {
    await Videogame.create(videogamesMock);
  });

  describe("When it receives a request with a valid authorization", () => {
    test("Then it should responde with a 200 status code and a list of videogames", async () => {
      const expectedStatusCode = okResponse.statusCode;

      const response = await request(app)
        .get(paths.videogamesController)
        .set("Authorization", `Bearer ${realTokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.videogames).toHaveLength(2);
    });
  });
});