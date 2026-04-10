import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;

const jwtVerify = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { success: true, data: decoded.payload };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default jwtVerify;
