//External modules
const argon2 = require("argon2");
const passwordHash = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash;
    } catch (error) {
        throw new Error("Error hashing password");
    }
}

module.exports = passwordHash;