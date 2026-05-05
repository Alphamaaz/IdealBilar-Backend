//External modules

//Internal modules
import * as userService from "../services/user.service.js";
import settingResponse from "../../../shared/utils/settingResponse.js";

const handleServiceResult = (res, result, successStatus = 200) => {
  if (result instanceof Error) {
    return settingResponse(res, result);
  }

  if (!result.success) {
    return res.status(result.status || 500).json(result);
  }

  return res.status(result.status || successStatus).json(result);
};

// User registration controller
const userRegisterController = async (req, res) => {
  try {
    const result = await userService.userRegister(req.body);
    return handleServiceResult(res, result, 201);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// User login controller
const userLoginController = async (req, res) => {
  try {
    const result = await userService.userLogin(req.body);
    console.log("We are in the user login controller ", result);
    
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const myProfileController = async (req, res) => {
  try {
    const result = await userService.myProfile(req.userId);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const resendEmailVerificationOTPController = async (req, res) => {
  try {
    const result = await userService.resendEmailVerificationOTP(req.body);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const verifyEmailOTPController = async (req, res) => {
  try {
    const result = await userService.verifyEmailOTP(req.body);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const forgotPasswordRequestOTPController = async (req, res) => {
  try {
    const result = await userService.sendForgotPasswordOTP(req.body);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const forgotPasswordVerifyOTPController = async (req, res) => {
  try {
    const result = await userService.verifyForgotPasswordOTP(req.body);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

//  user reset password controller
const userResetPasswordController = async (req, res) => {
  try {
    const result = await userService.userResetPassword(req.body);
    return handleServiceResult(res, result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export {
  userRegisterController,
  userLoginController,
  resendEmailVerificationOTPController,
  verifyEmailOTPController,
  forgotPasswordRequestOTPController,
  forgotPasswordVerifyOTPController,
  userResetPasswordController,
  myProfileController,
};

