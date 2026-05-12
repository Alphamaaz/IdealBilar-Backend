//External modules
import mongoose from "mongoose";

//Internal modules
import userOTPVerifyMdoel from "../models/user.OTPVerify.model.js";
import User from "../models/user.model.js";

const OTP_EXPIRE_WINDOW_MS = 5 * 60 * 1000;

// Create a new user
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (err) {
    throw err;
  }
};

// creat google user
const createGoogleUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Get user by email
const getUserByEmail = async (email, includePassword = false) => {
  try {
    let query = User.findOne({ email });

    if (includePassword) {
      query = query.select("+password");
    }

    const user = await query;
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Get user by id
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// save OTP to user
const saveUserOTP = async (userId, otp, purpose) => {
  try {
    const user = await userOTPVerifyMdoel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId), purpose },
      {
        otp,
        purpose,
        expireAt: new Date(Date.now() + OTP_EXPIRE_WINDOW_MS),
      },
      {
        returnDocument: "after",
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const findValidUserOTP = async (userId, otp, purpose) => {
  try {
    const user = await userOTPVerifyMdoel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      otp,
      purpose,
      expireAt: { $gt: new Date() },
    });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

const deleteUserOTP = async (userId, purpose) => {
  try {
    await userOTPVerifyMdoel.findOneAndDelete({
      userId: new mongoose.Types.ObjectId(userId),
      purpose,
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const markUserAsVerified = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { returnDocument: "after" },
    );
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// user reset password save
const userResetPassword = async (userId, newPassword) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { password: newPassword },
      { returnDocument: "after" },
    );
    return user;
  } catch (err) {
    console.log("We are in the user reset password repository ", err.message);
    throw new Error(err.message);
  }
};

export {
  createUser,
  createGoogleUser,
  getUserByEmail,
  getUserById,
  saveUserOTP,
  findValidUserOTP,
  deleteUserOTP,
  markUserAsVerified,
  userResetPassword,
};
