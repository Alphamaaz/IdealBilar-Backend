//External modules
const jsonwebtoken = require("jsonwebtoken");

//Internal modules
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;

const issueToken = (payload) => {
    try {
        const token = jsonwebtoken.sign({ payload }, secretKey, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error("Error occurred while issuing token");
    }
};


module.exports = { issueToken };