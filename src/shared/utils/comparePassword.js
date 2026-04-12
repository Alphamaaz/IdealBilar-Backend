// External modules
import argon2 from "argon2";

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await argon2.verify(hashedPassword, plainPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error while comparing passwords");
  }
};

export default comparePassword;
