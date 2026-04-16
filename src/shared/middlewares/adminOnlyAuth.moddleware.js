//Internal modules
import * as userService from "../../modules/user/services/user.service.js";

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
export {
    adminOnlyMiddleware
}