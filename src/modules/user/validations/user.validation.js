//External modules
import { z } from "zod";

// user Registration schema
const userRegisterationSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.enum(["user", "admin"]).default("user").optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
  });

// User Registration validation function
const userRegisterationValidation = (userData) => {
  try {
    return userRegisterationSchema.safeParse(userData);
  } catch (err) {
    throw new Error("Invalid user data");
  }
};

// User Login Schema
const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// User Login validation function
const userLoginValidation = (userData) => {
  try {
    return userLoginSchema.safeParse(userData);
  } catch (err) {
    console.log("Error in user login validation ", err);
    throw new Error("Invalid login data");
  }
};

const emailSchema = z.object({
  email: z.string().email(),
});

const emailValidation = (userData) => {
  try {
    return emailSchema.safeParse(userData);
  } catch (err) {
    console.log("Error in email validation ", err);
    throw new Error(err.message);
  }
};

const otpVerificationSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4).max(10),
});

const otpVerificationValidation = (otpData) => {
  try {
    return otpVerificationSchema.safeParse(otpData);
  } catch (err) {
    console.log("Error in OTP verification validation ", err);
    throw new Error(err.message);
  }
};

// user reset password schema
const userResetPasswordSchema = z
  .object({
    resetToken: z.string().min(10),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
  });

// user reset password validation function
const userResetPasswordValidation = (passwordData) => {
  try {
    return userResetPasswordSchema.safeParse(passwordData);
  } catch (err) {
    console.log("Error in user reset password validation ", err);
    throw new Error(err.message);
  }
};

export {
  userRegisterationValidation,
  userLoginValidation,
  emailValidation,
  otpVerificationValidation,
  userResetPasswordValidation
};
