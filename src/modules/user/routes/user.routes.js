import express from "express";
import {
  userRegisterController as userRegisterHandler,
  userLoginController as userLoginHandler,
  resendEmailVerificationOTPController as resendEmailVerificationOTPHandler,
  verifyEmailOTPController as verifyEmailOTPHandler,
  forgotPasswordRequestOTPController as forgotPasswordRequestOTPHandler,
  forgotPasswordVerifyOTPController as forgotPasswordVerifyOTPHandler,
  userResetPasswordController as userResetPasswordHandler
} from "../controllers/user.controller.js";

const Router = express.Router();

// user sign up endpoint
Router.post("/user-signup", userRegisterHandler);

// user sign in endpoint
Router.post("/user-signin", userLoginHandler);

// email verification endpoints
Router.post("/verify-email-otp", verifyEmailOTPHandler);
Router.post("/resend-verification-otp", resendEmailVerificationOTPHandler);

// forgot password endpoints
Router.post("/forgot-password/request-otp", forgotPasswordRequestOTPHandler);
Router.post("/forgot-password/verify-otp", forgotPasswordVerifyOTPHandler);
Router.post("/reset-password", userResetPasswordHandler);



export default Router;
