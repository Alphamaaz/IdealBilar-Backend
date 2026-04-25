//External modules

//Internal modules
import {
  userRegisterationValidation,
  userLoginValidation,
  emailValidation,
  otpVerificationValidation,
  userResetPasswordValidation,
} from "../validations/user.validation.js";
import comparePassword from "../../../shared/utils/comparePassword.js";
import jwtVerify from "../../../shared/utils/jwtVerify.js";
import passwordHashGenerate from "../../../shared/utils/passwordHashGenerate.js";
import {
  createUser,
  getUserByEmail,
  getUserById as findUserById,
  saveUserOTP,
  findValidUserOTP,
  deleteUserOTP,
  markUserAsVerified,
  userResetPassword as updateUserPassword,
} from "../repositories/user.repository.js";
import { issueToken } from "../../../shared/utils/jwtTokenIssue.js";
import OTPGenerate from "../utils/OTPGenerate.js";
import sendOTPEmail from "../utils/sendOTPEmail.js";
import settingErrorStatusAndMessage from "../../../shared/utils/settingErrorStatusAndMessage.js";

const OTP_PURPOSES = {
  EMAIL_VERIFICATION: "email_verification",
  FORGOT_PASSWORD: "forgot_password",
};

const RESET_TOKEN_PURPOSE = "password_reset";

const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  isVerified: user.isVerified,
});

const issueAndSendOTP = async (user, purpose) => {
  const otp = OTPGenerate();

  await saveUserOTP(user._id, otp, purpose);

  try {
    await sendOTPEmail(user.email, otp, purpose);
  } catch (err) {
    await deleteUserOTP(user._id, purpose);
    throw err;
  }

  return {
    email: user.email,
    purpose,
    expiresInMinutes: 5,
  };
};

// User Registration service
const userRegister = async (userData) => {
  try {
    const { success, data, error } = userRegisterationValidation(userData);
    console.log("We are in the user register service ", data);
    
    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return validationError;
    }

    const hashedPassword = await passwordHashGenerate(data.password);
    data.password = hashedPassword;

    const createdUser = await createUser(data);

    try {
      await issueAndSendOTP(createdUser, OTP_PURPOSES.EMAIL_VERIFICATION);
    } catch (err) {
      return {
        success: false,
        status: 500,
        message: "User created but failed to send verification OTP. Please request resend OTP.",
        data: sanitizeUser(createdUser),
      };
    }

    return {
      success: true,
      status: 201,
      message: "User registered successfully. Please verify your email with the OTP sent to your inbox.",
      data: sanitizeUser(createdUser),
    };
  } catch (err) {
    if (err.code === 11000) {
      return {
        success: false,
        status: 409,
        code: 11000,
        message: "Duplicate record (email already exists)",
      };
    }

    return {
      success: false,
      status: err.status || 500,
      message: err.message,
    };
  }
};

const resendEmailVerificationOTP = async (emailData) => {
  try {
    const { success, error } = emailValidation(emailData);

    if (!success) {
      return settingErrorStatusAndMessage(error);
    }

    const user = await getUserByEmail(emailData.email);

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

    if (user.isVerified) {
      return {
        success: false,
        status: 400,
        message: "Email is already verified",
      };
    }

    await issueAndSendOTP(user, OTP_PURPOSES.EMAIL_VERIFICATION);

    return {
      success: true,
      status: 200,
      message: "Verification OTP sent successfully",
      data: {
        email: user.email,
      },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
};

const verifyEmailOTP = async (otpData) => {
  try {
    const { success, error } = otpVerificationValidation(otpData);

    if (!success) {
      return settingErrorStatusAndMessage(error);
    }

    const user = await getUserByEmail(otpData.email);

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

    if (user.isVerified) {
      return {
        success: true,
        status: 200,
        message: "Email is already verified",
        data: sanitizeUser(user),
      };
    }

    const validOTP = await findValidUserOTP(
      user._id,
      otpData.otp,
      OTP_PURPOSES.EMAIL_VERIFICATION,
    );

    if (!validOTP) {
      return {
        success: false,
        status: 400,
        message: "Invalid or expired verification OTP",
      };
    }

    const verifiedUser = await markUserAsVerified(user._id);
    await deleteUserOTP(user._id, OTP_PURPOSES.EMAIL_VERIFICATION);

    return {
      success: true,
      status: 200,
      message: "Email verified successfully",
      data: sanitizeUser(verifiedUser),
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
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
    const user = await getUserByEmail(data.email, true);

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      return error;
    }

    if (!user.isVerified) {
      return {
        success: false,
        status: 403,
        message: "User not verified. Please verify your email first.",
      };
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
      status: 200,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
      token,
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
};

const sendForgotPasswordOTP = async (emailData) => {
  try {
    const { success, error } = emailValidation(emailData);

    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return validationError;
    }

    const user = await getUserByEmail(emailData.email);

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

    if (!user.isVerified) {
      return {
        success: false,
        status: 400,
        message: "Please verify your email before requesting a password reset OTP",
      };
    }

    await issueAndSendOTP(user, OTP_PURPOSES.FORGOT_PASSWORD);

    return {
      success: true,
      status: 200,
      message: "Forgot password OTP sent successfully",
      data: {
        email: user.email,
      },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
};

const getUserById = async (userId) => {
  try {
    const user = await findUserById(userId);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const verifyForgotPasswordOTP = async (otpData) => {
  try {
    const { success, error } = otpVerificationValidation(otpData);

    if (!success) {
      return settingErrorStatusAndMessage(error);
    }

    const user = await getUserByEmail(otpData.email);

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

    const validOTP = await findValidUserOTP(
      user._id,
      otpData.otp,
      OTP_PURPOSES.FORGOT_PASSWORD,
    );

    if (!validOTP) {
      return {
        success: false,
        status: 400,
        message: "Invalid or expired forgot password OTP",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Forgot password OTP verified successfully",
      data: {
        email: user.email,
        resetToken: issueToken(
          {
            userId: user._id.toString(),
            email: user.email,
            purpose: RESET_TOKEN_PURPOSE,
          },
          { expiresIn: "10m" },
        ),
      },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
};

// user reset password service
const userResetPassword = async (resetPasswordData) => {
  try {
    const { success, data, error } = userResetPasswordValidation(resetPasswordData);
    if (!success) {
      const validationError = settingErrorStatusAndMessage(error);
      return validationError;
    }

    const resetTokenVerification = jwtVerify(data.resetToken);

    if (!resetTokenVerification.success) {
      return {
        success: false,
        status: 400,
        message: "Invalid or expired reset token",
      };
    }

    const resetTokenData = resetTokenVerification.data;

    if (resetTokenData?.purpose !== RESET_TOKEN_PURPOSE || !resetTokenData?.userId) {
      return {
        success: false,
        status: 400,
        message: "Invalid reset token payload",
      };
    }

    const user = await findUserById(resetTokenData.userId);

    if (!user) {
      return {
        success: false,
        status: 404,
        message: "User not found",
      };
    }

    const hashedPassword = await passwordHashGenerate(data.newPassword);
    await updateUserPassword(user._id, hashedPassword);
    await deleteUserOTP(user._id, OTP_PURPOSES.FORGOT_PASSWORD);

    return {
      success: true,
      status: 200,
      message: "Password reset successfully",
      data: {
        email: user.email,
      },
    };
  } catch (err) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
};

export {
  userRegister,
  resendEmailVerificationOTP,
  verifyEmailOTP,
  userLogin,
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  getUserById,
  userResetPassword,
};
