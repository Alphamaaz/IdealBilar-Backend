//External modules

//Internal modules
const {
  userRegisterationValidation,
  userLoginValidation,
  forgetPasswordValidation,
  userResetPasswordValidation,
} = require("../validations/user.validation");
const passwordHashGenerate = require("../../../shared/utils/passwordHashGenerate");
const comparePassword = require("../../../shared/utils/comparePassword");
const {
  createUser,
  getUserByEmail,
  userOTPSave,
  OTPVerify,
  userResetPassword: updateUserPassword,
} = require("../repositories/user.repository");
const { issueToken } = require("../../../shared/utils/jwtTokenIssue");
const settingErrorStatusAndMessage = require("../utils/settingErrorStatusAndMessage");
const sendOTPEmail = require("../utils/sendOTPEmail");
const OTPGenerate = require("../utils/OTPGenerate");
const { create } = require("../models/user.model");

// User Registration service
const userRegister = async (userData) => {
  try {
    const { success, data, error } = userRegisterationValidation(userData);

    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return validationError;
    }

    const hashedPassword = await passwordHashGenerate(data.password);
    data.password = hashedPassword;

    const createdUser = await createUser(data);

    return { success: true, data: createdUser };
  } catch (err) {
    if (err.code === 11000) {
      return {
        code: 11000,
        result: {
          success: false,
          message: "Duplicate record (email already exists)",
        }
      };
    }

    return {
      success: false,
      status: err.status || 500,
      message: err.message,
    };
  }
};

// User Login service
const userLogin = async (userData) => {
  try {
    const { success, data, error } = userLoginValidation(userData);
    if (!success) {
      const validationErrors = settingErrorStatusAndMessage(error);
      return validationErrors;
    }
    const user = await getUserByEmail(data.email);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return error;
    }

    const isPasswordValid = await comparePassword(data.password, user.password);

    if (!isPasswordValid) {
      const errors = new Error("Invalid Password");
      errors.status = 401;
      throw errors;
    }
    const token = issueToken(user._id);

    return {
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// user data service for middleware
const userData = async (email) => {
  try {
    const { success, data, error } = forgetPasswordValidation(email);
    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return validationError;
    }

    const userDataForMiddleware = await getUserByEmail(email.email);
    return userDataForMiddleware;
  } catch (err) {
    throw new Error(err.message);
  }
};

// forget passwrod service
const userForgetPassword = async (userDataForForgetPassword) => {
  try {
    const otp = OTPGenerate();
    await sendOTPEmail(userDataForForgetPassword.email, otp);

    const saveOTP = await userOTPSave(userDataForForgetPassword.id, otp);

    const result = {
      otpId: saveOTP._id,
      otp: saveOTP.otp,
    };

    return {
      success: true,
      data: {
        message: "OTP sent to email successfully",
        result: result,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

// user OTP verify service
const userOTPVerify = async (OTPData) => {
  try {
    const { userId, otp } = OTPData;
    const userOTPData = await OTPVerify(userId, otp);

    let error = new Error("OTP verification failed, Try again!");
    error.status = 400;

    if (!userOTPData) {
      return error;
    }
    return { success: true, data: "OTP verified successfully" };
  } catch (err) {
    throw new Error(err.message);
  }
};

// user reset password service
const userResetPassword = async (resetPasswordData) => {
  try {
    const { newPassword, confirmPassword, userId } = resetPasswordData;

    const { success, data, error } = userResetPasswordValidation({
      newPassword,
      confirmPassword,
    });
    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return validationError;
    }

    const hashedPassword = await passwordHashGenerate(newPassword);
    const updatedUser = await updateUserPassword(userId, hashedPassword);

    return updatedUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

// exports
module.exports = {
  userRegister,
  userLogin,
  userForgetPassword,
  userData,
  userOTPVerify,
  userResetPassword,
};
