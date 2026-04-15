import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const jwtVerify = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      return {
        success: false,
        error: "JWT_SECRET_KEY is missing in environment variables",
      };
    }

    const decoded = jwt.verify(token, secretKey);
    return { success: true, data: decoded.payload };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//export
export default jwtVerify;
