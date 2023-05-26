import { Router } from "express";
import { validate } from "express-validation";
import loginSchema from "../../../schemas/loginSchema.js";
import { loginUser } from "../../controllers/user/userController.js";
import paths from "../../utils/paths/paths.js";

const userRouter = Router();

userRouter.post(
  paths.loginController,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
