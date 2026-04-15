//External modules
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

//Internal modules
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const issueToken = (payload) => {
  try {
    const token = jsonwebtoken.sign({ payload }, secretKey, { expiresIn: process.env.JWT_expire });
    return token;
  } catch (error) {
    throw new Error("Error occurred while issuing token");
  }
};


export { issueToken };
