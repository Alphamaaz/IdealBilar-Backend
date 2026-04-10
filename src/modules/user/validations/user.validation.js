//External modules
import { z } from "zod";

// user Registration schema
const userRegisterationSchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
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

// forget passwrod schema
const forgetPasswrodSchema = z.object({
  email: z.string().email(),
});

// forget password validation function
const forgetPasswordValidation = (userData) => {
  try {
    return forgetPasswrodSchema.safeParse(userData);
  } catch (err) {
    console.log("Error in forget password validation ", err);
    throw new Error(err.message);
  }
};

// user reset password schema
const userResetPasswordSchema = z
  .object({
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
  forgetPasswordValidation,
  userResetPasswordValidation
};
