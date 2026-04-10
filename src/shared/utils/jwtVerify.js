const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;

const jwtVerify = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { success: true, data: decoded.payload };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

module.exports = jwtVerify;