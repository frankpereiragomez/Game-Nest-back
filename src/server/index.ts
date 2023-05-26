import express from "express";
import cors from "cors";
import morgan from "morgan";
import pingController from "./controllers/pingController/pingController.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddleware.js";
import paths from "./utils/paths/paths.js";

const app = express();

const trustedOrigins = [process.env.ALLOWED_ORIGIN_DEV!];

app.use(
  cors({
    origin: trustedOrigins,
  })
);

app.use(morgan("dev"));

app.use(express.json());

app.disable("x-powered-by");

app.get(paths.pingController, pingController);

app.use(notFoundError);

app.use(generalError);

export default app;
