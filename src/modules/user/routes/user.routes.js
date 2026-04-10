import express from "express";
import {
  userRegisterController as userRegisterHandler,
  userLoginController as userLoginHandler,
  userForgetPasswordController as userForgetPasswordHandler,
  OTPVerifyController as OTPVarifyHandler,
  userResetPasswordController as userResetPasswordHandler
} from "../controllers/user.controller.js";
import {
  userMiddlewareForVerifyJwtToken,
  authenticateUserForForgetPassword,
  OTPVerifyMiddleware,
} from "../middlewares/user.middlewares.js";

const Router = express.Router();

// user sign up endpoint
Router.post("/user-signup", userRegisterHandler);

// user sign in endpoint
Router.post("/user-signin", userLoginHandler);

// user forget password endpoint
Router.post(
  "/forget-password",
  userMiddlewareForVerifyJwtToken,
  authenticateUserForForgetPassword,
  userForgetPasswordHandler,
);

// user reset password endpoint
Router.post(
  "/reset-password",
    userMiddlewareForVerifyJwtToken,
    userResetPasswordHandler
);

// user OTP verify endpoint
Router.post(
  "/otp-verify",
  userMiddlewareForVerifyJwtToken,
  OTPVerifyMiddleware,
  OTPVarifyHandler,
);

export default Router;
