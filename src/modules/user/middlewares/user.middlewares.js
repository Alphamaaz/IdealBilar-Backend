//Internal modules
import jwtVerify from "../../../shared/utils/jwtVerify.js";
import * as userService from "../services/user.service.js";
import settingResponse from "../../../shared/utils/settingResponse.js";

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

    if (!success) {
      return res
        .status(401)
        .json({ success: false, error: `Token is invalid!` });
    }

    req.userId = data;

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const adminOnlyMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Access denied. Admin only." });
    }

    req.user = user;
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
  adminOnlyMiddleware,
  authenticateUserForForgetPassword,
  OTPVerifyMiddleware
};
