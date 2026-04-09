//Internal modules
const User = require("../models/user.model");
const userOTPVerifyMdoel = require("../models/user.OTPVerify.model");
const mongoose = require("mongoose");
// Create a new user
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (err) {
    throw err;
  }
};

// Get user by email
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// save OTP to user
const userOTPSave = async (userId, otp) => {
  try {
    const user = await userOTPVerifyMdoel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId) },
      { otp, expireAt: Date.now() + 5 * 60 * 1000 },
      { returnDocument: "after", upsert: true },
    );
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

// OTPVerify
const OTPVerify = async (userId, otp) => {
  try {
    const user = await userOTPVerifyMdoel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      otp,
    });
    return user;
  } catch (err) {
    console.log("We are in the OTPVerify repository");
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

// exports
module.exports = {
  createUser,
  getUserByEmail,
  userOTPSave,
  OTPVerify,
  userResetPassword,
};
