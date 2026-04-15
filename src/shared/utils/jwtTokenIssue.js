//External modules
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

const issueToken = (payload, options = {}) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is missing in environment variables");
    }

    const token = jsonwebtoken.sign({ payload }, secretKey, { expiresIn: process.env.JWT_expire });
    return token;
  } catch (error) {
    throw new Error(error.message || "Error occurred while issuing token");
  }
};


export { issueToken };
