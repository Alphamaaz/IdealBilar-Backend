//Internal modules
import jwtVerify from "../../../shared/utils/jwtVerify.js";
import * as userService from "../services/user.service.js";
import settingResponse from "../utils/settingResponse.js";

// middleware for verifying the user jwt token
const userMiddlewareForVerifyJwtToken = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Token is required!" });
    }
    const { success, error, data } = jwtVerify(token);

    req.userId = data;

    if (error) {
      return res
        .status(400)
        .json({ success: false, error: `Token is invalid!` });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// middleware for authenticate user, when he/she/other forget their password
const authenticateUserForForgetPassword = async (req, res, next) => {
  try {
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

export {
  userMiddlewareForVerifyJwtToken,
  authenticateUserForForgetPassword,
  OTPVerifyMiddleware
};
