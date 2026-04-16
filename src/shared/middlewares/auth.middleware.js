// middleware for verifying the user jwt token
import jwtVerify  from '../utils/jwtVerify.js';

const getTokenFromRequest = (req) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader?.startsWith("Bearer ")) {
    return authorizationHeader.split(" ")[1];
  }

  return req.headers.token;
};

const middlewareForVerifyJwtToken = (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "You are not logged in!" });
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
