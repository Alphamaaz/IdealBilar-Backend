//Internal modules
import * as userService from "../services/user.service.js";
import settingResponse from "../../../shared/utils/settingResponse.js";


// middleware for authenticate user, when he/she/other forget their password
const authenticateUserForForgetPassword = async (req, res, next) => {
  try {
    console.log("We are in the jwt verifying middleware ");
    const result = await userService.userData(req.body);
    
    if (result instanceof Error) {
      return settingResponse(res, result);
    }
    req.user = result;
    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

// OTP verify middleware
const OTPVerifyMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;
    const otp = req.headers.otp;
    
    const result = await userService.userOTPVerify({ userId, otp });  
    if (result instanceof Error) {
      return res.status(result.status).json({
        success: false,
        error: result.message,
      });
    }
    req.otpVerifiedUser = result;
    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

// exports
export {
  authenticateUserForForgetPassword,
  OTPVerifyMiddleware
};
