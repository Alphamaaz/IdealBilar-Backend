// External modules
const argon2 = require("argon2");

const comparePassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await argon2.verify(hashedPassword, plainPassword);
        return isMatch;
    } catch (error) {
        throw new Error("Error while comparing passwords");
    }
};

module.exports = comparePassword;