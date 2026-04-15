// middleware for verifying the user jwt token
import jwtVerify  from '../utils/jwtVerify.js';
import * as userService from "../../modules/user/services/user.service.js";

const middlewareForVerifyJwtToken = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Your are not login!" });
    }
    const { success, data } = jwtVerify(token);

    if (!success) {
      return res
        .status(401)
        .json({ success: false, error: `Token is invalid!` });
    }

    req.userId = data;
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const adminOnlyMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Access denied. Admin only." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
//export

export { middlewareForVerifyJwtToken, adminOnlyMiddleware };
