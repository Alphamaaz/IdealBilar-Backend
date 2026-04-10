//External modules

//Internal modules
import * as userService from "../services/user.service.js";
import settingResponse from "../utils/settingResponse.js";

// User registration controller
const userRegisterController = async (req, res) => {
  try {
    const result = await userService.userRegister(req.body);
    
    if (result instanceof Error) {
      return settingResponse(res, result);
    }

    
    if(result.code === 11000){
      return res.status(409).json(result)
    }

    res.status(201).json({
      message: "User registered successfuly!",
      data: result,
    });
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
    if (result instanceof Error) {
      return settingResponse(res, result);
    }

    if(!result.success){
      return res.status(401).json(result);
    }
    
    res.status(200).json({
      message: "Login successfuly!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// user forget password controller
const userForgetPasswordController = async (req, res) => {
  try {
    const result = await userService.userForgetPassword({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    return new Error(err.message);
  }
};

// user OTP verify controller
const OTPVerifyController = async (req, res) => {
  try { 
    const result = await userService.userOTPVerify({
        userId: req.userId,
        otp: req.headers.otp,
    });
    
    if (result instanceof Error) {
      return settingResponse(res, result);
    }
    res.status(200).json({
      success: true,
      data: result,
    });

  } catch (err) {return new Error(err.message);} 
};

//  user reset password controller
const userResetPasswordController = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const userId = req.userId;
    let result = null;
    try {
     result = await userService.userResetPassword({ newPassword, confirmPassword, userId });
    }
    catch (err) {
      return settingResponse(res, err);
     }
    if (result instanceof Error) {
      return settingResponse(res, result);
    } 

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      result,
    });
   
  } catch (err) {
    return new Error(err.message);
  }
};
export {
  userRegisterController,
  userLoginController,
  userForgetPasswordController,
  OTPVerifyController,
  userResetPasswordController
};
