// middleware for verifying the user jwt token
const middlewareForVerifyJwtToken = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, error: "Your are not login!" });
    }
    const { success, error, data } = jwtVerify(token);

    req.userId = data;

    if (error) {
      return res
        .status(400)
        .json({ success: false, error: `Token is invalid!` });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//export

export {
    middlewareForVerifyJwtToken
}