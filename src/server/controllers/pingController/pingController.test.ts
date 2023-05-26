import { type Request, type Response } from "express";
import pingController from "./pingController";
import { okResponse } from "../../utils/responseData/responseData";

describe("Given a pingController controller", () => {
  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    test("Then it should call the response's method status with 200", () => {
      const expectedStatusCode = okResponse.statusCode;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's method json with '🏓 Pong' message", () => {
      const expectedMessage = "🏓 Pong";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
