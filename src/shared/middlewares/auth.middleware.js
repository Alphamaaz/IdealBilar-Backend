// middleware for verifying the user jwt token
import jwtVerify  from '../utils/jwtVerify.js';

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

//export
export { middlewareForVerifyJwtToken };
