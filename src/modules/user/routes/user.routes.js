const express = require("express");
const {
  userRegisterController: userRegisterHandler,
  userLoginController: userLoginHandler,
  userForgetPasswordController: userForgetPasswordHandler,
  OTPVerifyController: OTPVarifyHandler,
  userResetPasswordController: userResetPasswordHandler
} = require("../controllers/user.controller");
const {
  userMiddlewareForVerifyJwtToken,
  authenticateUserForForgetPassword,
  OTPVerifyMiddleware,
} = require("../middlewares/user.middlewares");
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

// Export
module.exports = Router;
