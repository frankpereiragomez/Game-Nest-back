import "../../../loadEnvironment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import jwt from "jsonwebtoken";
import connectToDatabase from "../../../database/connectToDatabase.js";
import mongoose from "mongoose";
import User from "../../../database/models/User.js";
import {
  badRequestResponse,
  okResponse,
  wrongCredentials,
} from "../../utils/responseData/responseData.js";
import app from "../..";
import {
  badRequestUserCredentials,
  invalidUserCredentialsMock,
  mockUser,
  mockUserCredentials,
} from "../../../mocks/mocks.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

beforeEach(async () => {
  await User.create(mockUser);
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST 'user/login' endpoint", () => {
  const loginPath = "/user/login";

  describe("When it receives a request with the username 'admin' and a password 'admin'", () => {
    test("Then it should respond with a status code 200", async () => {
      const expectedStatusCode = okResponse.statusCode;

      const newUser = await User.findOne({
        username: mockUser.username,
      });

      const response: { body: { token: string } } = await request(app)
        .post(loginPath)
        .send(mockUserCredentials)
        .expect(expectedStatusCode);

      const { sub: userId } = jwt.verify(
        response.body.token,
        process.env.JWT_SECRET!
      );

      expect(userId).toBe(newUser?._id.toString());
    });
  });

  describe("When it receives a request with invalid credentials", () => {
    test("Then it should respond with a 401 status code and a 'Wrong credentials' error message", async () => {
      const { statusCode } = wrongCredentials;
      const expectedMessage = wrongCredentials.message;

      const response = await request(app)
        .post(loginPath)
        .send(invalidUserCredentialsMock)
        .expect(statusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });

  describe("When it receives a request with an invalid format credentials", () => {
    test("Then it should respond with a 400 status code and a 'Validation Failed' error message", async () => {
      const expectedStatusCode = badRequestResponse.statusCode;
      const expectedMessage = badRequestResponse.message;

      const response = await request(app)
        .post(loginPath)
        .send(badRequestUserCredentials)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
