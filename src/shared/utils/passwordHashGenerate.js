//External modules
import argon2 from "argon2";

const passwordHash = async (password) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export default passwordHash;
